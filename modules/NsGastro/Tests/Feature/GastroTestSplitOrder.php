<?php

namespace Modules\NsGastro\Tests\Feature;

use App\Models\Customer;
use App\Models\OrderPayment;
use App\Services\OrdersService;
use Modules\NsGastro\Models\Order;
use Modules\NsGastro\Models\Table;
use Modules\NsGastro\Models\TableSession;
use Modules\NsGastro\Services\GastroOrderService;
use Modules\NsGastro\Services\TableService;
use Tests\TestCase;
use Tests\Traits\WithAuthentication;
use Tests\Traits\WithOrderTest;

class GastroTestSplitOrder extends TestCase
{
    use WithOrderTest, WithAuthentication;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testCookingOrder()
    {
        $this->attemptAuthenticate();

        /**
         * let's truncate all session to be
         * sure session are created
         *
         * @var TableService
         */
        $gastroTableService = app()->make(TableService::class);

        Table::get()->each(fn ($table) => $gastroTableService->changeTableAvailability($table, Table::STATUS_AVAILABLE));

        /**
         * let's enable de required options
         */
        ns()->option->set('ns_gastro_table_availability', true);
        ns()->option->set('ns_gastro_freed_table_with_payment', true);
        ns()->option->set('ns_gastro_enable_table_sessions', true);

        /**
         * we'll define a define order Params
         */
        $table = Table::busy(false)->first();

        /**
         * Because we expect the table to have
         * the attribute "selected" set to yes.
         */
        $table->selected = true;

        $this->customOrderParams = [
            'table'                 =>  $table->toArray(),
            'gastro_order_status'   =>  'pending',
        ];

        /**
         * first attempt to post an order
         * over a table.
         */
        $this->attemptPostOrder(function ($response, $data) use ($table) {
            $order = Order::find($data['data']['order']['id']);

            $this->assertTrue((int) $order->table_id === (int) $table->id, 'The order is not assigned to a table.');
            $this->assertTrue($order->gastro_order_status === 'pending', 'The order is not in the right status.');

            $this->session = TableSession::findOrFail($order->gastro_table_session_id);
            $this->ordersCount = $this->session->orders->count();
            $belongToSession = $this->session->orders->filter(fn ($_order) => $_order->id === $order->id)->count();

            $this->assertTrue($belongToSession > 0, 'The order is not attached to a session');
        });

        /**
         * We'll make a payment for each orders
         * and check if they are closed
         *
         * @var OrdersService $orderService
         */
        $orderService = app()->make(OrdersService::class);

        /**
         * @var GastroOrderService $gastroOrderService
         */
        $gastroOrderService = app()->make(GastroOrderService::class);
        $orderPayment = OrderPayment::first();

        $this->session
            ->orders()
            ->get()
            ->each(function ($order) use ($orderService, $orderPayment) {
                // we'll make a full payment for that order
                if ($order->payment_status !== Order::PAYMENT_PAID) {
                    $orderService->makeOrderSinglePayment([
                        'value'         =>  $order->total,
                        'identifier'    =>  $orderPayment->identifier,
                    ], $order);
                }
            });

        $this->session->refresh();
        $table->refresh();

        $this->assertTrue((bool) $table->busy === false, 'The table hasn\'t been freed');
        $this->assertTrue((bool) $this->session->active === false, 'The session hasn\'t been closed with orders payment.');

        $order = $this->session
            ->orders()
            ->get()
            ->first();

        $chunks = $order->products->chunk(2);
        $firstTable = Table::busy(false)->get()->random();
        $secondTable = Table::busy(false)->get()->random();
        $customer = Customer::first();

        /**
         * let's now try to split the order
         */
        $result = $gastroOrderService->splitOrders([
            'original'  =>  $order,

            'slices'    =>  [
                [
                    'table_id'  =>  $firstTable->id,
                    'customer_id'   =>  $customer->id,
                    'type'          =>  'dine-in',
                    'products'  =>  $chunks->first()->toArray(),
                ], [
                    'table_id'  =>  $secondTable->id,
                    'customer_id'   =>  $customer->id,
                    'type'          =>  'dine-in',
                    'products'  =>  $chunks->last()->toArray(),
                ],
            ],
        ]);

        $orders = $result['data'];

        $newOrders = $orders->map(function ($data, $index) use (
            $firstTable,
            $secondTable,
            $customer

        ) {
            if ($index === 0) {
                $this->assertTrue(
                    (int) $data['data']['order']->table_id === (int) $firstTable->id,
                    __m('The first table hasn\'t been assigned to the order.', 'NsGastro')
                );

                $this->assertTrue(
                    (int) $data['data']['order']->customer_id === (int) $customer->id,
                    __m('The wrong customer has been assigned to the order.', 'NsGastro')
                );
            } else {
                $this->assertTrue(
                    (int) $data['data']['order']->table_id === (int) $secondTable->id,
                    __m('The second table hasn\'t been assigned to the order.', 'NsGastro')
                );

                $this->assertTrue(
                    (int) $data['data']['order']->customer_id === (int) $customer->id,
                    __m('The wrong customer has been assigned to the order.', 'NsGastro')
                );
            }

            return $data['data']['order'];
        });

        /**
         * Let's now try to merge the orders
         */
        $newTable = Table::whereNotIn('id', [$firstTable->id, $secondTable->id])->first();
        $newCustomer = Customer::whereNotIn('id', [$customer->id])->first();

        $result = $gastroOrderService->mergeOrders($newOrders, [
            'table_id'      =>  $newTable->id,
            'customer_id'   =>  $newCustomer->id,
            'type'          =>  'dine-in',
            'name'          =>  __m('Merged Order', 'NsGastro'),
        ]);

        $this->assertTrue(
            (int) $result['data']['order']->table_id === (int) $newTable->id,
            __m('The new table is not assigned to the merged order.', 'NsGastro')
        );

        $this->assertTrue(
            (int) $result['data']['order']->customer_id === (int) $newCustomer->id,
            __m('The new customer is not assigned to the merged order.', 'NsGastro')
        );
    }
}
