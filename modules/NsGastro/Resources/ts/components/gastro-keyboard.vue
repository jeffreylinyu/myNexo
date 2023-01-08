<template>
    <div class="shadow-lg ns-box w-95vw md:w-3/5-screen">
        <div class="border-b ns-box-header p-2 flex justify-between">
            <h3>{{ __m( 'Define Quantity', 'NsGastro' ) }}</h3>
            <ns-close-button @click="closePopup()"></ns-close-button>
        </div>
        <div class="p-2 border-b ns-box-body">
            <div class="text-3xl flex justify-end p-2">{{ modifier.quantity }}</div>
        </div>
        <div class="p-2">
            <component  v-bind:is="keyboardComponent()" :value="modifier.quantity" @next="saveQuantity( $event )" @changed="updateModifierQuantity( $event )"></component>
        </div>
    </div>
</template>
<script>
export default {
    name: 'gastro-keyboard',
    data() {
        return {
            keyboardComponent: () => nsComponents.nsNumpad,
        }
    },
    methods: {
        __m,
        closePopup() {
            this.$popupParams.reject( false );
            this.$popup.close();
        },
        updateModifierQuantity( quantity ) {
            this.modifier.quantity  =   quantity;
            this.$forceUpdate();
        },
        saveQuantity( quantity ) {
            if ( parseFloat( quantity ) > 0 ) {
                this.modifier.quantity  =   parseFloat( this.modifier.quantity );
                this.$popup.close();
                this.$popupParams.resolve( this.modifier );
            } else {
                nsSnackBar.error( __m( 'Invalid quantity provided.', 'NsGastro' ) ).subscribe();
            }
        }
    },
    computed: {
        modifier() {
            return this.$popupParams.modifier;
        }
    },
    mounted() {
    }
}
</script>