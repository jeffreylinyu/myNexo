<?php
/**
 * NexoPOS Controller
 * @since  1.0
**/

namespace App\Http\Controllers\Dashboard;

use App\Classes\Hook;
use App\Classes\Response;
use App\Crud\ProductHistoryCrud;
use App\Crud\ProductUnitQuantitiesCrud;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;



use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductHistory;
use App\Models\Unit;
use App\Models\ProductUnitQuantity;
use App\Services\CrudService;
use App\Services\Helper;
use App\Services\ProductService;
use App\Services\Options;
use Exception;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;

class ProductsController extends DashboardController
{
    /** @var ProductService */
    protected $productService;

    public function __construct( 
        ProductService $productService
    )
    {
        parent::__construct();

        $this->productService   =   $productService;
    }

    public function saveProduct( Request $request )
    {
        $primary    =   collect( $request->input( 'variations' ) )
            ->filter( fn( $variation ) => isset( $variation[ '$primary' ] ) )
            ->first();

        $source                                 =   $primary;
        $units                                  =   $primary[ 'units' ];

        /**
         * this is made to ensure the array 
         * provided aren't flatten
         */
        unset( $primary[ 'units' ] );
        unset( $primary[ 'images' ] );

        $primary[ 'identification' ][ 'name' ]          =   $request->input( 'name' );
        $primary                                        =    Helper::flatArrayWithKeys( $primary )->toArray();
        $primary[ 'product_type' ]                      =   'product';

        /**
         * let's restore the fields before
         * storing that.
         */
        $primary[ 'images' ]        =   $source[ 'images' ];
        $primary[ 'units' ]         =   $source[ 'units' ];
        
        unset( $primary[ '$primary' ] );

        /**
         * the method "create" is capable of 
         * creating either a product or a variable product
         */
        return $this->productService->create( $primary );
    }

    /**
     * returns a list of available 
     * product
     * @return array
     */
    public function getProduts()
    {
        return $this->productService->getProducts();
    }

    /**
     * Update a product using
     * a provided id
     * @param Request
     * @param int product id
     * @return array
     */
    public function updateProduct( Request $request, Product $product )
    {
        $primary    =   collect( $request->input( 'variations' ) )
            ->filter( fn( $variation ) => isset( $variation[ '$primary' ] ) )
            ->first();

        $source                                 =   $primary;
        $units                                  =   $primary[ 'units' ];
        
        /**
         * this is made to ensure the array 
         * provided aren't flatten
         */
        unset( $primary[ 'images' ] );
        unset( $primary[ 'units' ] );

        $primary[ 'identification' ][ 'name' ]          =   $request->input( 'name' );
        $primary                                        =    Helper::flatArrayWithKeys( $primary )->toArray();
        $primary[ 'product_type' ]                      =   'product';

        /**
         * let's restore the fields before
         * storing that.
         */
        $primary[ 'images' ]                =   $source[ 'images' ];
        $primary[ 'units' ]                 =   $source[ 'units' ];
        
        unset( $primary[ '$primary' ] );

        /**
         * the method "create" is capable of 
         * creating either a product or a variable product
         */
        return $this->productService->update( $product, $primary );
    }

    public function searchProduct( Request $request )
    {
        return Product::query()->orWhere( 'name', 'LIKE', "%{$request->input( 'search' )}%" )
            ->with( 'unit_quantities.unit' )
            ->orWhere( 'sku', 'LIKE', "%{$request->input( 'search' )}%" )
            ->orWhere( 'barcode', 'LIKE', "%{$request->input( 'search' )}%" )
            ->limit(5)
            ->get()
            ->map( function( $product ) use ( $request ) {
                $units  =   json_decode( $product->purchase_unit_ids );
                
                if ( $units ) {
                    $product->purchase_units     =   collect();
                    collect( $units )->each( function( $unitID ) use ( &$product ) {
                        $product->purchase_units->push( Unit::find( $unitID ) );
                    });
                }

                return $product;
            });
    }

    public function refreshPrices( $id )
    {
        $product    =   $this->productService->get( $id );
        $this->productService->refreshPrices( $product );
        
        return [
            'status'    =>  'success',
            'message'   =>  __( 'The product price has been refreshed.' ),
            'data'      =>  compact( 'product' )
        ];
    }

    public function reset( $identifier )
    {
        $product        =   $this->productService->getProductUsingArgument(
            request()->query( 'as' ) ?? 'id',
            $identifier
        );
        
        return $this->productService->resetProduct( $product );
    }

    /**
     * return the full history of a product
     * @param int product id
     * @return array
     */
    public function history( $identifier )
    {
        $product        =   $this->productService->getProductUsingArgument(
            request()->query( 'as' ) ?? 'id',
            $identifier
        );

        return $this->productService->getProductHistory( 
            $product->id
        );
    }

    public function units( $identifier )
    {
        $product        =   $this->productService->getProductUsingArgument(
            request()->query( 'as' ) ?? 'id',
            $identifier
        );
        
        return $this->productService->getUnitQuantities( 
            $product->id
        );
    }

    public function getUnitQuantities( Product $product )
    {
        return $this->productService->getProductUnitQuantities( $product );
    }

    /**
     * delete a product
     * @param int product_id
     * @return array reponse
     */
    public function deleteProduct( $identifier )
    {
        $product        =   $this->productService->getProductUsingArgument(
            request()->query( 'as' ) ?? 'id',
            $identifier
        );

        return $this->productService->deleteProduct( $product );
    }

    /**
     * Return a single product ig that exists
     * with his variations
     * @param string|int filter
     * @return array found product
     */
    public function singleProduct( $identifier )
    {
        return $this->productService->getProductUsingArgument(
            request()->query( 'as' ) ?? 'id',
            $identifier
        );
    }

    /**
     * return all available variations
     * @return array
     */
    public function getAllVariations()
    {
        return $this->productService->getProductVariations();
    }

    /**
     * delete all available product variations
     */
    public function deleteAllVariations()
    {
        return $this->productService->deleteVariations();
    }

    public function deleteAllProducts()
    {
        return $this->productService->deleteAllProducts();        
    }

    public function getProductVariations( $identifier )
    {
        $product    =   $this->productService->getProductUsingArgument(
            request()->query( 'as' ) ?? 'id',
            $identifier
        );

        return $product->variations;
    }

    /**
     * delete a single variation product
     * @param int product id
     * @param int variation id
     * @return array status of the operation
     */
    public function deleteSingleVariation( $product_id, int $variation_id )
    {
        /**
         * @todo consider registering an event for 
         * catching when a single is about to be delete
         */

        /** @var Product */
        $product    =   $this->singleProduct( $product_id );

        $results    =   $product->variations->map( function( $variation ) use ( $variation_id ) {
            if ( $variation->id === $variation_id ) {
                $variation->delete();
                return 1;
            }
            return 0;
        });

        $opResult   =   $results->reduce( function( $before, $after ) {
            return $before + $after;
        });

        return floatval( $opResult ) > 0 ? [
            'status'        =>      'success',
            'message'       =>      __( 'The single variation has been deleted.' )
        ] : [
            'status'        =>      'failed',
            'message'       =>      sprintf( __( 'The the variation hasn\'t been deleted because it might not exist or is not assigned to the parent product "%s".' ), $product->name )
        ];
    }

    /**
     * Create a single product
     * variation
     * @param int product id (parent)
     * @param Request data
     * @return array
     */
    public function createSingleVariation( $product_id, Request $request )
    {
        $product    =   $this->productService->get( $product_id );
        return $this->productService->createProductVariation( $product, $request->all() );
    }

    public function editSingleVariation( $parent_id, $variation_id, Request $request )
    {
        $parent     =   $this->productService->get( $parent_id );
        return $this->productService->updateProductVariation( $parent, $variation_id, $request->all() );
    }

    public function listProducts()
    {
        ns()->restrict([ 'nexopos.read.products' ]);

        Hook::addFilter( 'ns-crud-footer', function( Response $response ) {
            $response->addView( 'pages.dashboard.products.quantity-popup' );
            return $response;
        });

        return $this->view( 'pages.dashboard.crud.table', [
            'title'         =>      __( 'Products List' ),
            'createUrl'     =>  url( '/dashboard/products/create' ),
            'desccription'  =>  __( 'List all products available on the system' ),
            'src'           =>  url( '/api/nexopos/v4/crud/ns.products' ),
        ]);
    }

    public function editProduct( Product $product )
    {
        ns()->restrict([ 'nexopos.update.products' ]);

        return $this->view( 'pages.dashboard.products.create', [
            'title'         =>  __( 'Edit a product' ),
            'description'   =>  __( 'Makes modifications to a product' ),
            'submitUrl'     =>  url( '/api/nexopos/v4/products/' . $product->id ),
            'returnUrl'     =>  url( '/dashboard/products' ),
            'unitsUrl'      =>  url( '/api/nexopos/v4/units-groups/{id}/units' ),
            'submitMethod'  =>  'PUT',
            'src'           =>  url( '/api/nexopos/v4/crud/ns.products/form-config/' . $product->id ),
        ]);
    }

    public function createProduct()
    {
        ns()->restrict([ 'nexopos.create.products' ]);

        return $this->view( 'pages.dashboard.products.create', [
            'title'         =>  __( 'Create a product' ),
            'description'   =>  __( 'Add a new product on the system' ),
            'submitUrl'     =>  url( '/api/nexopos/v4/products' ),
            'returnUrl'    =>  url( '/dashboard/products' ),
            'unitsUrl'      =>  url( '/api/nexopos/v4/units-groups/{id}/units' ),
            'src'           =>  url( '/api/nexopos/v4/crud/ns.products/form-config' ),
        ]);
    }

    /**
     * Renders the crud table for the product
     * units
     * @return View
     */
    public function productUnits()
    {
        return ProductUnitQuantitiesCrud::table();
    }

    /**
     * render the crud table for the product
     * history
     * @return View
     */
    public function productHistory()
    {
        Hook::addFilter( 'ns-crud-footer', function( Response $response, $identifier ) {
            $response->addView( 'pages.dashboard.products.history' );
            return $response;
        }, 10, 2 );

        return ProductHistoryCrud::table();
    }

    public function showStockAdjustment()
    {
        return $this->view( 'pages.dashboard.products.stock-adjustment', [
            'title'     =>      __( 'Stock Adjustment' ),
            'description'   =>  __( 'Adjust stock of existing products.' ),
            'actions'       =>  Helper::kvToJsOptions([
                ProductHistory::ACTION_ADDED        =>  __( 'Add' ),
                ProductHistory::ACTION_DELETED      =>  __( 'Delete' ),
                ProductHistory::ACTION_DEFECTIVE    =>  __( 'Defective' ),
                ProductHistory::ACTION_LOST         =>  __( 'Lost' ),
            ])
        ]);
    }

    public function getUnitQuantity( Product $product, Unit $unit )
    {
        $quantity   =   $this->productService->getUnitQuantity( $product->id, $unit->id );

        if ( $quantity instanceof ProductUnitQuantity ) {
            return $quantity;
        }

        throw new Exception( __( 'No stock is provided for the requested product.' ) );
    }

    public function deleteUnitQuantity( ProductUnitQuantity $unitQuantity )
    {
        ns()->restrict([ 'nexopos.delete.products-units', 'nexopos.make.products-adjustments' ]);

        $result     =   true;
        if ( $unitQuantity->quantity > 0 ) {
            $result     =   $this->productService->stockAdjustment( ProductHistory::ACTION_DELETED, [
                'unit_price'    =>  $unitQuantity->sale_price,
                'quantity'      =>  $unitQuantity->quantity,
            ]);
        }

        if ( $result instanceof ProductHistory || $result ) {
            $unitQuantity->delete();
        }

        return [
            'status'    =>  'success',
            'message'   =>  __( 'The product unit quantity has been deleted.' )
        ];
    }

    public function createAdjustment( Request $request )
    {
        ns()->restrict([ 'nexopos.make.products-adjustments' ]);

        $validator =        Validator::make( $request->all(), [
            'products'  =>  'required'
        ]);

        if ( $validator->fails() ) {
            throw new Exception( __( 'Unable to proceed as the request is not valid.' ) );
        }

        $results        =   [];

        /**
         * We need to make sure the action
         * made are actually supported.
         */
        foreach( $request->input( 'products' ) as $unit ) {
            if ( 
                ! in_array( $unit[ 'adjust_action' ], ProductHistory::STOCK_INCREASE ) &&
                ! in_array( $unit[ 'adjust_action' ], ProductHistory::STOCK_REDUCE )
            ) {
                throw new Exception( sprintf( __( 'Unsupported action for the product %s.' ), $unit[ 'name' ] ) );
            }
        }

        /**
         * now we can adjust the stock of the items
         */
        foreach( $request->input( 'products' ) as $unit ) {
            $results[]          =   $this->productService->stockAdjustment( $unit[ 'adjust_action' ], [
                'unit_price'    =>  $unit[ 'adjust_unit' ][ 'sale_price' ],
                'unit_id'       =>  $unit[ 'adjust_unit' ][ 'unit_id' ],
                'product_id'    =>  $unit[ 'id' ],
                'quantity'      =>  $unit[ 'adjust_quantity' ],
                'description'   =>  $unit[ 'adjust_reason' ] ?? '',
            ]);
        }

        return [
            'status'    =>  'success',
            'message'   =>  __( 'The stock has been adjustment successfully.' ),
            'data'      =>  $results
        ];
    }
}

