<?php

namespace Modules\NsWooCommerce\Listeners;

use App\Events\ProductUnitQuantityAfterUpdatedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Modules\NsWooCommerce\Jobs\WooCommerceUpdateProductStockJob;

class ProductUnitQuantityAfterUpdatedEventListener
{
    /**
     * Handle the event.
     *
     * @param  object $event
     * @return  void
     */
    public function handle( ProductUnitQuantityAfterUpdatedEvent $event )
    {
        WooCommerceUpdateProductStockJob::dispatch( $event->productUnitQuantity );
    }
}
