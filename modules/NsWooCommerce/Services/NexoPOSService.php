<?php

namespace Modules\NsWooCommerce\Services;

use App\Classes\Currency;
use App\Models\Customer;
use App\Models\Order;
use App\Models\PaymentType;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductHistory;
use App\Models\ProductUnitQuantity;
use App\Models\Unit;
use App\Services\CustomerService;
use App\Services\OrdersService;
use App\Services\ProductCategoryService;
use App\Services\ProductService;
use Exception;
use Illuminate\Support\Facades\Event;
use stdClass;

class NexoPOSService
{
    const ACTION_PRODUCT_UPDATED = 'product.updated';

    const ACTION_PRODUCT_CREATED = 'product.created';

    const ACTION_PRODUCT_DELETED = 'product.deleted';

    const ACTION_CUSTOMER_CREATED = 'customer.created';

    const ACTION_CUSTOMER_UPDATED = 'customer.updated';

    const ACTION_CUSTOMER_DELETED = 'customer.deleted';

    const ACTION_CATEGORY_CREATED = 'category.created';

    const ACTION_CATEGORY_UPDATED = 'category.updated';

    const ACTION_CATEGORY_DELETED = 'category.deleted';

    const ACTION_ORDER_CREATED = 'order.created';

    const ACTION_ORDER_UPDATED = 'order.updated';

    const ACTION_ORDER_DELETED = 'order.deleted';

    protected $productService;

    protected $orderService;

    protected $customerService;

    protected $wooCommerceService;

    protected $productCategoryService;

    public function __construct(
        ProductService $productService,
        OrdersService $orderService,
        CustomerService $customerService,
        WooCommerceService $wooCommerceService,
        ProductCategoryService $productCategoryService
    ) {
        $this->productService = $productService;
        $this->productCategoryService = $productCategoryService;
        $this->orderService = $orderService;
        $this->customerService = $customerService;
        $this->wooCommerceService = $wooCommerceService;
    }

    public function handleWebhook($action, $payload)
    {
        switch ($action) {
            case self::ACTION_PRODUCT_UPDATED:
            case self::ACTION_PRODUCT_CREATED:
                return $this->handleProductSync($payload);
            break;
            case self::ACTION_PRODUCT_DELETED:
                return $this->handleProductDeletion($payload);
            break;

            /**
             * for customers
             */
            case self::ACTION_CUSTOMER_CREATED:
            case self::ACTION_CUSTOMER_UPDATED:
                return $this->handleCustomerSync($payload);
            break;
            case self::ACTION_CUSTOMER_DELETED:
                return $this->handleCustomerDelete($payload);
            break;

            /**
             * for categories
             */
            case self::ACTION_CATEGORY_CREATED:
            case self::ACTION_CATEGORY_UPDATED:
                return $this->handleCategorySync($payload);
            break;
            case self::ACTION_CATEGORY_DELETED:
                return $this->handleCategoryDelete($payload);
            break;

            /**
             * for orders
             */
            case self::ACTION_ORDER_CREATED:
            case self::ACTION_ORDER_UPDATED:
                return $this->handleOrderSync($payload);
            break;
            case self::ACTION_ORDER_DELETED:
                return $this->handleOrderDeleteSync($payload);
            break;
        }
    }

    public function handleOrderDeleteSync( $payload )
    {
        $order  =   Order::where( 'wc_order_id', $payload->id )->first();

        if ( $order instanceof Order ) {
            $this->orderService->deleteOrder( $order );

            return [
                'status' => 'success',
                'message' => __m( 'The order were deleted successfully', 'NsWooCommerce' )
            ];
        }

        return [
            'status' => 'failed',
            'message' => __m( 'Unable to find the requested order.', 'NsWooCommerce' )
        ];
    }

    public function handleOrderSync($payload)
    {
        $payload = json_decode( json_encode( $payload ) );
        $order = Order::where('wc_order_id', $payload->id)->first();

        if (in_array($payload->status, ['completed', 'processing'])) {
            if ($order instanceof Order) {
                return $this->syncOrder($payload, $order);
            } else {
                return $this->syncOrder($payload);
            }
        }

        return [
            'status'    =>  'failed',
            'message'   =>  __m('Order is in an invalid status', 'NsWooCommerce'),
        ];
    }

    public function syncOrder($payload, Order $order = null)
    {
        $this->disableSyncBack();

        $payment = PaymentType::where('wc_payment_id', $payload->payment_method)->first();

        if (! $payment instanceof PaymentType) {

            /**
             * The synchronizatio has failed because we're
             * probably dealing with an unkown payment method.
             */
            $this->wooCommerceService->syncIssueNotification(
                __m('Synchronization Failure', 'NsWooCommerce'),
                __m('Unable to create an order on NexoPOS as the order payment method is unknown or not assigned on the payment type.', 'NsWooCommerce'),
                ns()->route('ns.dashboard.orders-payments-types')
            );

            return [
                'status'    =>  'failed',
                'message'   =>  __m('Unable to proceed as the provided payment method is unknown.', 'NsWooCommerce'),
            ];
        }

        $customer   =   Customer::where( 'wc_customer_id', $payload->customer_id )->first();

        if ( empty( $payload->customer_id ) ) {
            $customer   =   Customer::find( ns()->option->get( 'ns_customers_default' ) );

            /**
             * Seems like the default customer
             * is not defined or no longer exists
             */
            if ( ! $customer instanceof Customer ) {
                $this->wooCommerceService->syncIssueNotification(
                    __m('Synchronization Failure', 'NsWooCommerce'),
                    __m('Unable to create an order on NexoPOS as no default customer is assigned on the customers settings.', 'NsWooCommerce'),
                    '#'
                );

                return [
                    'status'    =>  'failed',
                    'message'   =>  __m('Unable to proceed as no customer is defined on the customers settings.', 'NsWooCommerce'),
                ];
            }
        }
        
        /**
         * if the provided customer
         * doesn't seems to exists on the database
         * we'll create him
         */
        if ( ! $customer instanceof Customer ) {
            $newPayLoad             =   new stdClass;
            $newPayLoad->id         =   $payload->customer_id;
            $newPayLoad->billing    =   $payload->billing;
            $newPayLoad->shipping   =   $payload->shipping;
            $newPayLoad->first_name =   $payload->billing->first_name;
            $newPayLoad->last_name  =   $payload->billing->last_name;

            $result     =   $this->handleCustomerSync( $newPayLoad );
            $customer   =   $result[ 'data' ][ 'customer' ];
        }

        $result = $this->orderService->create([
            'products'  =>  collect($payload->line_items)->map(function ($product) {
                $product = (object) $product;
                $originalProduct = Product::where('wc_product_id', $product->product_id)->first();
                $unitID = $originalProduct->unit_quantities[0]->unit_id ?? ns()->option->get('nsw_default_unit');
                $unit = Unit::find($unitID);

                return [
                    'name'                  =>  $product->name,
                    'quantity'              =>  $product->quantity,
                    'unit_price'            =>  Currency::raw($product->price),
                    'total_price'           =>  Currency::raw($product->total),
                    'product_id'            =>  $originalProduct->id ?? 0,
                    'product_category_id'   =>  $originalProduct->category->id ?? 0,
                    'unit_id'               =>  $unitID,
                    'unit_name'             =>  $unit->name,
                    'unit_quantity_id'      =>  $originalProduct->unit_quantities[0]->id ?? $this->productService->getUnitQuantity(
                        $originalProduct->id,
                        $unitID
                    )->id,
                    'wc_order_product_id'   =>  $product->id,
                ];
            }),
            'wc_order_id'   =>  $payload->id,
            'customer_id'   =>  $customer->id,
            'payments'      =>  [
                [
                    'identifier'    =>  $payment->identifier,
                    'value'         =>  $payload->total,
                ],
            ],
            'type'              =>  ['identifier' => Order::TYPE_DELIVERY], // by default
            'addresses'         =>  [
                'shipping'      =>  [
                    'name'      =>  $payload->shipping->first_name ?? '',
                    'surname'   =>  $payload->shipping->last_name ?? '',
                    'phone'     =>  $payload->shipping->phone ?? '',
                    'address_1' =>  $payload->shipping->address_1 ?? '',
                    'address_2' =>  $payload->shipping->address_2 ?? '',
                    'country'   =>  $payload->shipping->country ?? '',
                    'city'      =>  $payload->shipping->city ?? '',
                    'pobox'     =>  $payload->shipping->postcode ?? '',
                    'company'   =>  $payload->shipping->company ?? '',
                    'email'     =>  $payload->shipping->email ?? '',
                ],
                'billing'   =>  [
                    'name'      =>  $payload->billing->first_name ?? '',
                    'surname'   =>  $payload->billing->last_name ?? '',
                    'phone'     =>  $payload->billing->phone ?? '',
                    'address_1' =>  $payload->billing->address_1 ?? '',
                    'address_2' =>  $payload->billing->address_2 ?? '',
                    'country'   =>  $payload->billing->country ?? '',
                    'city'      =>  $payload->billing->city ?? '',
                    'pobox'     =>  $payload->billing->postcode ?? '',
                    'company'   =>  $payload->billing->company ?? '',
                    'email'     =>  $payload->billing->email ?? '',
                ],
            ],
        ], $order);

        if ($order === null) {
            $order = Order::find($result['data']['order']->id);
        }

        $order->wc_order_id = $payload->id;
        $order->save();

        return (array) $result;
    }

    public function handleCategorySync($payload)
    {
        // ...
    }

    public function handleCategoryDelete($payload)
    {
        //...
    }

    public function handleCustomerDelete($payload)
    {
        $customer = Customer::where('wc_customer_id', $payload->id)->first();

        if ($customer instanceof Customer) {
            $this->customerService->delete($customer->id);
        }
    }

    public function handleCustomerSync($payload)
    {
        $this->disableSyncBack();

        $payload = json_decode( json_encode( $payload ) );

        $customer = Customer::where('wc_customer_id', $payload->id)->first();
        
        $data = [
            'email'             =>  $payload->email ?? $payload->billing->email,
            'name'              =>  $payload->first_name,
            'pobox'             =>  $payload->billing->postcode ?? '',
            'wc_customer_id'    =>  $payload->id,
            'surname'           =>  $payload->last_name,
            'group_id'          =>  ns()->option->get('nsw_customer_group'),
            'address'           =>  [
                'billing'           =>  [
                    'name'          =>  $payload->billing->first_name ?? '',
                    'surname'       =>  $payload->billing->last_name ?? '',
                    'address_1'     =>  $payload->billing->address_1 ?? '',
                    'address_2'     =>  $payload->billing->address_2 ?? '',
                    'city'          =>  $payload->billing->city ?? '',
                    'pobox'         =>  $payload->billing->postcode ?? '',
                    'email'         =>  $payload->billing->email ?? '',
                    'country'       =>  $payload->billing->state ?? '',
                    'company'       =>  $payload->billing->company ?? '',
                ],
                'shipping'          =>  [
                    'name'          =>  $payload->billing->first_name ?? '',
                    'surname'       =>  $payload->billing->last_name ?? '',
                    'address_1'     =>  $payload->billing->address_1 ?? '',
                    'address_2'     =>  $payload->billing->address_2 ?? '',
                    'city'          =>  $payload->billing->city ?? '',
                    'pobox'         =>  $payload->billing->postcode ?? '',
                    'email'         =>  $payload->billing->email ?? '',
                    'country'       =>  $payload->billing->state ?? '',
                    'company'       =>  $payload->billing->company ?? '',
                ],
            ],
        ];

        if ($customer instanceof Customer) {
            return $this->customerService->update($customer->id, $data);
        } else {
            return $this->customerService->create($data);
        }
    }

    public function handleProductDeletion($payload)
    {
        $this->disableSyncBack();
        $this->deleteProduct($payload);
    }

    /**
     * Will delete products synchronized on NexoPOS
     *
     * @param  array  $payload
     * @return array $result
     */
    public function deleteProduct($payload)
    {
        $payload = (object) $payload;
        $product = Product::where('wc_product_id', $payload->id)->first();

        if ($product instanceof Product) {
            return $this->productService->deleteUsingID($product->id);
        }

        return [
            'status'    =>  'failed',
            'message'   =>  __m('The deleted products wasn\'nt synchronised.', 'NsWooCommerce'),
        ];
    }

    public function disableSyncBack()
    {
        global $wcSync;

        /**
         * we don't want the system to send a synchronization
         * to WooCommerce as it's already receiving informations from WooCommerce.
         */
        $wcSync = false;
    }

    /**
     * Will handle product synchronization
     *
     * @param  array  $payload
     * @return void
     */
    public function handleProductSync($payload)
    {
        $this->disableSyncBack();

        /**
         * we don't want to dispatch any event
         * after doing that
         */
        $product = Product::where('wc_product_id', $payload['id'])->first();

        if ($product instanceof Product) {
            $this->updateProduct($product, $payload);
        } else {
            $this->createProduct($payload);
        }

        return [
            'status'    =>  'success',
            'message'   =>  __m('The operation was successful.', 'NsWooCommerce'),
        ];
    }

    /**
     * Will disable all Webhook belonging to the same topic
     *
     * @param $topic string
     * @return void
     */
    public function disableRemoteWebhook($topic)
    {
        $webhooks = collect($this->wooCommerceService->getWebhooks())->filter(function ($webhook) use ($topic) {
            return $webhook->topic === $topic;
        });

        $webhooks->each(fn ($webhook) => $this->wooCommerceService->disableWebhook($webhook));
    }

    /**
     * Will enable all Webhook belonging to the same topic
     *
     * @param $topic string
     * @return void
     */
    public function enableRemoteWebhook($topic)
    {
        $webhooks = collect($this->wooCommerceService->getWebhooks())->filter(function ($webhook) use ($topic) {
            return $webhook->topic === $topic;
        });

        $webhooks->each(fn ($webhook) => $this->wooCommerceService->enableWebhook($webhook));
    }

    /**
     * Will get categories matching a specific
     * criteria on NexoPOS
     *
     * @param  array  $array
     * @return mixed
     */
    public function getCategory($categories)
    {
        if (! empty($categories)) {
            return ProductCategory::where('wc_category_id', $categories[0]['id'])
                ->firstOr(function () use ($categories) {
                    $this->retreiveAndSyncCategories();
                    $category = ProductCategory::where('wc_category_id', $categories[0]['id'])->first();

                    return $category instanceof ProductCategory ? $category : false;
                });
        }

        return false;
    }

    /**
     * Will retreive the category from WooCommerce
     * and synchronize it on NexoPOS
     *
     * @param  int  $category_id
     * @return ProductCategory $productCategory
     */
    public function retreiveAndSyncCategories()
    {
        $categories = $this->wooCommerceService->getCategories();

        return $this->saveWooCommerceCategories($categories);
    }

    public function saveWooCommerceCategories($categories, ProductCategory $productCategory = null)
    {
        $childs = collect($categories)->filter(fn ($cat) => $cat->parent === ($productCategory !== null ? $productCategory->wc_category_id : 0));

        $result = $childs->map(function ($child) use ($categories, $productCategory) {
            $existingCategory = ProductCategory::where('wc_category_id', $child->id)->first();

            $result = $this->productCategoryService->create([
                'name'              =>  $child->name,
                'display_on_pos'    =>  1,
                'preview_url'       =>  isset($child->image) ? $child->image->src : '',
                'description'       =>  $child->description,
                'parent_id'         =>  $productCategory !== null ? $productCategory->id : 0,
            ], $existingCategory );

            /**
             * @var ProductCategory
             */
            $parent = $result['data']['category'];
            $parent->wc_category_id = $child->id;
            $parent->save();

            return [
                'result'    =>  $result,
                'data'      =>  $this->saveWooCommerceCategories($categories, $parent),
            ];
        });

        return [
            'status'    =>  'sucess',
            'message'   =>  __('The category has been saved.'),
            'data'      =>  compact('result'),
        ];
    }

    public function updateProduct(Product $product, $payload)
    {
        $payload = (object) $payload;
        $defaultCategory = ns()->option->get('nsw_default_category_id');
        $defaultUnitGroup = ns()->option->get('nsw_default_unit_group');
        $defaultUnit = ns()->option->get('nsw_default_unit');
        $defaultTaxGroup = ns()->option->get('nsw_default_tax_group');
        $category = $this->getCategory($payload->categories);
        $images = collect( $payload->images )->map( function( $image, $index ) {
            return [
                'featured'  =>  $index === 0 ? 1 : 0,
                'url'   =>  $image[ 'src' ]
            ];
        })->toArray();

        $result = $this->productService->update($product, [
            'name'              =>  $payload->name,
            'product_type'      =>  'product',
            'barcode'           =>  $payload->sku,
            'sku'               =>  $payload->sku,
            'type'              =>  $payload->virtual ? 'dematerialized' : 'materialized',
            'accurate_tracking' =>  false,
            'stock_management'  =>  $payload->manage_stock ? Product::STOCK_MANAGEMENT_ENABLED : Product::STOCK_MANAGEMENT_DISABLED,
            'status'            =>  $payload->status === 'publish' ? 'available' : 'unavailable',
            'barcode_type'      =>  'code128', // $product->barcode_type ?: 'code11',
            'images'            =>  $images,
            'description'       =>  $payload->description,
            'category_id'       =>  $category->id ?? $defaultCategory,
            'tax_group_id'      =>  $defaultTaxGroup,
            'units'             =>  [
                'unit_group'        =>  $product->unit_group ?: $defaultUnitGroup,
                'selling_group' =>  [
                    [
                        'unit_id'               =>  $defaultUnit,
                        'sale_price_edit'       =>  Currency::raw($payload->price),
                        'wholesale_price_edit'  =>  0,
                    ],
                ],
            ],
        ]);

        /**
         * if we're creating a product
         * we'll make sure to define
         * the quantity as a procured stock.
         */
        $actualQuantity     =   $this->productService->getQuantity( 
            product_id: $result['data']['product']['id'], 
            unit_id: $defaultUnit 
        );

        if ( ( float ) $actualQuantity !== (float) $payload->stock_quantity ) {

            /**
             * @var ProductUnitQuantity
             */
            $unitQuantity   =   ProductUnitQuantity::where( 'product_id', $result['data']['product']['id'] )
                ->where( 'unit_id', $defaultUnit )
                ->first();


            if ( ( float ) $actualQuantity > (float) $payload->stock_quantity ) {
                $this->productService->stockAdjustment( ProductHistory::ACTION_DELETED, [
                    'product_id'    =>  $result['data']['product']['id'],
                    'unit_id'       =>  $defaultUnit,
                    'quantity'      =>  $actualQuantity - (float) $payload->stock_quantity, // to determine how much we add
                    'unit_price'    =>  $unitQuantity->sale_price
                ]);
            } else {
                $this->productService->stockAdjustment( ProductHistory::ACTION_ADDED, [
                    'product_id'    =>  $result['data']['product']['id'],
                    'unit_id'       =>  $defaultUnit,
                    'quantity'      =>  (float) $payload->stock_quantity - $actualQuantity, // to determine how much we remove
                    'unit_price'    =>  $unitQuantity->sale_price
                ]);
            }
        }

        return [
            'status'    =>  'success',
            'message'   =>  __m('The product has been created.', 'NsWooCommerce'),
        ];
    }

    public function createProduct($payload)
    {
        $payload = (object) $payload;
        $defaultCategory = ns()->option->get('nsw_default_category_id');
        $defaultUnitGroup = ns()->option->get('nsw_default_unit_group');
        $defaultUnit = ns()->option->get('nsw_default_unit');
        $defaultTaxGroup = ns()->option->get('nsw_default_tax_group');
        $category = $this->getCategory($payload->categories);
        $images = collect( $payload->images )->map( function( $image, $index ) {
            return [
                'featured'  =>  $index === 0 ? 1 : 0,
                'url'   =>  $image[ 'src' ]
            ];
        })->toArray();

        $result = $this->productService->create([
            'name'              =>  $payload->name,
            'product_type'      =>  'product',
            'barcode'           =>  $payload->sku,
            'sku'               =>  $payload->sku,
            'wc_product_id'     =>  $payload->id,
            'type'              =>  $payload->virtual ? 'dematerialized' : 'materialized',
            'accurate_tracking' =>  false,
            'stock_management'  =>  $payload->manage_stock ? Product::STOCK_MANAGEMENT_ENABLED : Product::STOCK_MANAGEMENT_DISABLED,
            'status'            =>  $payload->status === 'publish' ? 'available' : 'unavailable',
            'barcode_type'      =>  'code128',
            'description'       =>  $payload->description,
            'category_id'       =>  $category->id ?? $defaultCategory,
            'tax_group_id'      =>  $defaultTaxGroup,
            'images'            =>  $images,
            'units'             =>  [
                'unit_group'        =>  $defaultUnitGroup,
                'selling_group' =>  [
                    [
                        'unit_id'               =>  $defaultUnit,
                        'sale_price_edit'       =>  Currency::raw($payload->price),
                        'wholesale_price_edit'  =>  0,
                    ],
                ],
            ],
        ]);

        /**
         * if we're creating a product
         * we'll make sure to define
         * the quantity as a procured stock.
         */
        $this->productService->setQuantity(
            $result['data']['product']['id'],
            $defaultUnit,
            (float) $payload->stock_quantity
        );

        return [
            'status'    =>  'success',
            'message'   =>  __m('The product has been created.', 'NsWooCommerce'),
        ];
    }
}
