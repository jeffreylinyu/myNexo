<?php
namespace Modules\NsWooCommerce\Jobs;

use App\Models\Customer;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Modules\NsWooCommerce\Services\WooCommerceService;

/**
 * Register Job
**/
class SyncDeleteCustomerWooCommerceJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct( public Customer $customer )
    {
        // ...
    }

    /**
     * ...
     * @return  void
     */
    public function handle( WooCommerceService $service )
    {
        $service->deleteCustomer( $this->customer );
    }
}