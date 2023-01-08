import { ModifierPromise } from "./classes/ModifierPromise";
import { SendToKitchenQueue } from "./classes/SendToKitchenQueue";


const gastroPosMeal             =   require( './components/gastro-pos-meal' ).default;
const gastroTable               =   require( './components/gastro-table' ).default;
const gastroTableButton         =   require( './components/gastro-table-button' ).default;
const gastroOrdersButton        =   require( './components/gastro-pos-orders-button' ).default;
const gastroPosTables           =   require( './components/gastro-pos-tables' ).default;
const gastroAddButtons          =   require( './components/gastro-add-buttons' ).default;
const gastroSplitOrderButton    =   require( './components/gastro-split-orders-button' ).default;
const gastroMergeOrderButton    =   require( './components/gastro-merge-orders-button' ).default;
const gastroToKitchenButton     =   require( './components/gastro-to-kitchen-button' ).default;
const gastroPosOrderOptions     =   require( './components/gastro-pos-order-options' ).default;

declare const Popup;
declare const POS;
declare const nsEvent;
declare const Vue;
declare const nsSnackBar;
declare const nsHooks;
declare const GastroSettings;
declare const nsConfirmPopup;
declare const RxJS;
declare const __;
declare const __m;
declare const nsHttpClient;

class Gastro {
    addButtonsVisible   =   new RxJS.ReplaySubject();
    tableOpenedSubject         =   new RxJS.ReplaySubject();
    private addButtonsVisibility;
    tableOpenedStatus   =   false;
    currentScreen : 'both' | 'cart' | 'grid';

    selectedOrder   =   new RxJS.BehaviorSubject();

    getType() {
        return {
            'identifier'    :   'dine-in',
            'label'         :   `Dine in ${(() => {
                const order     =   POS.order.getValue();

                if ( order.table ) {
                    // return order.table.name + `${ order.table.selectedSeats > 0 ? ` (${order.table.selectedSeats})` : '' }`;
                }
    
                return '';
            })()}`,
            'icon'          :   GastroSettings.icons.chair,
            'selected'      :   false
        }
    };

    constructor() {
        nsHooks.addAction( 'ns-pos-header', 'gastro-add-table-button', ( header ) => this.addHeaderButton( header ) );
        nsHooks.addAction( 'ns-after-product-computed', 'gastro-update-product', ( product ) => this.computeProduct( product ) );
        nsHooks.addAction( 'ns-cart-after-refreshed', 'gastro-build-modifier', ( order ) => setTimeout( () => this.buildModifierVue( order ), 100 ) );
        
        nsHooks.addAction( 'ns-order-submit-successful', 'gastro-submit-order', ( result ) => {
            // should only print
            // the local print option is enabled
            if ( GastroSettings.ns_gastro_kitchen_print_gateway === 'local_print' ) {
                this.printOrderToKichen( result.data.order.id );
            }
        });

        nsHooks.addAction( 'ns-before-load-order', 'gastro-catch-order', ( order ) => this.retrictOrderEdition() );

        nsHooks.addFilter( 'ns-pending-orders-right-column', 'gastro-right-column', ( lines ) => {
            lines.push({
                label: __m( 'Table Name', 'Gastro' ),
                value: ( order ) => order.table_name || __m( 'N/A', 'Gastro' )
            });

            return lines;
        });

        this.tableOpenedSubject.subscribe( status => this.tableOpenedStatus = status );
    }

    retrictOrderEdition() {
        if ( ! GastroSettings.permissions.gastroEditOrder && ! this.tableOpenedStatus ) {
            nsSnackBar.error( __( 'You\'re not allowed to edit orders.' ) ).subscribe();
            throw 'Not allowed';
        }
    }

    printOrderToKichen( order_id, products_id = [] ) {
        nsHttpClient.post( `/api/nexopos/v4/gastro/orders/${order_id}/kitchen-receipts`, { products_id })
            .subscribe( receipts => {
                receipts.forEach( receipt => {
                    const content   =   receipt.template;
                    const address   =   receipt.nps_address;

                    receipt.printers.forEach( printer => {                        
                        const oReq = new XMLHttpRequest();

                        oReq.addEventListener( "load", ( e ) => {
                            nsSnackBar.success( 'The print job has been submitted.' )
                                .subscribe();
                        });

                        oReq.addEventListener( 'error', () => {
                            return nsSnackBar.error( __( 'An unexpected error has occured while printing.' ) ).subscribe();
                        });

                        oReq.open( "POST",  `${address}api/print` );
                        oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                        oReq.send(JSON.stringify({ printer, content }));
                    });
                });
            }, ( error ) => {
                nsSnackBar.error( __m( `An error has occured while fetching the order receipts for the kitchen printing.`, 'NsGastro' ) ).subscribe();
            });
    }

    printOrderCanceledMealKitchen( order_id, products_id = [] ) {
        if ( ! GastroSettings.ns_gastro_allow_cancelation_print || GastroSettings.ns_gastro_kitchen_print_gateway !== 'local_print' ) {
            return false;
        }
        
        nsHttpClient.post( `/api/nexopos/v4/gastro/orders/${order_id}/kitchen-canceled-receipts` )
            .subscribe( receipts => {
                receipts.forEach( receipt => {
                    const content   =   receipt.template;
                    const address   =   receipt.nps_address;

                    receipt.printers.forEach( printer => {                        
                        const oReq = new XMLHttpRequest();

                        oReq.addEventListener( "load", ( e ) => {
                            nsSnackBar.success( 'The print job has been submitted.' )
                                .subscribe();
                        });

                        oReq.addEventListener( 'error', () => {
                            return nsSnackBar.error( __( 'An unexpected error has occured while printing.' ) ).subscribe();
                        });

                        oReq.open( "POST",  `${address}api/print` );
                        oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                        oReq.send(JSON.stringify({ printer, content }));
                    });
                });
            }, ( error ) => {
                nsSnackBar.error( __m( `An error has occured while fetching the order receipts for the kitchen printing.`, 'NsGastro' ) ).subscribe();
            });
    }

    setAddButtonsVisibility( status : 'visible' | 'hidden' ) {
        if ( status === 'visible' ) {
            this.addButtonsVisible.next( true );
        } else {
            this.addButtonsVisible.next( false );
        }
    }

    boot() {
        this.bindPromise();
        this.registerCustomOrderType();
        this.injectSendToKitchenPopup();

        POS.visibleSection.subscribe( value => {
            this.currentScreen  =   value;
            if ( [ 'both', 'cart' ].includes( value ) ) {
                setTimeout( () => {
                    this.injectAddToOrderButtons();
                    this.toggleAddButtonsVisibility();
                }, 20 );
            }
        });

        this.subscribeToAddButtonVisibility();
    }

    replaceHoldButton() {
        if ( document.querySelector( '#to-kitchen-button' ) === null ) {
            const newButton         =   document.createElement( 'gastro-to-kitchen-button' );
            const holdButton        =   document.querySelector( '#hold-button' );
            holdButton.classList.add( 'hidden' );
            holdButton.parentNode.insertBefore( newButton, holdButton.nextElementSibling );
    
            /**
             * render the vue button component
             */
            const componentClass    =   Vue.extend( gastroToKitchenButton );
            const instance          =   new componentClass();
            instance.$mount( 'gastro-to-kitchen-button' );
        } 
    }

    /**
     * we'll toggle visibility if the cart is either
     * displaying both section or is displaying the cart.
     */
    subscribeToAddButtonVisibility() {
        this.addButtonsVisible.subscribe( value => {
            this.addButtonsVisibility   =   value;
            if ( [ 'both', 'cart' ].includes( this.currentScreen ) ) {
                this.toggleAddButtonsVisibility();
            }
        });
    }

    toggleAddButtonsVisibility() {
        if ( [ 'both', 'cart' ].includes( this.currentScreen ) ) {
            if ( this.addButtonsVisibility ) {
                (<HTMLDivElement>document.querySelector( '#cart-bottom-buttons' )) !== null && (<HTMLDivElement>document.querySelector( '#cart-bottom-buttons' )).classList.remove( 'flex' );
                (<HTMLDivElement>document.querySelector( '#cart-bottom-buttons' )) !== null && (<HTMLDivElement>document.querySelector( '#cart-bottom-buttons' )).classList.add( 'hidden' );
                (<HTMLDivElement>document.querySelector( '#gastro-add-buttons' )) !== null && (<HTMLDivElement>document.querySelector( '#gastro-add-buttons' )).classList.remove( 'hidden' );
                (<HTMLDivElement>document.querySelector( '#gastro-add-buttons' )) !== null && (<HTMLDivElement>document.querySelector( '#gastro-add-buttons' )).classList.add( 'flex' );
            } else {
                (<HTMLDivElement>document.querySelector( '#cart-bottom-buttons' )) !== null && (<HTMLDivElement>document.querySelector( '#cart-bottom-buttons' )).classList.remove( 'hidden' );
                (<HTMLDivElement>document.querySelector( '#cart-bottom-buttons' )) !== null && (<HTMLDivElement>document.querySelector( '#cart-bottom-buttons' )).classList.add( 'flex' );
                (<HTMLDivElement>document.querySelector( '#gastro-add-buttons' )) !== null && (<HTMLDivElement>document.querySelector( '#gastro-add-buttons' )).classList.remove( 'flex' );
                (<HTMLDivElement>document.querySelector( '#gastro-add-buttons' )) !== null && (<HTMLDivElement>document.querySelector( '#gastro-add-buttons' )).classList.add( 'hidden' );
            }

            this.replaceHoldButton();
        }
    }

    injectAddToOrderButtons() {
        if ( document.querySelector( '#gastro-add-buttons' ) !== null ) {
            return false;
        }

        if( document.querySelector( '.cart-table' ) ) {
            document.querySelector( '.cart-table' )
                .insertAdjacentHTML( 'beforeend', '<gastro-add-buttons></gastro-add-buttons>' );
    
            const componentClass        =   Vue.extend( gastroAddButtons );
            const instance              =   new componentClass();
    
            /**
             * Let's intanciate the component
             * and mount it
             */
            instance.template          =   gastroAddButtons?.options?.template || undefined;
            instance.render            =   gastroAddButtons.render || undefined;
            instance.methods           =   gastroAddButtons?.options?.methods || gastroAddButtons?.methods;
            instance.data              =   gastroAddButtons?.options?.data || gastroAddButtons?.data;
            instance.$mount( `gastro-add-buttons` );
        }
    }

    bindPromise() {
        POS.addToCartQueue[ 'ModifierPromise' ]   =   ModifierPromise;
    }

    /**
     * Add a custom table management
     * button to the header buttons.
     * @param header Object
     */
    addHeaderButton( header ) {
        header.buttons[ 'GastroTableButton' ]       =   gastroTableButton;
        header.buttons[ 'GastroOrdersButton' ]      =   gastroOrdersButton;
        header.buttons[ 'GastroSplitOrderButton' ]  =   gastroSplitOrderButton;
        header.buttons[ 'GastroMergeOrderButton' ]  =   gastroMergeOrderButton;

        return header;
    }

    registerCustomOrderType() {
        const types     =   POS.types.getValue();

        // types.push( this.getType() );

        POS.orderTypeQueue.push({
            identifier: 'gastro.table',
            promise: async ( selectedType ) => {
                return await new Promise( ( resolve, reject ) => {
                    if ( selectedType.identifier === 'dine-in' && GastroSettings.ns_gastro_tables_enabled ) {
                        Popup.show( gastroTable, { resolve, reject });
                    } else {
                        resolve( true );
                    }
                })
            }
        })
    }

    computeProduct( product ) {
        if ( product.modifiersGroups !== undefined && product.modifiersGroups.length > 0 ) {
            /**
             * this will compute the total of each modifier
             * and additionnate with the actual product total.
             */
            let additionalPrice     =   0;

            if ( product.modifiersGroups.length > 0 ) {
                product.modifiersGroups.forEach( group => {
                    group.modifiers.forEach( modifier => {
                        additionalPrice     +=  modifier.total_price;
                    });
                })
            }

            product.modifiers_total         =   additionalPrice * product.quantity;
            product.modifiers_net_total     =   additionalPrice * product.quantity;
            product.modifiers_gross_total   =   additionalPrice * product.quantity;
            product.total_price             =   ( ( product.unit_price + additionalPrice ) * product.quantity );
            product.total_price_with_tax    =   ( ( product.unit_price + additionalPrice ) * product.quantity );
            product.total_price_without_tax =   ( ( product.unit_price + additionalPrice ) * product.quantity );
        }
    }

    buildModifierVue( order ) {
        order.products.forEach( ( product, index ) => {
            const productLineDom        =   document.querySelector( `[product-index="${index}"]` );

            /**
             * in case the cart is not visible
             * we should't proceed.
             */
            if ( productLineDom === null ) {
                return false;
            }

            /**
             * if the modifier group has been
             * previously added, we'll remove that
             */
            if ( productLineDom.querySelector( '.modifier-container' ) !== null ) {
                productLineDom.querySelector( '.modifier-container' ).remove();
            }

            this.injectModifiersGroups( product, index );
            this.injectCutleryOptions( product, index );
        });
    }

    /**
     * replaces the "Hold" button into a "To Kitchen" button.
     * Gives the choice to hold the button once pressed.
     */
    injectSendToKitchenPopup() {
        nsHooks.addFilter( 'ns-hold-queue', 'gastro-inject-send-to-kitchen', ( queues ) => {
            queues.push( SendToKitchenQueue );
            return queues;
        });
    }

    injectModifiersGroups( product, index ) {
        if ( product.modifiersGroups && product.modifiersGroups.length > 0 ) {
            const productLineDom        =   document.querySelector( `[product-index="${index}"]` );

            /**
             * Let's create a new wrapper and
             * append it to the product details container.
             */
            const modifierContainer     =   document.createElement( 'div' );
            modifierContainer.className =   'modifier-container mt-2 text-sm cursor-pointer';
            modifierContainer.setAttribute( 'product-reference', index );   
            productLineDom.querySelector( 'div' ).appendChild( modifierContainer );

            /**
             * Let's loop modifiers
             * and make sure to add them to modifier container.
             */
            product.modifiersGroups.forEach( (group: any) => {
                group.modifiers.forEach( modifier => {
                    const modifierTemplate  =   document.createElement( 'template' );
                    const html              =   `
                    <div class="single-modifier p-1 flex justify-between">
                        <span>${group.name} : ${modifier.name} (x${modifier.quantity})</span>
                        <div class="flex">
                            <span>${Vue.filter( 'currency' )( modifier.total_price )}</span>
                            <ns-close-button></ns-close-button>
                        </div>
                    </div>
                    `
                    modifierTemplate.innerHTML  =   html.trim();
                    productLineDom.querySelector( '.modifier-container' ).appendChild( modifierTemplate.content.firstChild )
                })
            });

            modifierContainer.addEventListener( 'click', async function() {
                const productIndex  =   this.getAttribute( 'product-reference' );
                let product         =   POS.order.getValue().products[ productIndex ];
                
                try {
                    const modifierPromise       =   new ModifierPromise( product );
                    const response              =   <any>( await (  modifierPromise.run( product ) ) );
                    const data                  =   { ...product, ...response };

                    POS.updateProduct( product, data, productIndex );

                } catch( exception ) {
                    console.log( exception );
                }
            });
        }
    }

    injectCutleryOptions( product, index ) {
        const productLineDom        =   document.querySelector( `[product-index="${index}"]` );

        if ( productLineDom.querySelectorAll( '.cutlery-options' ).length === 0 ) {
            const modifierTemplate      =   document.createElement( 'template' );
            const html                  =   `
                <div class="px-1 cutlery-options">
                    <a class="hover:text-blue-600 cursor-pointer outline-none border-dashed py-1 border-b  text-sm border-blue-400">
                        <i class="las la-utensils text-xl"></i>
                    </a>
                </div>
            `
            modifierTemplate.innerHTML  =   html.trim();
            productLineDom.querySelector( '.product-options' ).appendChild( modifierTemplate.content.firstChild );

            /**
             * add an events listener to cutlery icon
             * to display meals options.
             */
            productLineDom.querySelector( '.cutlery-options a' ).addEventListener( 'click', async () => {
                try {
                    const response  =   await new Promise( ( resolve, reject ) => {
                        Popup.show( gastroPosMeal, { resolve, reject, product })
                    });
                } catch( exception ) {
                    console.log( exception );
                }
            });
        }
    }
}

/**
 * when the DOM is ready
 * to be loaded.
 */
window[ 'Gastro' ]   =   new Gastro;
document.addEventListener( 'DOMContentLoaded', () => {
    window[ 'Gastro' ].boot();
});