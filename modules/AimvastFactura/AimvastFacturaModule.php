<?php
namespace Modules\AimvastFactura;

use App\Classes\Hook;
use App\Services\Module;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Storage;
use Modules\AimvastFactura\Config;


class AimvastFacturaModule extends Module
{
    public function __construct()
    {
        parent::__construct( __FILE__ );

        App::singleton(Config\Config::class, function ($app) {
            return new Config\Config();
        });


        // Add Menu
        Hook::addFilter( 'ns-dashboard-menus', function( $menus ) {
            $menus[ 'foobar' ]  =   [
                'label' =>  __('Aimvast Factura'),
                'href'  =>  '/dashboard/aimvast/factura/config',
                'icon'  => 'la-coins',
            ];

            return $menus; // <= do not forget
        });
    }
}
