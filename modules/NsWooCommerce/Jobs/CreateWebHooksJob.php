<?php
namespace Modules\NsWooCommerce\Jobs;

use App\Services\NotificationService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Modules\NsWooCommerce\Services\WooCommerceService;
use Illuminate\Support\Str;
use Throwable;

/**
 * Register Job
**/
class CreateWebHooksJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct()
    {
        // ...
    }

    /**
     * ...
     * @return  void
     */
    public function handle()
    {
        /**
         * @var NotificationService
         */
        $notification = app()->make(NotificationService::class);

        /**
         * @var WooCommerceService
         */
        $woocommerceHook    =   app()->make( WooCommerceService::class );

        $webhooks           =   $woocommerceHook->getWebhooks();

        $requiredHooks  =   collect([
            [
                'topic' => 'customer.created',
                'name'  => __m( 'Customer Created (NsWooCommerce)', 'NsWooCommerce' ),
                'delivery_url'  =>  url( 'webhook/wc' )
            ], [
                'topic' => 'customer.updated',
                'name'  => __m( 'Customer Updated (NsWooCommerce)', 'NsWooCommerce' ),
                'delivery_url'  =>  url( 'webhook/wc' )
            ], [
                'topic' => 'customer.deleted',
                'name'  => __m( 'Customer Deleted (NsWooCommerce)', 'NsWooCommerce' ),
                'delivery_url'  =>  url( 'webhook/wc' )
            ], [
                'topic' => 'order.created',
                'name'  => __m( 'Order Created (NsWooCommerce)', 'NsWooCommerce' ),
                'delivery_url'  =>  url( 'webhook/wc' )
            ], [
                'topic' => 'order.updated',
                'name'  => __m( 'Order Updated (NsWooCommerce)', 'NsWooCommerce' ),
                'delivery_url'  =>  url( 'webhook/wc' )
            ], [
                'topic' => 'order.deleted',
                'name'  => __m( 'Order Deleted (NsWooCommerce)', 'NsWooCommerce' ),
                'delivery_url'  =>  url( 'webhook/wc' )
            ], [
                'topic' => 'product.created',
                'name'  => __m( 'Product Created (NsWooCommerce)', 'NsWooCommerce' ),
                'delivery_url'  =>  url( 'webhook/wc' )
            ], [
                'topic' => 'product.updated',
                'name'  => __m( 'Product Updated (NsWooCommerce)', 'NsWooCommerce' ),
                'delivery_url'  =>  url( 'webhook/wc' )
            ], [
                'topic' => 'product.deleted',
                'name'  => __m( 'Product Deleted (NsWooCommerce)', 'NsWooCommerce' ),
                'delivery_url'  =>  url( 'webhook/wc' )
            ], 
        ]);

        /**
         * let's delete previously created webhook
         * to make sure those created use the new secret.
         */
        foreach( $webhooks as $webhook ) {
            $required   =   parse_url( $requiredHooks[0][ 'delivery_url' ] );
            $actual     =   parse_url( $webhook->delivery_url );

            $requiredDelivery   =   Str::finish( ( ( $required[ 'host' ] ?? '' ) . $required[ 'path' ] ), '/' );
            $actualDelivery     =   Str::finish( ( ( $actual[ 'host' ] ?? '' ) . $actual[ 'path' ] ), '/' );

            if ( $actualDelivery === $requiredDelivery ) {
                $woocommerceHook->deleteWebhook( $webhook );
            }
        }

        /**
         * we'll define the new secret
         * to authentify subsequent requests
         */
        $secret     =   Str::random(10);

        ns()->option->set( 'nsw.secret', $secret );

        $requiredHooks->each( function( $hook ) use ( $woocommerceHook, $secret ) {
            $result = $woocommerceHook->createWebhook([
                'name'  =>  $hook[ 'name' ],
                'topic' =>  $hook[ 'topic' ],
                'secret'    =>  $secret,
                'delivery_url'  =>  $hook[ 'delivery_url' ]
            ]);

            return $result;
        });

        $notification
            ->create([
                'dismissable'   =>  true,
                'title'         =>  __m( 'Webhook Synced', 'NsWooCommerce' ),
                'source'        =>  'module',
                'identifier'    =>  'nsw.webhook-synced',
                'url'           =>  url( 'dashboard/settings/nsw.settings-page' ),
                'description'   =>  __m( 'The required webhooks had been successfully synced.', 'NsWooCommerce' ),
            ])
            ->dispatchForGroupNamespaces(['admin']);
    }

    public function failed( Throwable $exception ) 
    {
        /**
         * @var NotificationService
         */
        $notification = app()->make(NotificationService::class);

        $notification
            ->create([
                'dismissable'   =>  true,
                'title'         =>  __m( 'Webhook Sync Failure', 'NsWooCommerce' ),
                'source'        =>  'module',
                'identifier'    =>  'nsw.webhook-sync-error',
                'url'           =>  url( 'dashboard/settings/nsw.settings-page' ),
                'description'   =>  $exception->getMessage()
            ])
            ->dispatchForGroupNamespaces(['admin']);
    }
}