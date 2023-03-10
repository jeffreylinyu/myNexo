<template>
    <div class="shadow-xl flex flex-col w-95vw h-95vh ns-box">
        <div class="flex justify-between border-b items-center ns-box-header p-2">
            <h2>{{ __m( 'Split Orders', 'NsGastro' ) }}</h2>
            <div>
                <ns-close-button @click="popupResolver()"></ns-close-button>
            </div>
        </div>
        <div class="p-2 ns-box-body flex-auto flex flex-col overflow-hidden" v-if="splitResult === null">
            <div class="rounded overflow-hidden border-2 flex flex-shrink-0 input-group info w-full">
                <input ref="searchField" :placeholder="__m( 'Order Code', 'NsGastro' )" v-model="search" type="text" class="flex-auto p-2 outline-none">
                <button @click="searchOrderWithQuery( search )" class="px-3 py-2">{{ __m( 'Search', 'NsGastro' ) }}</button>
            </div>
            <div class="h-0 relative">
                <div class="shadow elevation-surface w-full absolute z-10">
                    <ul>
                        <li 
                            v-for="order of searchResults" 
                            :key="order.id" 
                            @click="selectOrder( order )"
                            class="cursor-pointer p-2 border-b bg-box-elevation-edge flex flex-col justify-between">
                                <div class="flex justify-between">
                                    <h2 class="font-semibold text-primary">{{ order.code }}</h2>
                                    <span class="text-primary">{{ order.total | currency }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <div>
                                        <span class="text-sm text-secondary">{{ __m( 'Customer: ', 'NsGastro' ) }} {{ order.customer.name }}</span>
                                    </div>
                                    <div>
                                        <span class="text-sm text-secondary">{{ __m( 'Order Type: ', 'NsGastro' ) }} {{ getOrderType( order.type ) }}</span>
                                    </div>
                                </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="h-full w-full flex items-center justify-center" v-if="selectedOrder === null">
                <div class="flex flex-col justify-center items-center text-gray-500">
                    <i class="las la-smile go-text-8xl"></i>
                    <p class="text-sm">{{ __m( 'Search an order to get started.', 'NsGastro' ) }}</p>
                </div>
            </div>
            <div class="flex flex-auto go-mt-4 flex-wrap overflow-auto md:overflow-hidden" v-if="selectedOrder !== null">
                <div class="w-full md:w-1/2 md:h-full p-2 elevation-surface md:flex-auto md:overflow-y-auto">
                    <h1 class="text-secondary w-full py-2 border-b border-indigo-400 flex justify-between">
                        <span>{{ __m( 'Original Order', 'NsGastro' ) }}</span>
                        <span>{{ selectedOrder.code }}</span>
                    </h1>
                    <div class="py-2">
                        <div class="flex mb-2">
                            <div class="rounded border-2 input-group info flex overflow-hidden flex-auto">
                                <input ref="sliceField" type="number" v-model="slices" class="p-2 flex-auto outline-none">
                                <button @click="generatePortions()" class="px-3 py-1">{{ __m( 'Generate', 'NsGastro' ) }}</button>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-1">
                            <div class="p-1 w-full lg:w-1/2" 
                                :key="product.id" 
                                v-for="product of orderProducts">
                                <div 
                                class="bg-info-secondary flex p-2">
                                    <div class="flex flex-auto">
                                        <div class="flex-auto">
                                            <span class="text-primary">{{ product.name }} (x{{ product.displayed_quantity }})</span>
                                            <ul>
                                                <li class="text-sm text-secondary p-1 border-b border-blue-400 flex justify-between" v-for="modifier of product.modifiers" :key="modifier.id">
                                                    <span>{{ modifier.name }} (x{{ modifier.quantity }})</span>
                                                    <span>{{ modifier.total_price | currency }}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <span class="flex justify-end">{{ product.total_price | currency }}</span>
                                    </div>
                                </div>
                                <div class="w-full flex">
                                    <button @click="addProductToSelectedSlice( product )" v-if="sliceOrderSelected" class="flex-auto bg-blue-400 text-white font-bold outline-none p-1">{{ __m( 'Add', 'NsGastro' ) }}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-1/2 md:h-full md:flex-auto overflow-y-auto">
                    <div :class="order.selected ? 'elevation-surface border-t-2 border-b-2 border-box-edge' : ''" class="p-2" :key="index" v-for="(order,index) of ordersPortions">
                        <ns-field @change="detectOrderType( $event, order )" :field="field" v-for="(field,index) of order.fields" :key="index"></ns-field>
                        <div class="my-2 border border-box-elevation-edge" v-if="order.products.length > 0">
                            <div class="head p-2 text-center font-semibold border-b border-box-elevation-edge">{{ __m( 'Products', 'NsGastro' ) }}</div>
                            <div class="p-2">
                                <div class="mb-2" v-for="product of order.products" :key="product.id">
                                    <div class="flex justify-between text-primary">
                                        <span>{{ product.name }} (x{{ product.quantity }})</span>
                                        <span>{{ product.total_price | currency }}</span>
                                    </div>
                                    <ul v-if="product.modifiers.length > 0">
                                        <li class="text-secondary py-1 flex justify-between text-xs" :key="modifier.id" v-for="modifier of product.modifiers">
                                            <span>{{ modifier.name }} (x{{ modifier.quantity }})</span>
                                            <span>{{ modifier.total_price | currency }}</span>
                                        </li>
                                    </ul>
                                    <div class="ns-button hover-error flex">
                                        <button @click="reduceProduct( product, order )" class="cursor-pointer border w-full p-1 font-semibold text-center">{{ __m( 'Remove', 'NsGastro' ) }}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            v-if="!order.selected"
                            @click="selectOrderslice( order )" 
                            :class="order.selected ? '' : 'info'" 
                            class="mt-2 text-primary font-semibold p-2 elevation-surface text-center cursor-pointer">
                            <span v-if="! order.select">{{ __m( 'Select', 'NsGastro' ) }}</span>
                            <span class="opacity-0" v-if="order.select">{{ __m( 'Selected', 'NsGastro' ) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-2 flex-auto" v-if="splitResult">
            <div class="-mx-4 flex flex-wrap">
                <div class="w-full md:w-1/2 lg:w-1/3 px-4" :key="index" v-for="(result,index) of splitResult">
                    <div class="shadow elevation-surface">
                        <div class="header p-2 font-semibold border-b border-box-edge">{{ result.data.order.code }}</div>
                        <div class="p-2">
                            <ul>
                                <li class="text-sm text-secondary p-2 border-b border-box-edge flex justify-between">
                                    <span>{{ __m( 'Net', 'NsGastro' ) }}</span>
                                    <span>{{ result.data.order.net_total | currency }}</span>
                                </li>
                                <li class="text-sm text-secondary p-2 border-b border-box-edge flex justify-between">
                                    <span>{{ __m( 'Total', 'NsGastro' ) }}</span>
                                    <span>{{ result.data.order.net_total | currency }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-2 flex justify-end" v-if="splitResult === null">
            <ns-button @click="proceedSplit()" type="info">{{ __m( 'Proceed', 'NsGastro' ) }}</ns-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            ...GastroSettings,
            search: '',
            searchTimeout: null,
            searchResults: [],
            selectedOrder: null,
            validation: new FormValidation,
            orderProducts: [],
            splitResult: null,
            customers: [],
            tables:[],
            ordersPortions: [],    
            slices: 0,
            splitSlice: 0,
            orderTypes: [],
            fields: [
                {
                    type: 'number',
                    label: __m( 'Slices', 'NsGastro' ),
                    description: __m( 'In how much parts the order should be split', 'NsGastro' ),
                    validation: 'required'
                }
            ]
        }
    },
    computed: {
        sliceOrderSelected() {
            return this.ordersPortions.filter( order => order.selected ).length > 0;
        },
    },
    watch: {
        search() {
            clearTimeout( this.searchTimeout );
            this.searchTimeout  =   setTimeout( () => {
                this.searchOrderWithQuery( this.search );
            }, 500 );
        }
    },
    mounted() {
        this.popupCloser();
        this.$refs.searchField.focus();
        this.$refs.searchField.addEventListener( 'blur', () => {
            setTimeout( () => {
                this.searchResults  =   [];
            }, 300 );
        });
    },
    methods: {
        __m,
        popupCloser,
        popupResolver,

        /**
         * We want to be able to detect wether 
         * the order type is set to "dine-in" for injecting
         * tables.
         */
        detectOrderType( field, order ) {
            if ( field.name === 'type' ) {
                if ( field.value === 'dine-in' ) {
                    /**
                     * @todo we need to make sure
                     * to skip this if the tables are disabled.
                     */
                    order.fields.push({
                        label: __m( 'Table', 'NsGastro' ),
                        name: 'table_id',
                        type: 'select',
                        options: this.tables,
                        description: __m( 'Assign the order to a table.', 'NsGastro' ),
                        validation: 'required'
                    });
                } else {
                    const field     =   order.fields.filter( f => f.name == 'table_id' );
                    if ( field.length > 0 ) {
                        const index     =   order.fields.indexOf( field[0] );
                        order.fields.splice( index, 1 );
                    }
                }
            }
        },

        /**
         * Will load all the orders
         * currently available on the system
         * @return void
         */
        loadTables() {
            nsHttpClient.get( `/api/nexopos/v4/gastro/tables` )
                .subscribe( tables => {
                    this.tables     =   tables.map( table => {
                        return {
                            label: table.name,
                            value: table.id
                        }
                    });
                }, ( error ) => {
                    return nsSnackBar.error( __m( 'An unexpected error has occured while fetching the tables.', 'NsGastro' ), null, { duration: 3000 })
                        .subscribe();
                })
        },

        reduceProduct( product, order ) {
            product.quantity--;

            if ( product.quantity === 0 ) {
                const index     =   order.products.indexOf( product );
                order.products.splice( index, 1 );
            }

            let totalModifiers      =   0;

            if ( product.modifiers.length > 0 ) {
                totalModifiers      =   product.modifiers
                    .map( modifier => modifier.total_price )
                    .reduce( ( before, after ) => before + after );
            }

            product.total_price     =   product.quantity * ( product.unit_price + totalModifiers );

            this.orderProducts.forEach( _product => {
                if ( _product.id === product.id ) {
                    _product.displayed_quantity      +=   1;
                }
            });
        },
         
        addProductToSelectedSlice( product, quantity = 1 ) {
            const selectedOrderSlice        =   this.ordersPortions.filter( order => order.selected );
            const unselectedOrderSlices     =   this.ordersPortions.filter( order => ! order.selected );

            if ( selectedOrderSlice.length > 0 ) {
                const existingProduct   =   selectedOrderSlice[0]
                    .products
                    .filter( _product => _product.id === product.id );

                const mapSimilarProducts    =   unselectedOrderSlices
                    .map( order => order.products )
                    .flat()
                    .filter( _product => _product.id === product.id );

                var totalAssignedQuantity   =   0;
                
                if ( mapSimilarProducts.length > 0 ) {
                    totalAssignedQuantity   =   mapSimilarProducts
                        .map( product => product.quantity )
                        .reduce( ( before, after ) => before + after );
                }

                if ( existingProduct.length > 0 ) {
                    /**
                     * To make sure the total assigned
                     * quantity doesn't not exceed the available quantity
                     * for the selected product.
                     */
                    if ( product.quantity - ( totalAssignedQuantity + ( existingProduct[0].quantity + quantity ) ) <= -1 ) {
                        return nsSnackBar.error( __m( 'Unable to add more quantity.', 'NsGastro' ) ).subscribe();
                    }

                    existingProduct[0].quantity     +=   quantity;

                    let totalModifiers      =   0;

                    if ( existingProduct[0].modifiers.length > 0 ) {
                        totalModifiers      =   existingProduct[0].modifiers
                            .map( modifier => modifier.total_price )
                            .reduce( ( before, after ) => before + after );
                    }

                    existingProduct[0].total_price  =   ( existingProduct[0].unit_price + totalModifiers ) * existingProduct[0].quantity;

                    product.displayed_quantity      =   product.quantity - existingProduct[0].quantity - totalAssignedQuantity;

                } else {
                    /**
                     * To make sure the total assigned
                     * quantity doesn't not exceed the available quantity
                     * for the selected product.
                     */
                    if ( product.quantity - ( totalAssignedQuantity + quantity )  <= -1 ) {
                        return nsSnackBar.error( __m( 'Unable to add more quantity.', 'NsGastro' ) ).subscribe();
                    }
                    
                    const isolatedReference         =   Object.assign({}, product );
                    isolatedReference.quantity      =   quantity;

                    let totalModifiers      =   0;

                    if ( isolatedReference.modifiers.length > 0 ) {
                        totalModifiers      =   isolatedReference.modifiers
                            .map( modifier => modifier.total_price )
                            .reduce( ( before, after ) => before + after );
                    }

                    isolatedReference.total_price   =   ( isolatedReference.unit_price + totalModifiers ) * isolatedReference.quantity;
                    selectedOrderSlice[0].products.push( isolatedReference );

                    product.displayed_quantity      =   product.quantity - quantity - totalAssignedQuantity;
                }
            }
        },

        selectOrderslice( order ) {
            this.ordersPortions.forEach( order => {
                order.selected  =   false;
            });

            order.selected      =   true;
        },
        selectOrder( order ) {
            this.selectedOrder      =   order;
            this.searchResults      =   [];
            this.search             =   '';
            this.loadOrderProducts();
        },
        getOrderType( type ) {
            return this.typeLabels[ type ] || __m( 'Unknown', 'NsGastro' );
        },
        loadCustomers() {
            nsHttpClient.get( `/api/nexopos/v4/customers` )
                .subscribe( customers => {
                    console.log( customers );
                    this.customers  =   customers.map( customer => {
                        return {
                            label: customer.name,
                            value: customer.id
                        }
                    });
                })
        },
        loadOrderProducts() {
            this.loadCustomers();
            this.loadOrderType();
            this.loadTables();

            nsHttpClient.get( `/api/nexopos/v4/gastro/orders/${this.selectedOrder.id}/products` )
                .subscribe( products => {
                    this.orderProducts     =   products;
                    this.orderProducts.forEach( product => {
                        product.displayed_quantity  =   product.quantity;
                    });
                    this.$refs.sliceField.addEventListener( 'focus', () => {
                        this.$refs.sliceField.select();
                    });
                }, ( error ) => {
                    nsSnackBar.error( error.message || __m( 'An unexpected error occured.', 'NsGastro' ) )
                        .subscribe();
                })
        },
        loadOrderType() {
            nsHttpClient.get( `/api/nexopos/v4/gastro/order-types` )
                .subscribe( result => {
                    this.orderTypes     =   Object.values( result.types ).map( type => {
                        return {
                            label: type.label,
                            value: type.identifier
                        }
                    });
                });
        },

        proceedSplit() {
            if ( this.ordersPortions.length === 0 ) {
                return nsSnackBar
                    .error( __m( 'Unable to proceed if there is no portions are defined.', 'NsGastro' ) )
                    .subscribe();
            }

            const productLength    =   this.ordersPortions.map( o => o.products.length === 0 );

            if ( productLength.filter( p => p === true ).length > 0 ) {
                return nsSnackBar
                    .error( __m( 'Unable to proceed if an order slice is empty.', 'NsGastro' ) )
                    .subscribe();
            }

            if ( this.orderProducts.filter( product => product.displayed_quantity > 0 ).length > 0 ) {
                return nsSnackBar
                    .error( __m( 'Unable to proceed, as there are unassigned products', 'NsGastro' ) )
                    .subscribe();
            }

            if ( 
                this.ordersPortions.filter( order => {
                    return ! this.validation.validateFields( order.fields );
                }).length > 0
            ) {
                return nsSnackBar
                    .error( __m( 'Unable to proceed as one or more slice forms is invalid.', 'NsGastro' ) )
                    .subscribe();
            }

            Popup.show( nsConfirmPopup, {
                title: __m( 'Confirm Your Action', 'NsGastro' ),
                message: __m( 'Would you like to confirm the order split ?', 'NsGastro' ),
                onAction: ( action ) => {
                    if ( action ) {
                        this.confirmSplit();
                    }
                }
            })
        },

        confirmSplit() {
            const slices            =   this.ordersPortions.map( slicen => {
                const order        =   this.validation.extractFields( slicen.fields );
                order.products     =   slicen.products;
                return order;
            });
            
            nsHttpClient.post( `/api/nexopos/v4/gastro/orders/split`, {
                original: this.selectedOrder,
                slices
            }).subscribe( result => {
                this.splitResult    =   result.data;
            }, ( error ) => {
                nsSnackBar.error( error.message || __m( 'An unexpected error has occured while splitting the order.', 'NsGastro' ) )
                    .subscribe();
            })
        },

        generatePortions() {
            if ( parseInt( this.slices ) <= 1 || parseInt( this.slices ) > 5 ) {
                return nsSnackBar
                    .error( __m( 'Invalid slices for the order. An order can be splited in 2 slices and up to 5 slices.', 'NsGastro' ) )
                    .subscribe();
            }

            if ( this.ordersPortions.length > 0 ) {
                return Popup.show( nsConfirmPopup, {
                    title: __m( 'Confirm Your Action', 'NsGastro' ),
                    message: __m( 'Looks like you already have defined some orders parts. Would you like to delete them ?', 'NsGastro' ),
                    onAction: ( action ) => {
                        if ( action ) {
                            this.__generatePortions();
                        }
                    }
                })
            }

            return this.__generatePortions();
        },

        __generatePortions() {
            this.ordersPortions     =   new Array( parseInt( this.slices ) )
                .fill('')
                .map( order => {
                    return {
                        fields: this.validation.createFields([
                            {
                                type: 'text',
                                options: this.customers,
                                name: 'name',
                                label: __m( 'Name', 'NsGastro' ),
                                description: __m( 'A name can help you to identify the order quickly.', 'NsGastro' ),
                            }, {
                                type: 'select',
                                options: this.customers,
                                name: 'customer_id',
                                label: __m( 'Assigned Customer', 'NsGastro' ),
                                description: __m( 'Choose the customer that is assigned to the order.', 'NsGastro' ),
                                validation: 'required'
                            }, {
                                type: 'select',
                                options: this.orderTypes,
                                label: __m( 'Order Type', 'NsGastro' ),
                                name: 'type',
                                description: __m( 'Define what is the order type.', 'NsGastro' ),
                                validation: 'required'
                            }
                        ]),
                        type: null,
                        discount: 0,
                        products: [],
                        selected: false,
                    }
                })
        },

        searchOrderWithQuery( term ) {
            if ( term.length > 0 ) {
                nsHttpClient.get( `/api/nexopos/v4/gastro/orders/search?search=${term}` )
                    .subscribe( result => {
                        if ( result.length === 0 ) {
                            this.$refs.searchField.focus();
                            this.$refs.searchField.select();
                            nsSnackBar.info( __m( 'No results match your query, please try again.', 'NsGastro', 'OK', { duration: 4000 }))
                                .subscribe();
                        }
                        this.searchResults     =   result;
                    }, ( error ) => {
                        return nsSnacBar.error( __m( 'An error has occured while searching orders', 'NsGastro' ), 'OK', { duration: 4000 })
                            .subscribe();
                    })
            }
        }
    }
}
</script>