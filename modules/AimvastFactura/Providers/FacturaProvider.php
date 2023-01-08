<?php
namespace Modules\AimvastFactura\Providers;

use App\Events\OrderAfterCreatedEvent;
use App\Events\OrderAfterCheckPerformedEvent;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider as CoreServiceProvider;
use Modules\AimvastFactura\Events\AimvastFacturaEvent;
use App\Classes\Hook;
use App\Classes\Output;

class FacturaProvider extends CoreServiceProvider
{
    public function register()
    {

        Hook::addAction( 'ns-dashboard-footer', function( Output $output ) {
            $output->addView( 'AimvastFactura::my-custom-footer' );
            // loads this view : YourModuleNamespace/Resources/views/my-custom-footer.blade.php
        });
        Hook::addAction( 'ns-dashboard-pos-footer', function( Output $output ) {
            $output->addView( 'AimvastFactura::ns-dashboard-pos-footer');
        });

        //Hook.addAction( 'ns-pos-payment-mounted', 'my-custom-hook', ( vueComponent ) => {
        //    const button = document.createElement( 'button' );
        //    document.querySelector( '.ns-payment-footer' ).appendChild( button );
        //        button.addEventListener( 'click', () => {
        //            const order = POS.order.getValue();
        //        });
        //    });


        // catch events
        Event::listen(
            OrderAfterCreatedEvent::class,
            [
                AimvastFacturaEvent::class,
                'write_folio'
            ]
        );

        // catch events
        Event::listen(
            OrderAfterCheckPerformedEvent::class,
            [
                AimvastFacturaEvent::class,
                'create'
            ]
        );
    }

}
