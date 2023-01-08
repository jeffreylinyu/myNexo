<template>
    <div class="bg-lg w-95vw max-h md:w-3/5-screen lg:w-2/5-screen ns-box">
        <div id="header" class="p-2 border-b ns-box-header flex justify-between">
            <h3 class="font-semibold">{{ __m( 'Kitchens', 'NsGastro' ) }}</h3>
            <div>
                <ns-close-button @click="closePopup()"></ns-close-button>
            </div>
        </div>
        <div class="h-44 flex Items-center justify-center" v-if="! loaded">
            <ns-spinner></ns-spinner>
        </div>
        <div  v-if="loaded && kitchens.length === 0" class="flex-auto flex flex-col items-center justify-center h-72">
            <i class="las la-frown text-6xl"></i>
            <h3 class="text-sm">{{ __m( 'Looks like there is no kitchens.', 'NsGastro' ) }}</h3>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3" v-if="loaded && kitchens.length > 0">
            <div @click="selectKitchen( kitchen )" v-for="kitchen of kitchens" :key="kitchen.id" class="border ns-numpad-key flex items-center justify-center flex-col p-3 cursor-pointer h-48">
                <h3 class="font-semibold text-primary">{{ kitchen.name }}</h3>
                <p class="text-sm text-secondary px-4 text-center">{{ kitchen.description || __m( 'No description provided', 'NsGastro' ) }}</p>
            </div>
        </div>
    </div>
</template>
<script>
const __    =   window.__;
export default {
    name: "gastro-kitchen-select",
    data() {
        return {
            kitchens: [],
            loaded: false,
        }
    },
    computed: {
        selectedKitchen() {
            const selected  =   this.kitchens.filter( kitchen => kitchen.selected );
            
            if ( selected.length > 0 ) {
                return selected[0];
            }

            return false;
        }
    },
    mounted() {
        this.loadKitchens();
    },
    methods: {
        __m,
        closePopup() {
            this.$popupParams.reject( false );
            this.$popup.close();
        },
        selectKitchen( kitchen ) {
            const indexOf   =   this.kitchens.indexOf( kitchen );

            this.kitchens.forEach( ( kitchen, index ) => {
                if ( index !== indexOf ) {
                    kitchen.selected    =   false;
                } else {
                    kitchen.selected    =   true;
                }
            });

            console.log( this.selectedKitchen );
            this.$popupParams.resolve( this.selectedKitchen );
            this.$popup.close();
        },
        loadKitchens() {
            this.loaded     =   false;
            nsHttpClient.get( `/api/nexopos/v4/gastro/available-kitchens` )
                .subscribe( result => {
                    this.kitchens   =   result.map( kitchen => {
                        kitchen.selected            =   false;
                        kitchen.range_starts        =   ns.date.moment.startOf( 'day' );
                        kitchen.range_ends          =   ns.date.moment.endOf( 'day' );
                        kitchen.refresh_interval    =   '5000';
                        return kitchen;
                    });
                    this.loaded     =   true;
                }, ( error ) => {
                    nsSnackBar.error( error.message || __m( 'Unexpected error occured', 'NsGastro' ) )
                        .subscribe();
                })
        }
    }
}
</script>