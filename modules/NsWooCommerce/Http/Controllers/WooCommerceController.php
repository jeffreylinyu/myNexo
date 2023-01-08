<?php

namespace Modules\NsWooCommerce\Http\Controllers;

use App\Http\Controllers\DashboardController as ControllersDashboardController;
use App\Models\Order;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\NsWooCommerce\Jobs\CreateWebHooksJob;
use Modules\NsWooCommerce\Jobs\SyncOrderToWooCommerceJob;
use Modules\NsWooCommerce\Services\NexoPOSService;

class WooCommerceController extends ControllersDashboardController
{
    /**
     * @param NexoPOSService
     */
    protected $service;

    public function __construct(
        NexoPOSService $service
    ) {
        $this->service = $service;
    }

    private function logDefaultUser()
    {
        $user = ns()->option->get('nsw_author');
        $user = User::find($user);

        if (! $user instanceof User) {
            throw new Exception(__m('No default user is selected for being assigned all syncrhnoized operations.', 'NsWooCommerce'));
        }

        Auth::loginUsingId($user->id);
    }

    public function createWebhook()
    {
        CreateWebHooksJob::dispatch();

        return [
            'status'    =>  'success',
            'message'   =>  __m( 'The webhook will be created.', 'NsWooCommerce' )
        ];
    }

    public function listenEvents(Request $request)
    {
        $this->logDefaultUser();

        return $this->service->handleWebhook(
            $request->header('x-wc-webhook-topic'),
            $request->all()
        );
    }

    public function syncOrder( Order $order )
    {
        SyncOrderToWooCommerceJob::dispatch( $order );

        return [
            'status' => 'success',
            'message' => __m( 'The order is about to be synced to WooCommerce.' ),
        ];
    }

    public function syncSelectedCategories(Request $request)
    {
    }
}
