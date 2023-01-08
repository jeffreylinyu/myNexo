<template>
    <div id="kitchen-app" class="flex-auto overflow-hidden flex flex-col">
        <div class="px-4">
            <div class="page-inner-header mb-4">
                <h3 class="text-primary font-bold flex items-center justify-between">
                    <span class="text-xl md:text-3xl">{{ selectedKitchen ? selectedKitchen.name : __m( 'Unknown Kitchen', 'NsGastro' ) }}</span>
                    <div class="flex">
                        <div class="mr-2 flex items-center justify-center" v-if="ns_gastro_enable_table_sessions">
                            <div class="ns-button hover-info">
                                <button @click="openRequestedOrders()" class="cursor-pointer flex px-3 h-10 hover:border-transparent rounded-full border items-center justify-center p-2">
                                    <i class="text-3xl las la-bell"></i>
                                    <span class="flex items-center justify-center h-6 w-6 rounded-full">
                                        <span class="text-xs">{{ totalRequestedOrders }}</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div class="mr-2 flex items-center justify-center">
                            <div class="ns-button hover-error">
                                <button @click="exitKitchen()" class="flex px-3 h-10 hover:border-transparent rounded-full border items-center justify-center p-2">
                                    <i class="text-3xl las la-door-open"></i>
                                    <span class="hidden md:inline">
                                    {{ __m( 'Exit Kitchen', 'NsGastro' ) }}
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div class="mr-2 flex items-center justify-center">
                            <div class="ns-button hover-info">
                                <button @click="openOptions()" class="flex h-10 w-10 hover:border-transparent hover:shadow-lg rounded-full border items-center justify-center p-2">
                                    <i class="text-3xl las la-cog"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </h3>
                <p class="text-secondary">{{ selectedKitchen && selectedKitchen.description ? selectedKitchen.description : __m( 'No description is provided.', 'NsGastro' ) }}</p>
            </div>
        </div>
        <div v-if="orders.length === 0  " class="flex flex-auto justify-center items-center flex-col text-primary">
            <i class="go-text-9xl las la-laugh-wink"></i>
            <span>{{ __m( 'Looks like there is nothing to worry about.', 'NsGastro' ) }}</span>
        </div>
        <div class="overflow-y-auto flex-auto" v-if="orders.length > 0">
            <div 
                v-masonry="'masonry-container'" 
                transition-duration="0.3s" 
                item-selector=".item"> <!-- flex flex-wrap -->

                <div v-masonry-tile 
                    class="item w-full md:w-1/2 px-2 lg:w-1/3 xl:w-1/4" 
                    :key="order.order_id" v-for="order of orders"> 

                    <div class="w-full mb-4"
                        :id="'order-' + order.order_id" >
                        <div class="shadow rounded ns-box overflow-hidden">
                            <div class="border-b ns-box-header flex justify-between p-2 items-center">
                                <h3 class="font-bold">#{{ order.order_code }}</h3>
                                <span :info="order.created_at">{{ order.humanDate }}</span>
                            </div>
                            <div class="grid grid-cols-2 text-sm">
                                <div class="p-1">
                                    <strong>{{ __m( 'Table', 'NsGastro' ) }}</strong> : {{ order.table_name || __m( 'N/A', 'NsGastro' ) }}
                                </div>
                                <div class="p-1">
                                    <strong>{{ __m( 'Type', 'NsGastro' ) }}</strong> : {{ getOrderType( order.order_type ) }}
                                </div>
                                <div class="p-1">
                                    <strong>{{ __m( 'Name', 'NsGastro' ) }}</strong> : {{ order.order_title || __m( 'N/A', 'NsGastro' ) }}
                                </div>
                            </div>
                            <div class="body">
                                <ul class="">
                                    <template v-for="product of order.products">
                                        <li :key="product.id" 
                                            :class="getCookingStatusBg( product )"
                                            @click="selectMeal( product )"
                                            class="p-2 border-b border-box-elevation-edge flex justify cursor-pointer">
                                            <div class="flex-auto">
                                                <h4>{{ product.name }} (x{{ product.quantity }})</h4>
                                                <small class="">{{ __m( 'Unit :', 'NsGastro' ) }} {{ product.unit_name}}</small>
                                                <ul class="w-full " v-if="product.modifiers.length > 0">
                                                    <li v-for="modifier of product.modifiers" :key="modifier.id" class="p-1 text-sm border-dashed border-b"><i class="las la-arrow-right"></i> {{ modifier.name }} (x{{ modifier.quantity }})</li>
                                                </ul>
                                                <p v-if="product.cooking_note && product.cooking_note.length > 0" class="mt-2 border border-dashed p-1 text-sm">
                                                    <i class="las la-hand-point-right"></i> {{ __m( 'Note:', 'NsGastro' ) }} {{ product.cooking_note }}
                                                </p>
                                            </div>
                                            <div class="flex-shrink-0">
                                                <span v-if="product.cooking_status === 'pending'" class="text-xs rounded-full px-3 py-1 go-bg-yellow-500 text-white">{{ __m( 'Pending', 'NsGastro' ) }}</span>
                                                <span v-if="product.cooking_status === 'ongoing'" class="text-xs rounded-full px-3 py-1 go-bg-blue-500 text-white">{{ __m( 'Ongoing', 'NsGastro' ) }}</span>
                                                <span v-if="product.cooking_status === 'ready'" class="text-xs rounded-full px-3 py-1 go-bg-green-500 text-white">{{ __m( 'Ready', 'NsGastro' ) }}</span>
                                                <span v-if="product.cooking_status === 'canceled'" class="text-xs rounded-full px-3 py-1 go-bg-red-500 text-white">{{ __m( 'Canceled', 'NsGastro' ) }}</span>
                                            </div>
                                        </li>
                                    </template>
                                </ul>
                            </div>
                            <div class="flex">
                                <button @click="toggleSelect( order )" class="flex-auto w-1/2 text-gray-700 py-2 font-semibold"><i class="las la-hand-pointer"></i></button>
                                <button v-if="allAreSimilar( order.products ) && ( cookingPending( order.products ) || cookingOngoing( order.products ) )" @click="cancel( order )" class="flex-auto w-1/2 go-bg-red-500 text-white py-2 font-semibold">{{ __m( 'Cancel', 'NsGastro' ) }}</button>
                                <button v-if="allAreSimilar( order.products ) && cookingPending( order.products )" @click="cook( order )" class="flex-auto w-1/2 go-bg-green-500 text-white py-2 font-semibold">{{ __m( 'Start', 'NsGastro' ) }}</button>
                                <button v-if="allAreSimilar( order.products ) && cookingOngoing( order.products )" @click="ready( order )" class="flex-auto w-1/2 go-bg-teal-500 text-white py-2 font-semibold">{{ __m( 'Ready', 'NsGastro' ) }}</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>
<style scoped>
.meal-selected {
    box-shadow:inset 0px 0px 0px 4px #1861ff85;
    background: #6596ff85;
}
</style>
<script>
import gastroKitchenRequestedOrdersVue from './gastro-kitchen-requested-orders.vue';
import gastroKitchenSelectVue from './gastro-kitchen-select.vue';
import gastroKitchenSettingsVue from './gastro-kitchen-settings.vue';
export default {
    name: "gastro-kitchen",
    data() {
        return {
            kitchen: null,
            selectedKitchen: null,
            kitchenInterval: null,
            interval: 5000,
            totalRequestedOrders: 0,
            orders: [],
            settings: {
                range_starts: ns.date.moment.startOf( 'day' ).format(),
                range_ends: ns.date.moment.endOf( 'day' ).format(),
                enable_notification: true
            },
            dateInterval: null,
            ...GastroSettings
        }
    },
    mounted() {
        if ( this.kitchen === null ) {
            nsState.setState({
                sidebar: 'hidden'
            })

            this.selectKitchen();
        }

        if ( ns.date.timeZone === '' ) {
            return nsSnackBar.error( 
                __m( 'The timezone is not defined. Please consider configuring the timezone on the general settings', 'NsGastro' ), 
                __m( 'Ok', 'NsGastro' ), 
                { duration: 10000 }
            ).subscribe();
        }

        nsState.behaviorState.subscribe( ({ object }) => {
            setTimeout( () => this.$redrawVueMasonry('masonry-container'), 100 );
        });
    },
    methods: {
        __m,
        async openOptions() {
            try {
                const result    =   await new Promise( ( resolve, reject ) => {
                    Popup.show( gastroKitchenSettingsVue, { fields: [
                        {
                            type: 'datetimepicker',
                            name: 'range_starts',
                            label: __m( 'Start Range', 'NsGastro' ),
                            value: this.settings.range_starts,
                            description: __m( 'Define when from which moment the kitchen should start fetching orders', 'NsGastro' ),
                        }, {
                            type: 'datetimepicker',
                            name: 'range_ends',
                            label: __m( 'End Range', 'NsGastro' ),
                            value: this.settings.range_ends,
                            description: __m( 'Define till which moment the kitchen should stop fetching orders', 'NsGastro' ),
                        }, 
                    ],resolve, reject, settings: this.settings, title : __m( 'Kitchen Settings', 'NsGastro' ) })
                });

                for( let key in result ) {
                    this.settings[ key ]     =   result[ key ];
                }

            } catch( exception ) {

            }
        },
        async selectKitchen() {
            try {
                this.selectedKitchen    =   await new Promise( ( resolve, reject ) => {
                    Popup.show( gastroKitchenSelectVue, { resolve, reject });
                });

                /**
                 * immediately get orders
                 */
                this.getOrders();

                /**
                 * start interval function
                 */
                this.startKitchen();

                /**
                 * interval on placed time
                 */
                this.dateInterval   =   setInterval( () => {
                    this.orders.forEach( order => {
                        order.humanDate     =   this.getTimeSpan( order.order_updated_at );
                    })
                }, 1000 );
            } catch( exception ) {
                console.log( exception );
            }
        },

        getTimeSpan( date ) {
            return moment( date ).from( ns.date.getNowString() );
        },

        openRequestedOrders() {
            try {
                if ( this.selectedKitchen === null ) {
                    return nsSnackBar.error( __m( 'Consider opening a kitchen first', 'NsGastro' ) ).subscribe();
                }

                const response  =   new Promise( ( resolve, reject ) => {
                    Popup.show( gastroKitchenRequestedOrdersVue, { 
                        resolve, 
                        reject, 
                        kitchen : this.selectedKitchen 
                    });
                });
            } catch ( exception ) {
                console.log( exception );
            }
        },

        getOrderType( orderType ) {
            switch( orderType ) {
                case 'dine-in': return __m( 'Dine In', 'NsGastro' );
                case 'takeaway': return __m( 'Take Away', 'NsGastro' );
                case 'delivery': return __m( 'Delivery', 'NsGastro' );
                default : return __m( 'Unknown Type', 'NsGastro' );
            }
        },

        toggleSelect( order, status = undefined ) {
            order.products.forEach( product => {
                product.selected    =   status === undefined ? ( ! product.selected ) : status;
            })
        },
        
        selectMeal( product ) {
            product.selected    =   !product.selected;
        },

        cookingPending( products ) {
            const statuses  =   products
                .filter( p => p.selected )
                .map( p => p.cooking_status );

            const merged    =   [ ...new Set( statuses ) ];

            return [ 'pending' ].includes( merged[0] )
        },

        cookingFinished( products ) {
            const statuses  =   products
                .filter( p => p.selected )
                .map( p => p.cooking_status );

            const merged    =   [ ...new Set( statuses ) ];

            return [ 'ready' ].includes( merged[0] )
        },

        cookingOngoing( products ) {
            const statuses  =   products
                .filter( p => p.selected )
                .map( p => p.cooking_status );

            const merged    =   [ ...new Set( statuses ) ];

            return [ 'ongoing' ].includes( merged[0] )
        },

        allAreSimilar( products ) {
            const statuses  =   products
                .filter( p => p.selected )
                .map( p => p.cooking_status );

            const merged    =   [ ...new Set( statuses ) ];

            return merged.length === 1;
        },

        async cancel( order ) {
            try {
                const promise       =   await new Promise( ( resolve, reject ) => {
                    Popup.show( nsPromptPopup, {
                        resolve,
                        reject,
                        title: __m( 'Confirm Your Action', 'NsGastro' ),
                        message: __m( 'Would you like to cancel {items} selected items(s). Please give a reason', 'NsGastro' )
                            .replace( '{items}', order.products.filter( p => p.selected ).length ),
                        onAction: ( action ) => {
                            if ( typeof action === 'string' ) {
                                console.log( 'foo' );
                                return nsHttpClient.post( `/api/nexopos/v4/gastro/kitchens/${this.selectedKitchen.id}/cancel/${order.order_id}`, {
                                    reason: action,
                                    products: order.products
                                        .filter( p => p.selected )
                                        .map( p => p.id )
                                }).subscribe( result => {
                                    nsSnackBar.success( result.message ).subscribe();

                                    /**
                                     * to avoid delay, we'll immediately
                                     * update the status of the cooked meals
                                     */
                                    order.products
                                        .filter( product => product.selected )
                                        .forEach( product => product.cooking_status = 'canceled' );

                                    /**
                                     * let's update order before
                                     * it get refreshed with the interval loop,
                                     * but exclude products.
                                     */
                                    this.refreshOrder( order, result.data.order );

                                    /**
                                     * let's unselected all selected meals.
                                     */
                                    this.toggleSelect( order, false );

                                }, ( error ) => {
                                    return nsSnackBar.error( error.message || __m( 'An unexpected error has occured.', 'NsGastro' ) ).subscribe();
                                })
                            }
                        }
                    })
                })
            } catch( exception ) {
                console.log( exception );
            }
        },

        cook( order ) {
            const hasSelected   =   order.products.filter( product => product.selected );

            if ( hasSelected.length === 0 ) {
                return nsSnackBar.error( __m( 'Please select a meal before proceeding.', 'NsGastro' ) ).subscribe();
            }

            nsHttpClient.post( `/api/nexopos/v4/gastro/kitchens/${this.selectedKitchen.id}/cook/${order.order_id}`, {
                products : order.products.filter( p => p.selected )
                    .map( p => p.id )
            }).subscribe( result => {
                nsSnackBar.success( result.message ).subscribe();

                /**
                 * to avoid delay, we'll immediately
                 * update the status of the cooked meals
                 */
                order.products
                    .filter( product => product.selected )
                    .forEach( product => product.cooking_status = 'ongoing' );
                
                /**
                 * let's update order before
                 * it get refreshed with the interval loop,
                 * but exclude products.
                 */
                this.refreshOrder( order, result.data.order );
                
                /**
                 * let's unselected the selected meals.
                 */
                this.toggleSelect( order, false );                
            }, ( error ) => {
                nsSnackBar.error( error.message || __m( 'Unexpected error occured.', 'NsGastro' ) ).subscribe();
            })
        },

        ready( order ) {
            const hasSelected   =   order.products.filter( product => product.selected );

            if ( hasSelected.length === 0 ) {
                return nsSnackBar.error( __m( 'Please select a meal before proceeding.', 'NsGastro' ) ).subscribe();
            }

            nsHttpClient.post( `/api/nexopos/v4/gastro/kitchens/${this.selectedKitchen.id}/ready/${order.order_id}`, {
                products : order.products.filter( p => p.selected )
                    .map( p => p.id )
            }).subscribe( result => {
                nsSnackBar.success( result.message ).subscribe();

                /**
                 * to avoid delay, we'll immediately
                 * update the status of the cooked meals
                 */
                order.products
                    .filter( product => product.selected )
                    .forEach( product => product.cooking_status = 'ready' );

                /**
                 * let's update order before
                 * it get refreshed with the interval loop,
                 * but exclude products.
                 */
                this.refreshOrder( order, result.data.order );
                
                /**
                 * let's unselected the selected meals.
                 */
                this.toggleSelect( order, false );                
            }, ( error ) => {
                nsSnackBar.error( error.message || __m( 'Unexpected error occured.', 'NsGastro' ) ).subscribe();
            })
        },

        refreshOrder( oldReference, newReference ) {
            /**
             * let's update order before
             * it get refreshed with the interval loop,
             * but exclude products.
             */
            delete newReference.products;
            oldReference   =   Object.assign( oldReference, newReference );

            /**
             * We don't want the animation to be interrupted before
             * the next refresh cycle, therefore we create a reference 
             * that is not handled by Vue.js
             */
            if ( [ 'ready', 'served' ].includes( oldReference.gastro_order_status ) ) {
                const element   =   document.querySelector( '#order-' + oldReference.order_id );
                const clone     =   document
                    .querySelector( '#order-' + oldReference.order_id )
                    .cloneNode(true);
                    
                element.parentNode.replaceChild( clone, element );

                clone.classList.add( 'anim-duration-500', 'zoom-in-exit' );

                setTimeout( () => {
                    clone.remove();
                    this.$redrawVueMasonry('masonry-container');
                }, 500 );
            }
        },

        countRequestedOrders() {
            if ( this.ns_gastro_enable_table_sessions ) {
                nsHttpClient.get( `/api/nexopos/v4/gastro/kitchens/${this.selectedKitchen.id}/orders/count-requested` )
                    .subscribe( result => {
                        this.totalRequestedOrders   =   result.count;
                    })
            }
        },

        getCookingStatusBg( product ) {
            let className   =   '';
            switch( product.cooking_status ) {
                case 'pending':
                    className   =   'item-yellow';
                break;
                case 'ongoing':
                    className   =   'item-blue';
                break;
                case 'ready':
                    className   =   'item-green';
                break;
                case 'canceled':
                    className   =   'item-red';
                break;
            }

            if ( product.selected ) {
                return 'meal-selected';
            }

            return className;
        },

        startKitchen() {
            if ( this.selectedKitchen !== null && ! ns.websocket.enabled ) {
                this.kitchenInterval    =   setInterval( () => {
                    this.getOrders();
                    this.countRequestedOrders();
                }, this.interval );
            } else if ( Echo !== undefined ) {
                Echo.private( 'ns.private-channel' )
                    .listen( 'App\\Events\\OrderAfterCreatedEvent', ( e ) => {
                        this.getOrders();
                        this.countRequestedOrders();
                    })
                    .listen( 'App\\Events\\OrderAfterUpdatedEvent', ( e ) => {
                        this.getOrders();
                        this.countRequestedOrders();
                    });
            }
        },

        exitKitchen() {
            Popup.show( nsConfirmPopup, {
                title: __m( 'Exit the kitchen ?', 'NsGastro' ),
                message: __m( 'You\'ll no longer be able to manage the meals.', 'NsGastro' ),
                onAction: ( action ) => {
                    if ( action ) {
                        clearInterval( this.kitchenInterval );
                        this.orders             =   [];
                        this.selectedKitchen    =   null;
                        this.selectKitchen();
                        clearInterval( this.dateInterval );
                    }
                }
            })
        },

        playKitchenSound( kitchen ) {
            if ( kitchen.notification_status === 'enabled' ) {
                const audio     =   new Audio( kitchen.notification_sound );
                audio.play();
            }
        },

        getOrders() {
            nsHttpClient.post( `/api/nexopos/v4/gastro/kitchens/${this.selectedKitchen.id}/orders`, {
                    'cooking_status' : [ 'pending', 'ongoing', 'canceled' ],
                    range_starts : this.settings.range_starts,
                    range_ends : this.settings.range_ends
                })
                .subscribe( orders => {

                    /**
                     * let's omit all orders that lacks products
                     */
                    orders      =   orders.filter( order => order.products.length > 0 );

                    /**
                     * If the orders are completely empty
                     * we'll save all order by default
                     */
                    if ( this.orders.length === 0 ) {
                        orders.forEach( order => {
                            order.humanDate   =   this.getTimeSpan( order.order_updated_at );
                            order.products.forEach( product => {
                                product.selected    =   false;
                                product.refreshed   =   0;
                            });
                        });

                        this.orders     =   orders;

                        setTimeout( () => this.$redrawVueMasonry('masonry-container'), 100 );
                    } else {
                        /**
                         * let's erase orders
                         * that no longer exist
                         * on the actual index
                         */
                        this.orders
                            .filter( order => {
                                return ! orders.map( order => order.order_id )
                                    .includes( order.order_id ) 
                            })
                            .forEach( _order => {
                                const index     =   this.orders.indexOf( _order );
                                this.orders.splice( index, 1 );
                            })

                        /**
                         * Let's first retrieve orders that aren't
                         * yet added to the actual screen.
                         */
                        const existing      =   this.orders.map( order => order.order_id );
                        const tracked       =   orders.filter( _order => existing.includes( _order.order_id ) );

                        this.orders.forEach( order => {

                            const trackedOrder      =   tracked.filter( _o => _o.order_id === order.order_id );

                            if ( trackedOrder.length === 1 ) {
                                const products      =   JSON.parse( JSON.stringify( order.products ) );

                                /**
                                 * let's first erase all the products
                                 * that no longer exist on the actual order
                                 */
                                order.products
                                    .filter( product => {
                                        return ! trackedOrder[0]
                                            .products
                                            .map( product => product.id )
                                            .includes( product.id )
                                    })
                                    .forEach( product => {
                                        const index     =   order.products.indexOf( product );
                                        order.products.splice( index, 1 );
                                    });

                                /**
                                 * let's update orders without
                                 * touching the selected attribute
                                 */
                                const existing      =   products.map( p => p.id );
                                const tracked       =   trackedOrder[0].products.filter( p => existing.includes( p.id ) );

                                order.products      =   order.products.map( product => {
                                    const selectedStatus        =   product.selected;
                                    const refreshed             =   product.refreshed;
                                    
                                    /**
                                     * assuming the product already exists
                                     * we'll reset all the value for that specific product
                                     */
                                    product                     =   tracked.filter( p => p.id === product.id )[0];
                                    product.selected            =   selectedStatus;
                                    product.refreshed           =   refreshed + 1;

                                    return product;
                                });

                                /**
                                 * this is new product that has'nt been
                                 * tracked. We'll push them at the beginning.
                                 */
                                const untracked     =   trackedOrder[0].products
                                    .filter( p => ! existing.includes( p.id ) )
                                    .map( product => {
                                        product.selected    =   false;
                                        return product;
                                    });
                                    
                                order.products.unshift( ...untracked );

                                /**
                                 * if there are untracked product
                                 * we should notifify
                                 */
                                if ( untracked.length > 0 ) {
                                    this.playKitchenSound( this.selectedKitchen );
                                }

                                /**
                                 * Delete products reference as it's already 
                                 * updated on the above snippet. However, 
                                 * we'll update all other order attributes.
                                 */
                                delete trackedOrder[0].products;
                                order   =   Object.assign( order, trackedOrder[0] );
                            }
                        });

                        /**
                         * for all untracked orders
                         * let's just add them to the index
                         */
                        const untracked     =   orders.filter( _order => ! existing.includes( _order.order_id ) );

                        if ( untracked.length > 0 ) {

                            /**
                             * we're doing this to provide
                             * a default selected and refreshed status to the products.
                             */
                            untracked.forEach( order => {
                                order.products.forEach( product => {
                                    product.selected    =   false;
                                    product.refreshed   =   0;
                                });

                                order.humanDate   =   this.getTimeSpan( order.order_updated_at );
                            })

                            this.orders.unshift( ...untracked );

                            /**
                             * Notify new meals
                             */
                            if ( untracked.length > 0 ) {
                                this.playKitchenSound( this.selectedKitchen );
                            }
                        }

                        setTimeout( () => this.$redrawVueMasonry('masonry-container'), 100 );
                    }
                })
        }
    }
}
</script>