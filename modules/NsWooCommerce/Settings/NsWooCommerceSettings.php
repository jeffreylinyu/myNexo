<?php

namespace Modules\NsWooCommerce\Settings;

use App\Models\CustomerGroup;
use App\Models\ProductCategory;
use App\Models\TaxGroup;
use App\Models\Unit;
use App\Models\UnitGroup;
use App\Models\User;
use App\Services\Helper;
use App\Services\SettingsPage;
use Exception;
use Modules\NsWooCommerce\Services\WooCommerceService;

class NsWooCommerceSettings extends SettingsPage
{
    protected $identifier = 'nsw.settings-page';

    protected $labels;

    protected $form;

    /**
     * @var WooCommerceService
     */
    protected $wooService;

    public function __construct()
    {
        /**
         * @var WooCommerceService
         */
        $this->wooService = app()->make(WooCommerceService::class);
        $this->labels = [
            'title'             =>  __m('WooCommerce Settings', 'NsWooCommerce'),
            'description'       =>  __m('Configure the integration with WooCommerce.', 'NsWooCommerce'),
        ];

        $shipmentMethods = [];

        try {
            $shipmentMethods = $this->wooService->getShippingMethods();
        } catch (Exception $exception) {
            // ..
        }

        $this->form = [
            'tabs'      =>  [
                'general'   =>  [
                    'label' =>  __m('General', 'NsWooCommerce'),
                    'fields'    =>  [
                        [
                            'type'          =>  'text',
                            'label'         =>  __m('WooCommerce Endpoint', 'NsWooCommerce'),
                            'description'   =>  __m('provide the address to acces the WooCommerce store.', 'NsWooCommerce'),
                            'name'          =>  'nsw_woocommerce_endpoint',
                            'value'         =>  ns()->option->get('nsw_woocommerce_endpoint'),
                        ], [
                            'type'          =>  'text',
                            'label'         =>  __m('Consummer Key', 'NsWooCommerce'),
                            'description'   =>  __m('Provide the consummer key value for your WooCommerce store.', 'NsWooCommerce'),
                            'name'          =>  'nsw_woocommerce_consummer_key',
                            'value'         =>  ns()->option->get('nsw_woocommerce_consummer_key'),
                        ], [
                            'type'          =>  'text',
                            'label'         =>  __m('Consummer Secret', 'NsWooCommerce'),
                            'description'   =>  __m('Provide the consummer secret value for your WooCommerce store.', 'NsWooCommerce'),
                            'name'          =>  'nsw_woocommerce_consummer_secret',
                            'value'         =>  ns()->option->get('nsw_woocommerce_consummer_secret'),
                        ], [
                            'type'          =>  'text',
                            'label'         =>  __m('Weebhook Secret', 'NsWooCommerce'),
                            'description'   =>  __m('Provide the webhook secret that should be used to validate every incoming requests.', 'NsWooCommerce'),
                            'name'          =>  'nsw_woocommerce_webhook_secret',
                            'value'         =>  ns()->option->get('nsw_woocommerce_webhook_secret'),
                        ],
                    ],
                ],
                'orders'   =>  [
                    'label' =>  __m('Orders', 'NsWooCommerce'),
                    'fields'    =>  [
                        [
                            'type'  =>  'select',
                            'label' =>  __m('Shipping Method', 'NsWooCommerce'),
                            'description'   =>  __m('Select which shipping method should be used for delivery orders.', 'NsWooCommerce'),
                            'name'          =>  'nsw_woocommerce_shipping_method_id',
                            'value'         =>  ns()->option->get('nsw_woocommerce_shipping_method_id'),
                            'options'       =>  collect($shipmentMethods)
                                ->map(function ($option) {
                                    return [
                                        'label'     =>  $option->title,
                                        'value'     =>  $option->id,
                                    ];
                                }),
                        ],
                    ],
                ],
                'advanced'  =>  [
                    'label' =>  __m( 'Advanced', 'NsWooCommerce' ),
                    'component' =>  'nsWooSettings'
                ],
                // 'customers'   =>  [
                //     'label' =>  __m('Customers', 'NsWooCommerce'),
                //     'fields'    =>  [
                //         [
                //             'type'          =>  'select',
                //             'label'         =>  __m('Duplicate Email', 'NsWooCommerce'),
                //             'options'       =>  Helper::kvToJsOptions([
                //                 'use_existing'  =>  __( 'Use Existing Customer' ),
                //                 'create_new'    =>  __( 'Create New Customer' )
                //             ]),
                //             'description'   =>  __m('What to do in case an guest customer submit an order with a used email?', 'NsWooCommerce'),
                //             'name'          =>  'nsw_sync_customer_similar_email',
                //             'value'         =>  ns()->option->get('nsw_sync_customer_similar_email'),
                //         ], 
                //     ],
                // ],
                'sync_to_woo'   =>  [
                    'label' =>  __m('Sync To WooCommerce', 'NsWooCommerce'),
                    'fields'    =>  [
                        [
                            'type'          =>  'switch',
                            'label'         =>  __m('Sync Orders', 'NsWooCommerce'),
                            'options'       =>  Helper::kvToJsOptions([__m('No', 'NsWooCommerce'), __m('Yes', 'NsWooCommerce')]),
                            'description'   =>  __m('Allow orders to be synced. Products must be synced for this to work.', 'NsWooCommerce'),
                            'name'          =>  'nsw_sync_orders_to_woo',
                            'value'         =>  (int) ns()->option->get('nsw_sync_orders_to_woo'),
                        ], [
                            'type'          =>  'switch',
                            'label'         =>  __m('Sync Products', 'NsWooCommerce'),
                            'options'       =>  Helper::kvToJsOptions([__m('No', 'NsWooCommerce'), __m('Yes', 'NsWooCommerce')]),
                            'description'   =>  __m('Allow products to be synced. Categories must be synced', 'NsWooCommerce'),
                            'name'          =>  'nsw_sync_products_to_woo',
                            'value'         =>  (int) ns()->option->get('nsw_sync_products_to_woo'),
                        ], [
                            'type'          =>  'switch',
                            'label'         =>  __m('Sync Categories', 'NsWooCommerce'),
                            'options'       =>  Helper::kvToJsOptions([__m('No', 'NsWooCommerce'), __m('Yes', 'NsWooCommerce')]),
                            'description'   =>  __m('Allow categories to be synced.', 'NsWooCommerce'),
                            'name'          =>  'nsw_sync_categories_to_woo',
                            'value'         =>  (int) ns()->option->get('nsw_sync_categories_to_woo'),
                        ],
                    ],
                ],
                'sync_to_nexopos'   =>  [
                    'label' =>  __m('Sync To NexoPOS', 'NsWooCommerce'),
                    'fields'    =>  [
                        [
                            'type'          =>  'select',
                            'label'         =>  __m('Default Category', 'NsWooCommerce'),
                            'options'       =>  Helper::toJsOptions(ProductCategory::get(), ['id', 'name']),
                            'description'   =>  __m('Define the category that should be used for product having unknown categories.', 'NsWooCommerce'),
                            'name'          =>  'nsw_default_category_id',
                            'value'         =>  ns()->option->get('nsw_default_category_id'),
                        ], [
                            'type'          =>  'select',
                            'label'         =>  __m('Default Unit Group', 'NsWooCommerce'),
                            'options'       =>  Helper::toJsOptions(UnitGroup::get(), ['id', 'name']),
                            'description'   =>  __m('Define the default unit group that apply to the new created products.', 'NsWooCommerce'),
                            'name'          =>  'nsw_default_unit_group',
                            'value'         =>  ns()->option->get('nsw_default_unit_group'),
                        ], [
                            'type'          =>  'select',
                            'label'         =>  __m('Default Unit', 'NsWooCommerce'),
                            'options'       =>  Helper::toJsOptions(Unit::where('group_id', ns()->option->get('nsw_default_unit_group'))->get(), ['id', 'name']),
                            'description'   =>  __m('Define the default unit.', 'NsWooCommerce'),
                            'name'          =>  'nsw_default_unit',
                            'value'         =>  ns()->option->get('nsw_default_unit'),
                        ], [
                            'type'          =>  'select',
                            'label'         =>  __m('Default Tax Group', 'NsWooCommerce'),
                            'options'       =>  Helper::toJsOptions(TaxGroup::where('id', ns()->option->get('nsw_default_tax_group'))->get(), ['id', 'name']),
                            'description'   =>  __m('Select the tax group that apply to the created products.', 'NsWooCommerce'),
                            'name'          =>  'nsw_default_tax_group',
                            'value'         =>  ns()->option->get('nsw_default_tax_group'),
                        ], [
                            'type'          =>  'select',
                            'label'         =>  __m('Author', 'NsWooCommerce'),
                            'options'       =>  Helper::toJsOptions(User::get(), ['id', 'username']),
                            'description'   =>  __m('To which user should be assignated all operation created from WooCommerce.', 'NsWooCommerce'),
                            'name'          =>  'nsw_author',
                            'value'         =>  ns()->option->get('nsw_author'),
                        ], [
                            'type'          =>  'select',
                            'label'         =>  __m('Customer Group', 'NsWooCommerce'),
                            'options'       =>  Helper::toJsOptions(CustomerGroup::get(), ['id', 'name']),
                            'description'   =>  __m('To which group new customers should be assignated.', 'NsWooCommerce'),
                            'name'          =>  'nsw_customer_group',
                            'value'         =>  ns()->option->get('nsw_customer_group'),
                        ],
                    ],
                ],
            ],
        ];
    }
}
