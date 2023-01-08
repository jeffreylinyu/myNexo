<?php

namespace Modules\NsWooCommerce\Jobs;

use App\Models\Customer;
use App\Services\NotificationService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Modules\NsWooCommerce\Services\WooCommerceService;
use Throwable;

class SyncCustomerWooCommerceJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $customer;

    public function __construct(Customer $customer)
    {
        $this->customer = $customer;
    }

    public function handle( WooCommerceService $service )
    {
        $service->disablePointingWebhook();
        $service->syncCustomer($this->customer);
        $service->enablePointingWebhook();
    }

    public function failed(Throwable $exception)
    {
        /**
         * If we've failed synchronizing the product
         * before the ID is invalid, we'll break the synchronization link.
         */
        $this->customer->wc_customer_id = 0;
        $this->customer->save();

        /**
         * @var NotificationService
         */
        $notification = app()->make(NotificationService::class);
        $notification->create([
            'title' =>  __m('Synchronization Failure', 'NsWooCommerce'),
            'description'   =>  sprintf(
                __m('Unable to synchronize the customer %s. The remote store has returned the following error : %s', 'NsWooCommerce'),
                $this->customer->name,
                $exception->getMessage()
            ),
            'url'           =>  ns()->route('ns.dashboard.customers-edit', ['customer' => $this->customer->id]),
            'identifier'    =>  'sync-error-'.$this->customer->id,
        ])->dispatchForGroupNamespaces(['admin']);
    }
}
