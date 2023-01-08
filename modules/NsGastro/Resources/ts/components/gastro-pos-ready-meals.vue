<template>
    <div class="w-95vw h-95vh ns-box flex flex-col shadow-xl md:w-3/5-screen md:h-4/5-screen overflow-hidden">
        <div class="border-b ns-box-body p-2 flex justify-between items-center">
            <h3 class="font-semibold">{{ __m( 'Ready Meals', 'NsGastro' ) }}</h3>
            <div>
                <ns-close-button @click="popupResolver( false )"></ns-close-button>
            </div>
        </div>
        <div v-if="loaded && response.data.length === 0  " class="flex flex-auto justify-center items-center flex-col text-primary">
            <i class="go-text-9xl las la-laugh-wink"></i>
            <span>{{ __m( 'Looks like there is nothing to worry about.', 'NsGastro' ) }}</span>
        </div>
        <div class="overflow-y-auto flex-auto" v-if="loaded && response.data.length > 0">
            <table class="w-full ns-table">
                <thead>
                    <tr>
                        <th width="300" class="p-2 border text-left">{{ __m( 'Product', 'NsGastro' ) }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr :key="meal.id" v-for="meal of response.data" @click="serveMeal( meal )">
                        <td class="p-2 cursor-pointer border-b">
                            <h3 class="font-semibold">{{ meal.name }} (x{{ meal.quantity }})</h3>
                            <div class="grid grid-cols-2 text-sm">
                                <div>{{ __m( 'Placed By', 'NsGastro' ) }} : {{ meal.meal_placed_by_name || __m( 'N/A', 'NsGastro' ) }}</div>
                                <div>{{ __m( 'Order', 'NsGastro' ) }} : {{ meal.order.code }}</div>
                                <div>{{ __m( 'Table', 'NsGastro' ) }} : {{ meal.order.table_name || __m( 'N/A', 'NsGastro' ) }}</div>
                                <div>{{ __m( 'Type', 'NsGastro' ) }} : {{ meal.order.type }}</div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="! loaded" class="overflow-y-auto flex-auto flex items-center justify-center">
            <ns-spinner></ns-spinner>
        </div>
        <div class="p-2 flex justify-between items-center ns-box-footer border-t">
            <div>
                <div v-if="response !== null" class="rounded-lg overflow-hidden flex">
                    <div class="ns-button hover-info" :key="index" v-for="(link,index) of response.links">
                        <button v-if="![ 'pagination.previous', 'pagination.next' ].includes( link.label )"  @click="gotToPage( link )" class="border rounded-lg text-sm mx-1 px-2 py-1" v-html="link.label"></button>
                    </div>
                </div>
            </div>
            <div>
                <ns-button @click="markListedAsServed()" type="info">{{ __m( 'Listed As Served', 'NsGastro' ) }}</ns-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'gastro-pos-ready-meals',
    mounted() {
        this.popupCloser();
        this.getReadyMeals();
    },
    data() {
        return {
            response   :   null,
            prevPage: null,
            nextPage: null,
            loaded: false,
        }
    },
    methods: {
        __m,
        popupCloser,
        popupResolver,
        async serveMeal( meal ) {
            try {
                const result    =   await new Promise( ( resolve, reject ) => {
                    Popup.show( nsConfirmPopup, { resolve, reject, 
                        title : __m( 'Would You Mark As Served ?', 'NsGastro' ),
                        message: __m( 'The meal will be marked as served. Please confirm your action.', 'NsGastro' ),
                        onAction: ( action ) => {
                            if ( action ) {
                                nsHttpClient.post( `/api/nexopos/v4/gastro/products/${meal.id}/serve` )
                                    .subscribe( result => {
                                        const link  =   this.response.links
                                            .filter( link => parseInt( link.label ) === parseInt( this.response.current_page ) );

                                        if ( link.length === 1 ) {
                                            this.gotToPage( link[0] );
                                        } else {
                                            this.getReadyMeals();
                                        }

                                        nsSnackBar.success( result.message ).subscribe();
                                    }, error => {
                                        nsSnackBar.error( error.message || __m( 'An unexpected error occured.', 'NsGastro' ) ).subscribe();
                                    })
                            }
                        }
                    })
                });
            } catch( exception ) {
                console.log( exception );
            }
        },

        async markListedAsServed() {
            if ( this.response.data.length === 0 ) {
                return nsSnackBar.error( __m( 'There is nothing to mark as served.', 'NsGastro' ) ).subscribe();
            }

            try {
                const result    =   await new Promise( ( resolve, reject ) => {
                    const products      =   this.response.data.map( entry => entry.id );
                    Popup.show( nsConfirmPopup, { resolve, reject, 
                        title : __m( 'Confirm Yout Action ?', 'NsGastro' ),
                        message: __m( 'Would you like to mark all listed products as served ?', 'NsGastro' ),
                        onAction: ( action ) => {
                            if ( action ) {
                                nsHttpClient.post( `/api/nexopos/v4/gastro/products/serve`, { products })
                                    .subscribe( result => {
                                        const link  =   this.response.links
                                            .filter( link => parseInt( link.label ) === parseInt( this.response.current_page ) );

                                        if ( link.length === 1 ) {
                                            this.gotToPage( link[0] );
                                        } else {
                                            this.getReadyMeals();
                                        }

                                        nsSnackBar.success( result.message ).subscribe();
                                    }, error => {
                                        nsSnackBar.error( error.message || __m( 'An unexpected error occured.', 'NsGastro' ) ).subscribe();
                                    })
                            }
                        }
                    })
                });
            } catch( exception ) {
                console.log( exception );
            }
        },

        getReadyMeals() {
            this.loaded     =   false;
            nsHttpClient.get( `/api/nexopos/v4/gastro/products/ready` )
                .subscribe( response => {
                    this.loaded     =   true;
                    this.response   =   response;
                }, error => {
                    nsSnackBar.error( error.message || __m( 'An unexpected error occured.', 'NsGastro' ) ).subscribe();
                })
        },
        gotToPage( link ) {
            if ( link.url !== null ) {
                nsHttpClient.get( link.url )
                    .subscribe( response => {
                        this.loaded     =   true;
                        this.response   =   response;
                    }, error => {
                        nsSnackBar.error( error.message || __m( 'An unexpected error occured.', 'NsGastro' ) ).subscribe();
                    })
            }
        }
    }
}
</script>