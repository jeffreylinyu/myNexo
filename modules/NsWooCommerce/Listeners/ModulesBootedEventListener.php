<?php

namespace Modules\NsWooCommerce\Listeners;

use App\Events\BeforeStartWebRouteEvent;
use App\Events\ModulesBootedEvent;
use App\Exceptions\NotAllowedException;
use App\Services\ModulesService;

class ModulesBootedEventListener
{
    /**
     * Handle the event.
     *
     * @param  object $event
     * @return  void
     */
    public function handle( BeforeStartWebRouteEvent $event )
    {
        /**
         * @var ModulesService
         */
        $modulesService =   app()->make( ModulesService::class );
        $isActivated =   ! empty( $modulesService->getIfEnabled( 'NsMultiStore' ) );

        if ( $isActivated ) {
            $modulesService->disable( 'NsWooCommerce' );
            throw new NotAllowedException( __m( 'The WooCommerce extension cannot work with the multistore module at the moment.', 'NsWooCommerce') );
        }
    }
}
