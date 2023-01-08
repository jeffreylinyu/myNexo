<script>
nsExtraComponents.nsWooSettings   =   Vue.component( 'ns-woo-settings', {
    'template'  : `
    <div class="ns-grid ns-grid-gap-2">
        <div class="ns-grid-item w-full md:w-1/3">
            <h1 class="ns-heading-4">${__m( 'Create Webhook', 'NsWooCommerce' )}</h1>
            <p>${__m( 'This will create all necessary webhooks the WooCommerce store. Make sure to have provided the API before.', 'NsWooCommerce' )}</p>
            <br>
            <ns-button @click="triggerSync()" type="info">${__m( 'Create Webhooks', 'NsWooCommerce' )}</ns-button>
        </div>
    </div>
    `,
    mounted() {
        // ...
    },
    methods: {
        triggerSync(){
            Popup.show( nsConfirmPopup, {
                title: __m( 'Confirm Your Action', 'NsWooCommerce' ),
                message: __m( 'The webhook will be created pointing at this installation. Would you like to proceed ?', 'NsWooCommerce' ),
                onAction: ( action ) => {
                    if ( action ) {
                        nsHttpClient.get( '/api/nexopos/v4/nsw/create-webhooks' )
                            .subscribe({
                                next: result => {
                                    nsSnackBar.success( result.message, __m( 'Ok', 'NsWooCommerce' ), { duration: 3000 }).subscribe();
                                },
                                error: error => {
                                    nsSnackBar.error( error.message || __m( 'An unexpected error occured.', 'NsWooCommerce' ), __m( 'Ok', 'NsWooCommerce' ), { duration: 3000 }).subscribe();
                                }
                            });
                    }
                }
            })
        }
    }
});
</script>