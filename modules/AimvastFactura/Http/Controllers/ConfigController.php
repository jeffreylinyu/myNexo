<?php
namespace Modules\AimvastFactura\Http\Controllers;

use App\Http\Controllers\DashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Storage;
use Modules\AimvastFactura\Config;

class ConfigController extends DashboardController
{
    public function __construct() { parent::__construct(); }

    public function index(Request $request) {
        abort(403);
    }
    public function get(Request $request) {
        $config = App(Config\Config::class);
        return response()->json($config->dump());
    }
    public function store(Request $request) {
        abort(403);
    }
}

