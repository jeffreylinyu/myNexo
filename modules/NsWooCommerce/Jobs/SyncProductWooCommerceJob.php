<?php

namespace Modules\NsWooCommerce\Jobs;

use App\Models\Product;
use App\Services\NotificationService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Modules\NsWooCommerce\Services\WooCommerceService;
use Throwable;

class SyncProductWooCommerceJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $product;

    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    public function handle( WooCommerceService $service )
    {
        $service->disablePointingWebhook();
        $service->syncProduct($this->product);
        $service->enablePointingWebhook();
    }

    public function failed(Throwable $exception)
    {
        /**
         * If we've failed synchronizing the product
         * before the ID is invalid, we'll break the synchronization link.
         */
        $this->product->wc_product_id = 0;
        $this->product->save();

        /**
         * @var NotificationService
         */
        $notification = app()->make(NotificationService::class);
        $notification->create([
            'title'         =>  __m('Synchronization Failure', 'NsWooCommerce'),
            'description'   =>  sprintf(
                __m('Unable to synchronize the product %s. The remote store has returned the following error : %s', 'NsWooCommerce'),
                $this->product->name,
                $exception->getMessage()
            ),
            'url'           =>  ns()->route('ns.products-edit', ['product' => $this->product->id]),
            'identifier'    =>  'sync-error-'.$this->product->id,
        ])->dispatchForGroupNamespaces(['admin']);
    }
}
