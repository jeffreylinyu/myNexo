<?php
namespace Modules\NsWooCommerce\Jobs;

use App\Models\ProductUnitQuantity;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Modules\NsWooCommerce\Services\WooCommerceService;

/**
 * Register Job
**/
class WooCommerceUpdateProductStockJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct( public ProductUnitQuantity $productUnitQuantity )
    {
        // ...
    }

    /**
     * ...
     * @return  void
     */
    public function handle( WooCommerceService $wooCommerceService)
    {
        $wooCommerceService->updateProductQuantity( $this->productUnitQuantity );
    }
}