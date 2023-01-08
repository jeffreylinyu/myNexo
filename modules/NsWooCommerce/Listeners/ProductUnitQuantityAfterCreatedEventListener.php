<?php

namespace Modules\NsWooCommerce\Listeners;

use App\Events\ProductUnitQuantityAfterCreatedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Modules\NsWooCommerce\Jobs\WooCommerceUpdateProductStockJob;
use Modules\NsWooCommerce\Services\WooCommerceService;

class ProductUnitQuantityAfterCreatedEventListener
{
    public function __construct( public WooCommerceService $wooCommerceService)
    {
        // ...
    }

    /**
     * Handle the event.
     *
     * @param  object $event
     * @return  void
     */
    public function handle( ProductUnitQuantityAfterCreatedEvent $event )
    {
        WooCommerceUpdateProductStockJob::dispatch( $event->productUnitQuantity );
    }
}
