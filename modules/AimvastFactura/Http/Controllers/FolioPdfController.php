<?php
namespace Modules\AimvastFactura\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\DashboardController;

class FolioPdfController extends DashboardController
{
    public function __construct() { parent::__construct(); }

    public function fetch(Request $request) {
        $req = $request->all();
        $order_id = $req['order_id'];
        $filename = 'folio-' . $order_id . '.pdf';
        if(Storage::exists($filename)) {
            return Storage::download($filename);
        }
        abort(404);
    }
}

