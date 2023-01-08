<?php

use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Support\Facades\Route;
use Modules\NsWooCommerce\Http\Controllers\WooCommerceController;

// nsw.categories-sync-selected

Route::middleware([
    SubstituteBindings::class,
])->group(function () {
    Route::get('/nsw/sync-order/{order}', [WooCommerceController::class, 'syncOrder' ]);
    Route::get('/nsw/create-webhooks', [ WooCommerceController::class, 'createWebhook' ]);
    Route::get('/nsw/categories-sync-selected', [WooCommerceController::class, 'syncSelectedCategories'])
        ->name(ns()->routeName('nsw.categories-sync-selected'));
});
