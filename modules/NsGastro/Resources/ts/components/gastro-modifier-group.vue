<template>
    <div class="shadow-lg ns-box h-95vh md:h-4/5-screen w-95vw md:w-3/5-screen flex flex-col">
        <div class="p-2 border-b ns-box-header flex justify-between items-center">
            <h3>{{ __m( 'Modifier', 'NsGastro' ) }}</h3>
            <ns-close-button @click="close()"></ns-close-button>
        </div>
        <div class="h-84 flex items-center justify-center" v-if="modifierGroup === null">
            <ns-spinner></ns-spinner>
        </div>
        <div class="overflow-hidden flex-auto flex flex-col" v-if="modifierGroup !== null">
            <div class="m-2 p-2 ns-notice success text-center">
                <p>{{ modifierGroup.description || 'No description provided.' }}</p>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 overflow-hidden cursor-pointer overflow-y-auto">
                <div @click="select( modifier )" :class="modifier.selected ? 'info' : ''" class="border h-44 md:h-56 ns-numpad-key" :key="modifier.id" v-for="modifier of modifierGroup.modifiers">
                    <div class="relative h-full w-full flex items-center justify-center overflow-hidden">
                        <div v-if="modifier.quantity > 0" class="flex items-center justify-center text-white absolute right-4 top-4 rounded-full h-8 w-8 bg-info-secondary font-bold">{{ modifier.quantity }}</div>
                        <img v-if="modifier.galleries[0]" :src="modifier.galleries[0].url" class="object-cover h-full" :alt="modifier.name">
                        <i class="las la-image text-secondary text-6xl" v-if="! modifier.galleries[0]"></i>
                    </div>
                    <div class="h-0 w-full">
                        <div class="relative w-full flex items-center justify-center -top-10 h-20 py-2 flex-col modifier-item">
                            <h3 class="font-bold text-primary py-2 text-center">{{ modifier.name }}</h3>
                            <span class="text-xs font-bold text-secondary py-1 text-center">{{ modifier.unit_quantities[0].sale_price | currency }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="border-t ns-box-footer border-gray p-2 flex justify-between items-center">
                <div></div>
                <div>
                    <ns-button @click="nextStep()" type="info">{{ __m( 'Continue', 'NsGastro' ) }}</ns-button>
                </div>
            </div>
        </div>        
    </div>
</template>
<script>
import gastroKeyboardVue from './gastro-keyboard.vue';
export default {
    name: 'gastro-modifier-group',
    mounted() {
        this.loadModifierGroup();
    },
    data() {
        return {
            modifierGroup: null,
        }
    },
    methods: {
        __m,
        select( modifier ) {
            if ( ! this.modifierGroup.multiselect ) {
                const index     =   this.modifierGroup.modifiers.indexOf( modifier );
                
                this.modifierGroup.modifiers.forEach( ( _modifier, _index ) => {
                    if ( _index !== index ) {
                        _modifier.selected  =   false;
                        _modifier.quantity  =   0;
                    }
                });
            }

            modifier.selected   =   !modifier.selected;

            if ( this.modifierGroup.countable ) {
                if ( modifier.selected ) {
                    new Promise( async ( resolve, reject) => {
                        try {
                            modifier    =   await Popup.show( gastroKeyboardVue, { resolve, reject, modifier, product: this.$popupParams.product })
                        } catch( exception ) {
                            console.log( exception );
                            modifier.selected   =   false;
                        }
                    });
                } else {
                    modifier.quantity   =   0;
                }
            } else {
                if ( modifier.selected ) {
                    modifier.quantity   =   1;
                } else {
                    modifier.quantity   =   0;
                }
            }
        },
        loadModifierGroup() {
            nsHttpClient.get( `/api/nexopos/v4/gastro/modifiers-groups/${this.$popupParams.modifierGroupId}` )
                .subscribe( result => {
                    result.modifiers            =   result.modifiers.map( modifier => {
                        modifier.modifier_id    =   modifier.id;
                        
                        /**
                         * we delete the id reference as it should point to the entries
                         * stored within the "nexopos_orders_products_modifiers".
                         */
                        delete modifier.id;

                        let reference           =   [];
                        if ( this.$popupParams.product.modifiersGroups ) {
                            /**
                             * attempt to find if the group is already attached
                             * to the product so we can pull that.
                             */
                            const group     =   this.$popupParams
                                .product
                                .modifiersGroups
                                .filter( _group => _group.modifier_group_id === this.$popupParams.modifierGroupId );

                            /**
                             * We'll check fi the group length
                             */
                            if ( group.length > 0 ) {
                                reference   =   group[0].modifiers.filter( m => {
                                    return m.modifier_id === modifier.modifier_id;
                                })
                            }
                        }

                        modifier.selected   =   reference.length === 0 ? false : reference[0].selected;
                        modifier.quantity   =   reference.length === 0 ? 0 : reference[0].quantity;

                        return modifier;
                    });

                    this.modifierGroup  =   result;
                }, ( error ) => {
                    nsSnackBar.error( error.message || 'An unexpected error has occured.' )
                        .subscribe();
                })
        },
        nextStep() {
            const group         =   this.modifierGroup;

            /**
             * if the modifier is required
             * you need to select one before proceeding.
             */
            if ( this.modifierGroup.modifiers.filter( m => m.selected ).length === 0 && parseInt( group.forced ) === 1 ) {
                return nsSnackBar.error( 'You must select a modifier before proceeding.' ).subscribe();
            }

            /**
             * We need to specify quantity
             * for the provided modifier
             */
            if ( this.modifierGroup.modifiers.filter( m => m.selected ).length > 0 && parseInt( group.countable ) === 1 && parseInt( group.forced ) === 1 ) {
                const total     =   this.modifierGroup.modifiers.map( m => m.quantity )
                    .reduce( ( before, after ) => before + after );
                
                if ( total <= 0 ) {
                    return nsSnackBar.error( 'The current modifier group is require modifier with valid quantities.' ).subscribe();
                }
            }

            /**
             * make sure to only return
             * the modifiers that are selected.
             */
            group.modifier_group_id     =   group.id;
            group.modifiers             =   group.modifiers.filter( m => m.selected );
            group.modifiers.forEach( modifier => {
                modifier.unit_price         =   modifier.unit_quantities[0].sale_price;
                modifier.unit_quantity_id   =   modifier.unit_quantities[0].id;
                modifier.unit_id            =   modifier.unit_quantities[0].unit_id;
                modifier.total_price        =   modifier.unit_quantities[0].sale_price * modifier.quantity;
            });

            delete group.id;
            
            this.$popupParams.resolve( group );
            this.$popup.close();
        },
        close() {
            this.$popupParams.reject( false );
            this.$popup.close();
        }
    }
}
</script>
<style scoped>
.light .modifier-item {
    background:rgb(255 255 255 / 73%);
}
.dark .modifier-item {
    background:rgb(0 0 0 / 73%);
}
</style>