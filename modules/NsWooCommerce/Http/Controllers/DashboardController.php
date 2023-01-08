<?php

namespace Modules\NsWooCommerce\Http\Controllers;

use App\Http\Controllers\DashboardController as ControllersDashboardController;
use Illuminate\Http\Request;

class DashboardController extends ControllersDashboardController
{
    public function settings()
    {
        return 'Hello World';
    }

    public function syncSelectedCategories(Request $request)
    {
    }
}
