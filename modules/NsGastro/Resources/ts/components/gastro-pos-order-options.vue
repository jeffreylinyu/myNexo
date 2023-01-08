<template>
    <div class="shadow-full ns-box w-95vw h-1/2 md:w-3/4-screen lg:w-3/6-screen overflow-hidden flex flex-col">
        <div class="grid grid-cols-2">
            <div
                @click="option.onClick( order )" 
                v-for="(option, index) of options" 
                :key="index" class="border ns-numpad-key flex cursor-pointer items-center justify-center go-h-52 flex-col">
                <i :class="option.icon" class="las go-text-8xl mr-1"></i>
                <span>{{ option.label }}</span>
            </div>
        </div>
    </div>
</template>
<script>
import gastroPosOrderMoveVue from './gastro-pos-order-move.vue';
export default {
    name: 'gastro-pos-order-options',
    data() {
        return {
            options: nsHooks.applyFilters( 'ns-gastro-order-options', [
                {
                    label: __m( 'Move', 'NsGastro' ),
                    icon: 'la-expand-arrows-alt ',
                    onClick: ( order ) => this.moveOrder( order )
                }, {
                    label: __m( 'Request', 'NsGastro' ),
                    icon: 'la-mitten',
                    onClick: ( order ) => this.requestOrder( order )
                }
            ]),
            order: null
        }
    },
    mounted() {
        this.popupCloser();
        this.order      =   this.$popupParams.order;
        this.popupCloser();
    },
    methods: {
        __m,
        popupCloser,
        popupResolver,  

        closePopup() {
            this.popupResolver( false );
        },

        async requestOrder( order ) {
            if ( order.gastro_order_status !== 'ready' ) {
                return nsSnackBar.error( __m( 'Unable to request an order that is not ready.', 'NsGastro' ) ).subscribe();
            }

            Popup.show( nsConfirmPopup, { 
                title: __m( 'Confirm Request', 'NsGastro' ),
                message: __m( 'The request will be submitted to the kitchen.', 'NsGastro' ),
                onAction: ( action ) => {
                    if ( action ) {
                        nsHttpClient.get( `/api/nexopos/v4/gastro/orders/${order.id}/request` )
                            .subscribe( result => {
                                this.popupResolver( true );
                                nsSnackBar
                                    .success( result.message, __m( 'Ok', 'NsGastro' ), { duration : 3000 })
                                    .subscribe();
                            }, ( error ) => {
                                nsSnackBar
                                    .error( 
                                        error.message || __m( 'An unexpected error has occured.', 'NsGastro' ), 
                                        __m( 'Ok', 'NsGastro' ), 
                                        { duration : 3000 }
                                    )
                                    .subscribe();
                            })
                    }
                }
            })
        },

        async moveOrder( order ) {
            try {
                const result    =   await new Promise( ( resolve, reject ) => {
                    Popup.show( gastroPosOrderMoveVue, { resolve, reject, $parent : this, order });
                });

                this.popupResolver( true );
            } catch( exception ) {
                console.log( exception );
            }
        }
    }
}
</script>