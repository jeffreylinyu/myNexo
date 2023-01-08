<?php

namespace Modules\NsWooCommerce\Services;

use App\Models\Customer;
use App\Models\Order;
use App\Models\Procurement;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductUnitQuantity;
use App\Services\NotificationService;
use Automattic\WooCommerce\Client;
use Exception;
use Illuminate\Support\Str;

class WooCommerceService
{
    private $domain;

    private $consumerKey;

    private $consumerSecret;

    private $wooclient;

    public function __construct($domain, $consumerKey, $consumerSecret)
    {
        $this->domain = $domain;
        $this->consumerKey = $consumerKey;
        $this->consumerSecret = $consumerSecret;


        $this->wooclient = new Client(
            $this->domain,
            $this->consumerKey,
            $this->consumerSecret, [
                'version'   =>  'wc/v3',
                'wp_api'    =>  true,
                'verify_ssl'    =>  false
            ]
        );
    }

    /**
     * Will create a category on WooCommerce
     * and ensure that category is linked to NexoPOS 4.x
     *
     * @param  ProductCategory  $category
     * @return void
     */
    public function syncCategory(ProductCategory $category)
    {
        try {
            if (! empty($category->wc_category_id)) {
                $method = 'put';
                $path = 'products/categories/'.$category->wc_category_id;
            } else {
                $method = 'post';
                $path = 'products/categories';
            }

            $parent_id = 0; // no parent assigned by default.

            if (! empty($category->parent_id)) {
                $parent = ProductCategory::find($category->parent_id);

                if ($parent instanceof ProductCategory) {
                    if (empty($parent->wc_category_id)) {
                        $parent = $this->syncCategory($parent);
                    }

                    $parent_id = $parent->wc_category_id;
                }
            }

            $data = [
                'name'          =>  $category->name,
                'slug'          =>  Str::slug( $category->slug ?: $category->name ),
                'parent'        =>  $parent_id,
                'description'   =>  $category->description,
            ];

            if (! empty($category->preview_url)) {
                $data['image'] = [
                    'src'   =>  $category->preview_url,
                ];
            }

            $result = $this->wooclient->$method(
                $path, $data
            );

            /**
             * let's update the category to keep the reference
             */
            $category->wc_category_id = $result->id;
            $category->save();

            return $category;
        } catch (Exception $exception) {
            $this->syncIssueNotification(
                __m('WooCommerce Sync Failure', 'NsWooCommerce'),
                sprintf(
                    __m('An issue has occured during the synchronization: %s', 'NsWooCommerce'),
                    $exception->getMessage()
                ),
                route(ns()->routeName('ns.dashboard.settings'), ['settings' => 'nsw.settings-page'])
            );

            throw new Exception($exception->getMessage());
        }
    }

    public function getCustomers( $email = null )
    {
        try {
            if ( $email !== null ) {
                $params = [
                    'email'     => $email,
                    'per_page'  =>  99,
                ];
            } else {
                $params = [
                    'per_page'  =>  99,
                ];
            }

            return $this->wooclient->get('customers', $params );
        } catch (Exception $exception) {
            $this->syncIssueNotification(
                __m('WooCommerce Sync Failure', 'NsWooCommerce'),
                sprintf(
                    __m('An issue has occured while fetching customers : %s', 'NsWooCommerce'),
                    $exception->getMessage()
                ),
                route(ns()->routeName('ns.dashboard.settings'), ['settings' => 'nsw.settings-page'])
            );

            throw new Exception($exception->getMessage());
        }
    }

    public function getCategories()
    {
        try {
            return $this->wooclient->get('products/categories', [
                'force'     => true,
                'per_page'  =>  99,
            ]);
        } catch (Exception $exception) {
            $this->syncIssueNotification(
                __m('WooCommerce Sync Failure', 'NsWooCommerce'),
                sprintf(
                    __m('An issue has occured while fetching categories : %s', 'NsWooCommerce'),
                    $exception->getMessage()
                ),
                route(ns()->routeName('ns.dashboard.settings'), ['settings' => 'nsw.settings-page'])
            );

            throw new Exception($exception->getMessage());
        }
    }

    /**
     * Will delete the category from
     * WooCommerce if it's synced
     *
     * @param  ProductCategory  $category
     * @return void
     */
    public function deleteCategory(ProductCategory $category)
    {
        try {
            $this->wooclient->delete('products/categories/'.$category->wc_category_id, ['force' => true]);
        } catch (Exception $exception) {
            $this->syncIssueNotification(
                __m('WooCommerce Sync Failure', 'NsWooCommerce'),
                sprintf(
                    __m('An issue has occured during the synchronization: %s', 'NsWooCommerce'),
                    $exception->getMessage()
                ),
                route(ns()->routeName('ns.dashboard.settings'), ['settings' => 'nsw.settings-page'])
            );

            throw new Exception($exception->getMessage());
        }
    }

    /**
     * Will create a synchronization issue notification
     *
     * @param  string  $title
     * @param  string  $description
     * @param  string  $url
     */
    public function syncIssueNotification($title, $description, $url)
    {
        /**
         * @var NotificationService
         */
        $notification = app()->make(NotificationService::class);

        $notification
            ->create([
                'dismissable'   =>  true,
                'title'         =>  $title,
                'source'        =>  'module',
                'identifier'    =>  'nsw.sync-issue',
                'url'           =>  $url,
                'description'   =>  $description,
            ])
            ->dispatchForGroupNamespaces(['admin']);
    }

    /**
     * Will delete a synchronized product on WooCommerce
     *
     * @param  Product  $product
     * @return void
     */
    public function deleteProduct(Product $product)
    {
        if (! empty($product->wc_product_id)) {
            try {
                $this->wooclient->delete('products/'.$product->wc_product_id);

                return [
                    'status'    =>  'success',
                    'message'   =>  __m('The product has been deleted.', 'NsWooCommerce'),
                ];
            } catch (Exception $exception) {
                $this->syncIssueNotification(
                    __m('Synchronization Issue', 'NsWooCommerce'),
                    sprintf(
                        __m('Unable delete on WooCommerce a product : %s', 'NsWooCommerce'),
                        $exception->getMessage()
                    ),
                    '#'
                );
            }
        }
    }

    /**
     * Will delete a synchronized product on WooCommerce
     *
     * @param  Product  $product
     * @return void
     */
    public function deleteCustomer(Customer $customer)
    {
        if (! empty($customer->wc_customer_id)) {
            try {
                $this->wooclient->delete('customers/'.$customer->wc_customer_id, ['force' => true]);

                return [
                    'status'    =>  'success',
                    'message'   =>  __m('The customer has been deleted.', 'NsWooCommerce'),
                ];
            } catch (Exception $exception) {
                $this->syncIssueNotification(
                    __m('Synchronization Issue', 'NsWooCommerce'),
                    sprintf(
                        __m('Unable delete on WooCommerce a customer : %s', 'NsWooCommerce'),
                        $exception->getMessage()
                    ),
                    '#'
                );
            }
        }
    }

    /**
     * Will sync the customer to WooCoommerce
     *
     * @param  Customer  $customer
     * @return void
     */
    public function syncCustomer(Customer $customer)
    {
        if (empty($customer->wc_customer_id)) {
            $method = 'post';
            $path = 'customers';
        } else {
            $method = 'put';
            $path = 'customers/'.$customer->wc_customer_id;
        }

        /**
         * if the customer doesn't exists,
         * let's fetch if a customer exist with the 
         * provided email
         */
        if ( $method = 'post' ) {
            $customers   =   $this->getCustomers( $customer->email );

            if( ! empty( $customers ) ) {
                $method = 'put';
                $path = 'customers/' . $customers[0]->id;
            }
        }

        $customer->load('shipping', 'billing');

        $config = [
            'email'         =>  $customer->email,
            'first_name'    =>  $customer->name,
            'last_name'     =>  $customer->surname,
            'username'      =>  $customer->email,
            'billing'       =>  [
                'first_name'    =>  isset($customer->billing) ? ($customer->billing->name ?: '') : '',
                'last_name'     =>  isset($customer->billing) ? ($customer->billing->surname ?: '') : '',
                'company'       =>  isset($customer->billing) ? ($customer->billing->company ?: '') : '',
                'address_1'     =>  isset($customer->billing) ? ($customer->billing->address_1 ?: '') : '',
                'address_2'     =>  isset($customer->billing) ? ($customer->billing->address_2 ?: '') : '',
                'country'       =>  isset($customer->billing) ? ($customer->billing->country ?: '') : '',
                'city'          =>  isset($customer->billing) ? ($customer->billing->city ?: '') : '',
                'postcode'      =>  isset($customer->billing) ? ($customer->billing->pobox ?: '') : '',
            ],
            'shipping'      =>  [
                'first_name'    =>  isset($customer->shipping) ? ($customer->shipping->name ?: '') : '',
                'last_name'     =>  isset($customer->shipping) ? ($customer->shipping->surname ?: '') : '',
                'company'       =>  isset($customer->shipping) ? ($customer->shipping->company ?: '') : '',
                'address_1'     =>  isset($customer->shipping) ? ($customer->shipping->address_1 ?: '') : '',
                'address_2'     =>  isset($customer->shipping) ? ($customer->shipping->address_2 ?: '') : '',
                'country'       =>  isset($customer->shipping) ? ($customer->shipping->country ?: '') : '',
                'city'          =>  isset($customer->shipping) ? ($customer->shipping->city ?: '') : '',
                'postcode'      =>  isset($customer->shipping) ? ($customer->shipping->pobox ?: '') : '',
            ],
        ];

        $result = $this->wooclient->$method($path, $config);

        $customer->wc_customer_id = $result->id;
        $customer->save();
    }

    /**
     * Will sync the products to WooCommerce
     *
     * @param  Product  $product
     * @return void
     */
    public function syncProduct(Product $product)
    {
        if (empty($product->wc_product_id)) {
            $method = 'post';
            $slug = 'products';
        } else {
            $method = 'put';
            $slug = 'products/'.$product->wc_product_id;
        }

        $category = ProductCategory::find($product->category_id);

        if (empty($category->wc_category_id)) {
            $category = $this->syncCategory($category);
        }

        $images = [];

        /**
         * If the galleries are defined
         * we'll make sure to populate the
         * gallery array
         */
        if ($product->galleries) {
            $product->galleries->each(function ($gallery) use (&$images) {
                $images[] = [
                    'src'   =>  $gallery->url,
                ];
            });
        }

        $data = [
            'name'              =>  $product->name,
            'type'              =>  'simple',
            'status'            =>  $product->status === 'available' ? 'publish' : 'draft',
            'description'       =>  $product->description,
            'regular_price'     =>  (string) $product->unit_quantities[0]->sale_price,
            'stock_quantity'    =>  $product->unit_quantities[0]->quantity,
            'manage_stock'      =>  $product->stock_management === 'enabled' ? true : false,
            'categories'        =>  [
                ['id' => $category->wc_category_id],
            ],
            'images'            =>  [
                ...$images,
            ],
            'sku'               =>  $product->sku,
        ];
        $result = $this->wooclient->$method($slug, $data );

        $product->wc_product_id = $result->id;
        $product->save();
    }

    /**
     * returns the available shipping methods
     *
     * @return array $methods
     */
    public function getShippingMethods()
    {
        return $this->wooclient->get('shipping_methods');
    }

    /**
     * Will sync to WooCommerce
     *
     * @param  Order  $order
     * @return void
     */
    public function syncOrder(Order $order)
    {
        try {
            if (
                ($order->payment_status === Order::PAYMENT_PAID) &&
                ! empty($order->customer->wc_customer_id)
            ) {
                $order->load( 'products.product' );
                $payment = $order->payments->first();

                $params = [
                    'payment_method'        =>  $payment->type->wc_payment_id,
                    'payment_method_title'  =>  $payment->type->label,
                    'customer_id'           =>  $order->customer->wc_customer_id,
                    'discount_total'        =>  $order->discount,
                    'set_paid'              =>  true,
                    'billing'               =>  [
                        'first_name'        =>  $order->billing_address->name ?: '',
                        'last_name'         =>  $order->billing_address->surname ?: '',
                        'address_1'         =>  $order->billing_address->address_1 ?: '',
                        'address_2'         =>  $order->billing_address->address_2 ?: '',
                        'city'              =>  $order->billing_address->city ?: '',
                        'state'             =>  '',
                        'postcode'          =>  $order->billing_address->pobox ?: '',
                        'country'           =>  $order->billing_address->country ?: '',
                        'email'             =>  $order->billing_address->email ?: '',
                        'phone'             =>  $order->billing_address->phone ?: '',
                    ],
                    'shipping'              =>  [
                        'first_name'        =>  $order->shipping_address->name ?: '',
                        'last_name'         =>  $order->shipping_address->surname ?: '',
                        'address_1'         =>  $order->shipping_address->address_1 ?: '',
                        'address_2'         =>  $order->shipping_address->address_2 ?: '',
                        'city'              =>  $order->shipping_address->city ?: '',
                        'state'             =>  '',
                        'postcode'          =>  $order->shipping_address->pobox ?: '',
                        'country'           =>  $order->shipping_address->country ?: '',
                    ],
                    'line_items'            =>  $order->products
                        ->filter(function ($orderProduct) {
                            return ! empty($orderProduct->product->wc_product_id);
                        })
                        ->map(function ($orderProduct) {
                            $product    =   [
                                'product_id'    =>  $orderProduct->product->wc_product_id,
                                'quantity'      =>  (int) $orderProduct->quantity,
                                'name'          =>  $orderProduct->name,
                                'subtotal'      =>  (string) ($orderProduct->total_price - $orderProduct->discount),
                                'total'         =>  (string) $orderProduct->total_price,
                            ];

                            /**
                             * if the product is already synced
                             * then we'll attach it to the product
                             * to avoid multipe products are created on WooCommerce.
                             */
                            if ( ! empty( $orderProduct->wc_order_product_id ) ) {
                                $product[ 'id' ]    =   $orderProduct->wc_order_product_id;
                            }

                            return $product;
                        })->toArray(),
                ];

                if ($order->shipping > 0) {
                    $shippingMethodId = ns()->option->get('nsw_woocommerce_shipping_method_id');
                    $shippingMethod = $this->getShippingMethod($shippingMethodId);

                    $params['shipping_lines'] = [
                        [
                            'method_title'  =>  $shippingMethod->title,
                            'method_id'     =>  $shippingMethod->id,
                            'total'         =>  (string) $order->shipping,
                        ],
                    ];
                }

                if ( $order->wc_order_id !== null ) {
                    $result = (object) $this->wooclient->put('orders/' . $order->wc_order_id, $params);
                } else {
                    $result = (object) $this->wooclient->post('orders', $params);
                }

                $order->wc_order_id = $result->id;

                /**
                 * We'll try to sync the id of the product
                 * attached to the orders.
                 */
                collect( $result->line_items )->each( function( $item, $index ) use ( $order ) {

                    /**
                     * To avoid excessive request, we'll only update
                     * the OrderProduct if the woocommerce product id is not yet assigned.
                     */
                    if ( empty( $order->products[ $index ]->wc_order_product_id ) ) {
                        $order->products[ $index ]->wc_order_product_id = $item->id;
                        $order->products[ $index ]->save();
                    }
                });

                $order->save();
            }
        } catch (Exception $exception) {
            $this->syncIssueNotification(
                __m('Synchronization Issue', 'NsWooCommerce'),
                sprintf(
                    __m('Unable to sync an order : %s', 'NsWooCommerce'),
                    $exception->getMessage()
                ),
                '#'
            );

            throw new Exception($exception->getMessage());
        }
    }

    public function getShippingMethod($shippingMethodID)
    {
        return (object) $this->wooclient->get('shipping_methods/'.$shippingMethodID);
    }

    /**
     * Will delete an order on WooCommerce
     *
     * @param  Order  $order
     * @return array $array
     */
    public function deleteOrder(Order $order)
    {
        if (! empty($order->wc_order_id)) {
            $this->wooclient->delete('orders/'.$order->wc_order_id);
        }
    }

    public function disablePointingWebhook()
    {
        $webhooks   =   $this->getWebhooks();
        
        collect( $webhooks )->filter( function( $webhook ) {
            $domain         =   parse_url( $webhook->delivery_url );
            $actualDomain   =   parse_url( url('/') );

            return $domain[ 'host' ] === $actualDomain[ 'host' ];
        })->each( function( $webhook ) {
            $this->disableWebhook( $webhook );
        });
    }

    public function enablePointingWebhook()
    {
        $webhooks   =   $this->getWebhooks();
        
        collect( $webhooks )->filter( function( $webhook ) {
            $domain         =   parse_url( $webhook->delivery_url );
            $actualDomain   =   parse_url( url('/') );

            return $domain[ 'host' ] === $actualDomain[ 'host' ];
        })->each( function( $webhook ) {
            $this->enableWebhook( $webhook );
        });
    }

    public function getWebhooks()
    {
        return $this->wooclient->get('webhooks');
    }

    public function disableWebhook($webhook)
    {
        return $this->wooclient->put('webhooks/'.$webhook->id, array_merge(
            (array) $webhook, [
                'status'    =>  'paused',
            ]
        ));
    }

    public function updateProductQuantity( ProductUnitQuantity $productUnitQuantity )
    {
        $productUnitQuantity->load( 'product' );

        if ( ! empty( $productUnitQuantity->product->wc_product_id ) ) {
            $this->disablePointingWebhook();

            $this->wooclient->put( 'products/' . $productUnitQuantity->product->wc_product_id, [
                'stock_quantity'  =>  $productUnitQuantity->quantity
            ]);

            $this->enablePointingWebhook();
        }
    }

    public function deleteWebhook($webhook)
    {
        return $this->wooclient->delete('webhooks/'.$webhook->id, [
            'force' =>  true
        ]);
    }

    public function createWebhook( $webhook )
    {
        return $this->wooclient->post('webhooks', $webhook );
    }

    public function enableWebhook($webhook)
    {
        return $this->wooclient->put('webhooks/'.$webhook->id, array_merge(
            (array) $webhook, [
                'status'    =>  'active',
            ]
        ));
    }
}
