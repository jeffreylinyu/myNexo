<?php

namespace Modules\NsWooCommerce\Jobs;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Modules\NsWooCommerce\Services\WooCommerceService;

class SyncOrderToWooCommerceJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    public function handle()
    {
        /**
         * @var WooCommerceService
         */
        $service = app()->make(WooCommerceService::class);
        $service->disablePointingWebhook();
        $service->syncOrder($this->order);
        $service->enablePointingWebhook();
    }
}
