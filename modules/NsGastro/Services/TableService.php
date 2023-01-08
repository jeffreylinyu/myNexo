<?php

namespace Modules\NsGastro\Services;

use App\Events\OrderAfterUpdatedEvent;
use App\Exceptions\NotAllowedException;
use App\Exceptions\NotFoundException;
use App\Models\Order;
use Illuminate\Database\Eloquent\Collection;
use Modules\NsGastro\Events\TableAfterUpdatedEvent;
use Modules\NsGastro\Models\Table;
use Modules\NsGastro\Models\TableSession;

class TableService
{
    /**
     * fetch order assigned
     * to a specific table
     *
     * @param  Table  $table
     * @return Collection
     */
    public function getTableOrders(Table $table, $range_starts = null, $range_ends = null)
    {
        if ((bool) ns()->option->get('ns_gastro_enable_table_sessions', false)) {
            $range_starts = $range_starts === null ? ns()->date->copy()->startOfDay()->toDateTimeString() : $range_starts;
            $range_ends = $range_ends === null ? ns()->date->copy()->endOfDay()->toDateTimeString() : $range_ends;

            $session = $table
                ->sessions()
                ->active()
                ->first();

            if ($session instanceof TableSession) {
                return $session
                    ->orders()
                    ->where('created_at', '>=', $range_starts)
                    ->where('created_at', '<=', $range_ends)
                    ->orderBy('id', 'desc')
                    ->with('products.modifiers', 'customer', 'user')
                    ->get();
            }

            return collect([]);
        } else {
            $range_starts = $range_starts === null ? ns()->date->copy()->startOfDay()->toDateTimeString() : $range_starts;
            $range_ends = $range_ends === null ? ns()->date->copy()->endOfDay()->toDateTimeString() : $range_ends;

            return $table->orders()
                ->orderBy('id', 'desc')
                ->where('created_at', '>=', $range_starts)
                ->where('created_at', '<=', $range_ends)
                ->with('products.modifiers', 'customer', 'user')
                ->get();
        }
    }

    /**
     * Will search table matching
     * the provided query
     *
     * @param string table name
     * @return array
     */
    public function searchTables($name)
    {
        return Table::where('name', 'like', '%'.$name.'%')
            ->get();
    }

    /**
     * Change the table status
     *
     * @param  Table  $table
     * @param  string  $status
     * @return void
     */
    public function changeTableAvailability(Table $table, $status)
    {
        if (in_array($status, ['available', 'busy'])) {
            switch ($status) {
                case 'available':
                    $table->busy = false;
                break;
                case 'busy':
                    $table->busy = true;
                break;
            }

            $table->save();

            /**
             * if a session has been created, while closing
             * we'll make sure to get an active session.
             */
            if ($status === 'available') {
                $session = $this->getActiveTableSession($table);

                if ($session instanceof TableSession) {
                    $this->closeTableSession($session);
                }
            }

            TableAfterUpdatedEvent::dispatch($table);

            return [
                'status'    =>  'success',
                'message'   =>  __m('The table availability has been updated.', 'NsGastro'),
            ];
        }
    }

    public function getTableSessions(Table $table, $rangeStarts, $rangeEnds)
    {
        return $table->sessions()
            ->where('session_starts', '>=', $rangeStarts ?: ns()->date->getNow()->startOfDay()->toDateTimeString())
            ->where('session_starts', '<=', $rangeEnds ?: ns()->date->getNow()->endOfDay()->toDateTimeString())
            ->orderBy('id', 'desc')
            ->get()
            ->map(function ($session) {
                $session->ordersCount = $session->orders()->count();

                return $session;
            });
    }

    /**
     * Closes a table session
     * and make the table available by the same way
     *
     * @param  Tablesession  $session
     * @return array $response
     */
    public function closeTableSession(TableSession $session)
    {
        /**
         * if we're closing a session
         * we assume the table shouldn't
         * remain in use
         */
        $session->table->busy = false;
        $session->table->save();

        /**
         * Let's now save the session
         * as it should be saved.
         */
        $session->active = false;
        $session->session_ends = ns()->date->toDateTimeString();
        $session->save();

        return [
            'status'    =>  'success',
            'message'   =>  __('The session has been successfully updated.'),
        ];
    }

    /**
     * Move an order from one table to another
     *
     * @param  Order  $order
     * @param  int  $table_id new destination table
     * @return array result
     */
    public function changeTable(Order $order, $table_id)
    {
        if ($order->table_id === $table_id) {
            throw new NotAllowedException(__m('The order is already assigned to this table.', 'NsGastro'));
        }

        $table = Table::find($table_id);

        if (! $table instanceof Table) {
            throw new NotFoundException(__m('Unable to find the destination table.', 'NsGastro'));
        }

        /**
         * let's verify if the table has an order and
         * if that order customer match the new customer
         * in case we've disabled multiple customer per table
         */
        if (! (bool) $table->allow_multi_clients) {
            $session = $this->getActiveTableSession($table);

            if ($session instanceof TableSession) {
                $session->orders->each(function ($_order) use ($order) {
                    if ($_order->customer_id !== $order->customer_id) {
                        throw new NotAllowedException(__m('This table doesn\'t allow multiple customers', 'NsGastro'));
                    }
                });
            }
        }

        /**
         * if the previous session only has
         * that order, we'll close that session
         */
        $session = TableSession::where('id', $order->gastro_table_session_id)->first();

        if ($session instanceof TableSession) {
            $totalOrders = $session->orders()->where('payment_status', '<>', Order::PAYMENT_PAID)->count();

            if ($totalOrders === 1) {
                $this->closeTableSession($session);
            }
        }

        /**
         * We'll now check if the destination table has an ongoing session
         * if not, we'll open a new session for that table
         */
        $session = $this->startTableSession($table, true);

        /**
         * Now let's assign the order to the table
         * and to the session.
         */
        $order->table_id = $table_id;
        $order->gastro_table_session_id = $session->id;
        $order->save();

        OrderAfterUpdatedEvent::dispatch($order);

        return [
            'status'    =>  'success',
            'message'   =>  sprintf(__m('The order has been successfully moved to %s', 'NsGastro'), $table->name),
        ];
    }

    /**
     * Will start a table session
     *
     * @param  Table  $table
     * @param  bool  $silent
     * @return TableSession
     */
    public function startTableSession(Table $table, $silent = false)
    {
        $session = $this->getActiveTableSession($table);

        if ($session instanceof TableSession && $silent === false) {
            throw new NotAllowedException(__m('The table session has already be opened.', 'NsGastro'));
        }

        if (! $session instanceof TableSession) {
            $session = new TableSession;
            $session->table_id = $table->id;
            $session->session_starts = ns()->date->getNow()->todateTimeString();
            $session->save();
        }

        /**
         * if the table session has successfully started
         * we can say that the table is busy from now.
         */
        $table->busy = true;
        $table->save();

        return $session;
    }

    public function getActiveTableSession(Table $table)
    {
        return $table->sessions()->where('active', 1)->orderBy('session_starts', 'desc')->first();
    }

    public function openTableSession(TableSession $session)
    {
        $session->active = true;
        $session->session_ends = null;
        $session->save();

        return [
            'status'    =>  'success',
            'message'   =>  __('The session has been successfully updated.'),
        ];
    }
}
