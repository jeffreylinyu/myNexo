<?php

namespace Modules\NsGastro\Services;

use App\Events\OrderAfterUpdatedEvent;
use App\Exceptions\NotAllowedException;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductUnitQuantity;
use App\Services\OrdersService;
use App\Services\ProductCategoryService;
use Exception;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Str;
use Modules\NsGastro\Events\GastroAfterCanceledOrderProductEvent;
use Modules\NsGastro\Events\GastroBeforeCanceledOrderProductEvent;
use Modules\NsGastro\Events\GastroNewProductAddedToOrderEvent;
use Modules\NsGastro\Events\KitchenAfterUpdatedOrderEvent;
use Modules\NsGastro\Events\TableAfterUpdatedEvent;
use Modules\NsGastro\Models\Kitchen;
use Modules\NsGastro\Models\KitchenCategory;
use Modules\NsGastro\Models\KitchenPrinter;
use Modules\NsGastro\Models\ModifierGroup;
use Modules\NsGastro\Models\Order as GastroOrder;
use Modules\NsGastro\Models\OrderProduct as GastroOrderProduct;
use Modules\NsGastro\Models\Table;
use Modules\NsPrintAdapter\Services\PrintService;

class GastroOrderService
{
    private $ordersService;

    private $productCategoryService;

    public function __construct(
        OrdersService $ordersService,
        ProductCategoryService $productCategoryService
    ) {
        $this->ordersService = $ordersService;
        $this->productCategoryService = $productCategoryService;
    }

    /**
     * Will cancel a meal attached to an order
     *
     * @param  Kitchen  $kitchen
     * @param  Order  $order
     * @param  array  $products
     * @return array
     */
    public function cancelOrderMeals(GastroOrder $order, $products, $reason)
    {
        $products = $order->products->filter(fn ($product) => in_array($product->id, $products));

        if (($products->count() === 0)) {
            throw new NotAllowedException(__m('The meals send for cancelation is not recognized as part of the order.', 'NsGastro'));
        }

        $products->each(function ($product) use ($reason) {
            $this->cancelSingleItem( $product, $reason );
        });

        $order->refresh();

        KitchenAfterUpdatedOrderEvent::dispatch($order);

        return [
            'status'    =>  'success',
            'message'   =>  __m('The order meal has been canceled.', 'NsGastro'),
            'data'      =>  compact('order'),
        ];
    }

    public function cancelSingleItem( $product, $reason = '' )
    {
        GastroBeforeCanceledOrderProductEvent::dispatch($product);

        $product->cooking_status = GastroOrderProduct::COOKING_CANCELED;
        $product->cooking_cancelation_note = $reason;
        $product->meal_canceled_by = Auth::id();
        $product->meal_canceled_by_name = Auth::user()->username;
        $product->meal_cancelation_quantity = $product->quantity;
        $product->quantity = 0;
        $product->discount = 0;
        $product->price_without_tax = 0;
        $product->tax_value = 0;
        $product->price_with_tax = 0;
        $product->total_price = 0;
        $product->total_purchase_price = 0;
        $product->total_price_with_tax = 0;
        $product->total_price_without_tax = 0;
        $product->save();

        /**
         * If a meal is canceled
         * we should be able to report it.
         */
        GastroAfterCanceledOrderProductEvent::dispatch($product);
    }

    public function cancelOrderMeal(GastroOrder $order, GastroOrderProduct $product, $reason)
    {
        if ($product->cooking_status !== GastroOrderProduct::COOKING_PENDING && ns()->option->get('ns_gastro_allow_ready_meal_cancelation', 'no') === 'yes') {
            throw new NotAllowedException(__m('Unable to cancel a meal that is not pending.', 'NsGastro'));
        }

        $products = $order->products->filter(fn ($_product) => $_product->id, $product->id);

        if ($products->count() === 0) {
            throw new NotAllowedException(__m('The meal send for cancelation is not recognized as part of the order.', 'NsGastro'));
        }

        if ($order->payment_status === GastroOrder::PAYMENT_PAID) {
            throw new NotAllowedException(__m('Unable to cancel an order for an already paid order.', 'NsGastro'));
        }

        $this->cancelSingleItem( $product, $reason );

        /**
         * refreshing the order
         * as having being touched.
         */
        $order->refresh();

        KitchenAfterUpdatedOrderEvent::dispatch($order);

        return [
            'status'    =>  'success',
            'message'   =>  __m('The order meal has been canceled.', 'NsGastro'),
            'data'      =>  compact('order', 'product'),
        ];
    }

    /**
     * Will set order meals as ready
     *
     * @param  Order  $order
     * @param  array  $products
     * @return array
     */
    public function readyOrderMeals(GastroOrder $order, $products)
    {
        $products = $order->products->filter(fn ($product) => in_array($product->id, $products));

        if (($products->count() === 0)) {
            throw new NotAllowedException(__m('The meals send for cancelation is not recognized as part of the order.', 'NsGastro'));
        }

        $products->each(function ($product) {
            $product->cooking_status = GastroOrderProduct::COOKING_READY;
            $product->save();
        });

        $order->refresh();

        KitchenAfterUpdatedOrderEvent::dispatch($order);

        return [
            'status'    =>  'success',
            'message'   =>  __m('The order meals has been set as ready.', 'NsGastro'),
            'data'      =>  compact('order'),
        ];
    }

    /**
     * Will change the status of a product from
     * served to cooked.
     *
     * @param  GastroOrderProduct  $product
     * @return void
     */
    public function serveMeal(GastroOrderProduct $product)
    {
        if ($product->cooking_status !== 'ready') {
            throw new NotAllowedException(__m('Unable to serve a meal that is not ready.', 'NsGastro'));
        }

        $product->cooking_status = GastroOrderProduct::COOKING_SERVED;
        $product->meal_served_by = Auth::id();
        $product->meal_served_by_name = Auth::user()->username;
        $product->save();

        $product->order->refresh();

        KitchenAfterUpdatedOrderEvent::dispatch($product->order);

        return [
            'status'    =>  'success',
            'message'   =>  __m('The meal has been correctly served.', 'NsGastro'),
        ];
    }

    /**
     * Will change the status of a product from
     * served to cooked.
     *
     * @param  GastroOrderProduct  $product
     * @return void
     */
    public function saveMealInBulk( $products_id )
    {
        $result     =   [
            'success'   =>  0,
            'failure'   =>  0,
        ];

        foreach( $products_id as $id ) {
            $product    =   GastroOrderProduct::find( $id );
            try {
                $this->serveMeal( $product );
                $result[ 'success' ]++;
            } catch( Exception $exception ) {
                $result[ 'failure' ]++;
            }
        }

        return [
            'status'    =>  'success',
            'message'   =>  sprintf( 
                __m('%s meal(s) were marked as served, %s failed.', 'NsGastro'), 
                $result[ 'success' ],
                $result[ 'failure' ]
            )
        ];
    }

    /**
     * Will update the order note
     *
     * @param  GastroOrderProduct  $product
     * @param  string  $note
     * @return array response
     */
    public function updateProductNote(GastroOrderProduct $product, $note)
    {
        $product->cooking_note = $note;
        $product->save();

        return [
            'status'    =>  'success',
            'message'   =>  __m('The Order Product has been successfully updated.', 'NsGastro'),
        ];
    }

    /**
     * Add products to an already placed order
     *
     * @param  Order  $order
     * @param  array  $products
     * @return array
     */
    public function addProducts(Order $order, $products)
    {
        foreach ($products as &$product) {
            $product['product'] = Product::find($product['product_id']);
            $product['unitQuantity'] = ProductUnitQuantity::find($product['unit_quantity_id']);
            $product['unit_id'] = $product['unitQuantity']->unit_id;
        }

        $response = $this->ordersService->addProducts($order, $products);

        GastroNewProductAddedToOrderEvent::dispatch($order);

        /**
         * @todo must be exported
         */
        if (ns()->option->get('ns_gastro_table_availability', false)) {
            $table = Table::find($order->table_id);

            if ($table instanceof Table) {
                $table->busy = true;
                $table->save();

                TableAfterUpdatedEvent::dispatch($table);
            }
        }

        return $response;
    }

    /**
     * Split on order in mutiple slices.
     *
     * @param  array  $data
     * @return array $result
     */
    public function splitOrders($data)
    {
        /**
         * fetch original order
         */
        $order = Order::findOrFail($data['original']['id']);

        $result = collect($data['slices'])->map(function ($slice) use ($order) {
            $table = false;

            if (isset($slice['table_id'])) {
                $table = Table::find($slice['table_id']);
            }

            $products = collect($slice['products'])->map(function ($product) {
                unset($product['id']);

                /**
                 * recreate modifiers groups
                 * if it's provided
                 */
                if (! empty($product['modifiers'])) {
                    $groups = [];

                    collect($product['modifiers'])->each(function ($modifier) use (&$groups) {
                        $freshModifier = Product::with('unit_quantities')->find($modifier['modifier_id']);
                        $group = ModifierGroup::find($freshModifier->modifiers_group_id);

                        /**
                         * because by default for modifiers
                         * we always pic the first unit.
                         */
                        $modifier['unit_quantities'] = $freshModifier->unit_quantities;
                        $modifier['stock_management'] = $freshModifier->stock_management;
                        $groups[$group->id][] = $modifier;
                    });

                    $product['modifiersGroups'] = collect($groups)->map(function ($modifiers, $group_id) {
                        $group = ModifierGroup::find($group_id);
                        $group->modifier_group_id = $group->id;
                        $group->modifiers = $modifiers;

                        $finalGroup = $group->toArray();
                        unset($finalGroup['id']);

                        return $finalGroup;
                    })->toArray();
                }

                return $product;
            });

            $orderData = [
                'customer_id'           =>  $slice['customer_id'],
                'type'                  =>  ['identifier' => $slice['type']],
                'title'                 =>  $slice['name'] ?? '',
                'gastro_order_status'   =>  GastroOrder::COOKING_PENDING,
                'note_visibility'       =>  'hidden',
                'table_id'              =>  $slice['table_id'] ?? 0,
                'table_name'            =>  $table ? $table->name : '',
                'seats'                 =>  $table ? $table->seats : 0,
                'products'              =>  $products,
                'area_id'               =>  $table && $table->area ? $table->area->id : 0,
                'area_name'             =>  $table && $table->area ? $table->area->name : '',
            ];

            $result = $this->ordersService->create($orderData);
            $order = $result['data']['order'];

            /**
             * We would like now to save the new value
             * once the order has been saved.
             *
             * @todo from NexoPOS 3.7.0 we should
             * allow custom attribute instead.
             */
            unset($orderData['products']);
            unset($orderData['type']);

            foreach ($orderData as $key => $value) {
                $order->$key = $value;
            }

            $order->save();

            return $result;
        });

        $this->ordersService->deleteOrder($order);

        return  [
            'status'    =>  'success',
            'message'   =>  __m('The order has been splitted.', 'NsGastro'),
            'data'      =>  $result,
        ];
    }

    /*
     * Will merge 2 or mores order within
     * Gastro, by deleting previous reference.
     * @param array $orders
     * @return array
     */
    public function mergeOrders($orders, $details)
    {
        $isolatedProducts = collect([]);

        foreach ($orders as $order) {
            $isolatedProducts->push(
                $this->ordersService->getOrderProducts($order['id'])
            );
        }

        /**
         * We'll change the order reference for
         * each of these product and trigger a refresh
         */
        $products = $isolatedProducts
            ->flatten();

        $table = Table::find($details['table_id'] ?? null);
        $orderData = [
            'title'         =>  $details['name'] ?: '',
            'customer_id'   =>  $details['customer_id'],
            'type'          =>  ['identifier' => $details['type']],
            'table_id'      =>  $details['table_id'] ?? null,
            'seats'         =>  $table instanceof Table ? ($table->seats ?: 0) : 0,
            'table_name'    =>  $table instanceof Table ? $table->name : '',
            'products'      =>  $products->toArray(),
            'area_id'       =>  $table instanceof Table ? ($table->area->id) : 0,
            'area_name'     =>  $table instanceof Table ? ($table->area->name) : 0,
        ];

        $result = $this->ordersService->create($orderData);

        /**
         * We would like now to save the new value
         * once the order has been saved.
         *
         * @todo from NexoPOS 3.7.0 we should
         * allow custom attribute instead.
         */
        $order = $result['data']['order'];

        unset($orderData['products']);
        unset($orderData['type']);

        foreach ($orderData as $key => $value) {
            $order->$key = $value;
        }

        $order->save();

        /**
         * We'll delete previous orders
         */
        collect($orders)->each(function ($order) {
            $order = Order::find($order['id']);

            if ($order instanceof Order) {
                $this->ordersService->deleteOrder($order);
            }
        });

        return [
            'status'    =>  'success',
            'message'   =>  __m('The orders successfully merged.', 'NsGastro'),
            'data'      =>  $result['data'],
        ];
    }

    /**
     * Will parse the order
     * and generate receipt
     *
     * @param  GastroOrder  $order
     * @param  array  $products_id
     * @return Collection
     */
    public function getKichensReceipts(GastroOrder $order, $products_id = [])
    {
        $products = $order->products()
            ->where('meal_printed', false)
            ->get();

        /**
         * This likely means that there is
         * no products that needs to be printed.
         */
        if ($products->count() === 0) {
            return collect([]);
        }

        $productCategories = $products
            ->filter(fn ($orderProduct) => empty($products_id) || in_array($orderProduct->id, $products_id))
            ->filter(fn ($orderProduct) => $orderProduct->product_category_id > 0)
            ->map(fn ($orderProduct) => $orderProduct->product_category_id)
            ->unique();

        /**
         * This will ensures to retreive all
         * parent category from the products
         *
         * @todo Unit Test Needed
         */
        $categories = collect($productCategories)->map(function ($category_id) {
            return $this->productCategoryService->getCategoryParents($category_id);
        })->flatten();

        /**
         * Let's merge the product category to make
         * sure it remains for checking the kitchens
         */
        $categories->merge($productCategories->toArray());

        $kitchens = KitchenCategory::whereIn('category_id', $categories)
            ->with('kitchen')
            ->select('kitchen_id')
            ->groupBy(['kitchen_id'])
            ->get();

        $receipts = $kitchens->map(function ($kitchenCategory) use ($order, $products, $products_id) {
            if ($kitchenCategory->kitchen !== null) {
                $categories = $kitchenCategory->kitchen->categories()
                    ->get('category_id')
                    ->pluck('category_id')
                    ->toArray();
            } else {
                $categories = [];
            }

            $childrens = collect($categories)->map(function ($category) {
                return $this->productCategoryService->getCategoryChildrens($category);
            })->flatten();

            $categories = array_merge($childrens->toArray(), $categories);

            $products = $products
                ->filter(
                    fn ($orderProduct) => in_array($orderProduct->product_category_id, $categories)
                );

            $printService = new PrintService;
            $kitchen = $kitchenCategory->kitchen;

            /**
             * if we're returning the items, we
             * can mark the returned items as printed
             */
            $products->each(function ($product) {
                $product->meal_printed = true;
                $product->save();
            });

            return [
                'kitchen'       =>  $kitchen,
                'products'      =>  $products,
                'nps_address'   =>  Str::finish(ns()->option->get('ns_gastro_nps_address'), '/'),
                'template'      =>  (string) View::make('NsGastro::kitchens.receipt', compact('order', 'products', 'printService', 'kitchen')),
                'printers'      =>  KitchenPrinter::where('kitchen_id', $kitchenCategory->kitchen_id)->get()->map(fn ($printer) => $printer->printer),
            ];
        });

        return $receipts;
    }

    public function getKitchensCanceledReceipts( GastroOrder $order )
    {
        $products = $order->products()
            ->where( 'cooking_status', GastroOrderProduct::COOKING_CANCELED )
            ->where( 'meal_cancelation_printed', false )
            ->get();

        /**
         * This likely means that there is
         * no products that needs to be printed.
         */
        if ($products->count() === 0) {
            return collect([]);
        }

        $productCategories = $products
            ->filter(fn ($orderProduct) => empty($products_id) || in_array($orderProduct->id, $products_id))
            ->filter(fn ($orderProduct) => $orderProduct->product_category_id > 0)
            ->map(fn ($orderProduct) => $orderProduct->product_category_id)
            ->unique();

        /**
         * This will ensures to retreive all
         * parent category from the products
         *
         * @todo Unit Test Needed
         */
        $categories = collect($productCategories)->map(function ($category_id) {
            return $this->productCategoryService->getCategoryParents($category_id);
        })->flatten();

        /**
         * Let's merge the product category to make
         * sure it remains for checking the kitchens
         */
        $categories->merge($productCategories->toArray());

        $kitchens = KitchenCategory::whereIn('category_id', $categories)
            ->with('kitchen')
            ->select('kitchen_id')
            ->groupBy(['kitchen_id'])
            ->get();

        $receipts = $kitchens->map(function ($kitchenCategory) use ($order, $products ) {
            if ($kitchenCategory->kitchen !== null) {
                $categories = $kitchenCategory->kitchen->categories()
                    ->get('category_id')
                    ->pluck('category_id')
                    ->toArray();
            } else {
                $categories = [];
            }

            $childrens = collect($categories)->map(function ($category) {
                return $this->productCategoryService->getCategoryChildrens($category);
            })->flatten();

            $categories = array_merge($childrens->toArray(), $categories);

            $products = $products
                ->filter(
                    fn ($orderProduct) => in_array($orderProduct->product_category_id, $categories)
                );

            $printService = new PrintService;
            $kitchen = $kitchenCategory->kitchen;

            /**
             * if we're returning the items, we
             * can mark the returned items as printed
             */
            $products->each(function ($product) {
                $product->meal_cancelation_printed = true;
                $product->save();
            });

            return [
                'kitchen'       =>  $kitchen,
                'products'      =>  $products,
                'nps_address'   =>  Str::finish(ns()->option->get('ns_gastro_nps_address'), '/'),
                'template'      =>  (string) View::make('NsGastro::kitchens.canceled-receipt', compact('order', 'products', 'printService', 'kitchen')),
                'printers'      =>  KitchenPrinter::where('kitchen_id', $kitchenCategory->kitchen_id)->get()->map(fn ($printer) => $printer->printer),
            ];
        });

        return $receipts;
    }

    public function changeOrderCookingStatus(Order $order, $status)
    {
        $order->gastro_order_status = $status;
        $order->products->each(function ($product) use ($status) {
            $product->cooking_status = $status;
            $product->save();
        });

        $order->save();

        OrderAfterUpdatedEvent::dispatch($order);

        return [
            'status'    =>  'success',
            'message'   =>  __m('The order cooking status has been updated.', 'NsGastro'),
        ];
    }
}
