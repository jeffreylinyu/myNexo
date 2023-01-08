<?php
use Illuminate\Support\Facades\Route;
use Modules\AimvastFactura\Http\Controllers\ConfigController;
use Modules\AimvastFactura\Http\Controllers\FolioPdfController;
use Modules\AimvastFactura\Http\Controllers\FolioTaxInfoController;

Route::get('/dashboard/aimvast/factura/folio/pdf', [ FolioPdfController::class, 'fetch' ]);
Route::get('/dashboard/aimvast/factura/folio/info/organization', [ FolioTaxInfoController::class, 'get_organization' ]);
Route::get('/dashboard/aimvast/factura/folio/info/tax_payer', [ FolioTaxInfoController::class, 'get_tax_payer' ]);

// Dashboard
Route::get('/dashboard/aimvast/factura/', [ ConfigController::class, 'index' ]);
Route::get('/dashboard/aimvast/factura/config', [ ConfigController::class, 'get' ]);
Route::post('/dashboard/aimvast/factura/config', [ ConfigController::class, 'store' ]);
