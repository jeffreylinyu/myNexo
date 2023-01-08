<?php

namespace Modules\NsWooCommerce\Jobs;

use App\Models\ProductCategory;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Modules\NsWooCommerce\Services\WooCommerceService;

class DeleteCategoryToWooCommerceJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $category;

    public function __construct(ProductCategory $category)
    {
        $this->category = $category;
    }

    public function handle()
    {
        /**
         * @var WooCommerceService
         */
        $service = app()->make(WooCommerceService::class);
        
        $service->disablePointingWebhook();
        $service->deleteCategory($this->category);
        $service->enablePointingWebhook();
    }
}
