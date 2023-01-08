<?php

namespace Modules\NsWooCommerce\Http\Middleware;

use App\Exceptions\NotAllowedException;
use Closure;
use Exception;
use Illuminate\Http\Request;

class VerifyWebhook
{
    public function handle(Request $request, Closure $next)
    {
        /**
         * We're just only checking
         * if the endpoint is reacheable.
         * We should return an OK response.
         */
        if ( $request->input( 'webhook_id') ) {
            return response()->json([ 'status' => 'success' ]);
        }
        
        $optionParsed = parse_url(ns()->option->get('nsw_woocommerce_endpoint'));
        $requestParsed = parse_url($request->header('x-wc-webhook-source'));

        if (
            ! isset($optionParsed['host']) ||
            ! isset($requestParsed['host']) ||
            $optionParsed['host'] != $requestParsed['host']
        ) {
            throw new Exception(__m('Invalid request details.', 'NsWooCommerce'));
        }

        $signature = $request->header('x-wc-webhook-signature');
        $payload = $request->getContent();
        $secret = ns()->option->get('nsw_woocommerce_webhook_secret');
        $hmac = base64_encode(hash_hmac('sha256', $payload, $secret));

        if ($hmac !== $signature) {
            // throw new NotAllowedException( __m( 'The payload hasn\'t be successfully verified.' ) );
        }

        return $next($request);
    }
}
