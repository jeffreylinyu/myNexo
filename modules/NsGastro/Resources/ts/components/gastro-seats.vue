<template>
    <div class="shadow-lg ns-box w-95vw md:w-3/5-screen">
        <div class="border-b ns-box-header p-2 flex justify-between items-center">
            <h3>{{ __m( 'Select Seats', 'NsGastro' ) }}</h3>
            <ns-close-button @click="closePopup()"></ns-close-button>
        </div>
        <div class="p-2 border-b ns-box-body">
            <div class="bg-gray-100 text-3xl flex justify-end p-2">{{ table.selectedSeats }}</div>
        </div>
        <div class="p-2">
            <component  v-bind:is="keyboardComponent()" :value="selectedSeats" @next="saveQuantity( $event )" @changed="updateModifierQuantity( $event )"></component>
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
            this.table.selectedSeats    =   quantity;
            this.$forceUpdate();
        },
        saveQuantity( quantity ) {
            if ( parseFloat( quantity ) > 0 && parseFloat( quantity ) <= parseFloat( this.table.seats ) ) {
                this.table.selectedSeats   =   parseFloat( quantity );
                this.$popup.close();
                this.$popupParams.resolve( this.table );
            } else {
                nsSnackBar.error( 'Invalid seats provided.' ).subscribe();
            }
        }
    },
    computed: {
        selectedSeats() {
            return this.table.selectedSeats || 1;
        },
        table() {
            return this.$popupParams.table;
        }
    },
    mounted() {
    }
}
</script>