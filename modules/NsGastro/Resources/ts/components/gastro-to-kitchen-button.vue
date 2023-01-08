<template>
    <button id="to-kitchen-button" @click="submitToKitchen()" class="outline-none flex-shrink-0 w-1/4 flex items-center font-bold cursor-pointer justify-center go-bg-blue-500 text-white border-r hover:go-bg-blue-600 go-border-blue-600 flex-auto">
        <span><i class="las la-utensils text-2xl lg:text-xl"></i> 
        <span class="text-lg hidden md:inline lg:text-2xl">{{ __m( 'To Kitchen', 'NsGastro' ) }}</span></span>
    </button>
</template>
<script>
export default {
    name: 'gastro-to-kitchen-button',
    mounted() {
        POS.order.subscribe( order => {
            this.order  =   order;
        })
    },
    data() {
        return {
            order: {}
        }
    },
    methods: {
        __m,
        async submitToKitchen() {
            const queues    =   nsHooks.applyFilters( 'ns-hold-queue', [
                ProductsQueue,
                CustomerQueue,
                TypeQueue,
            ]);
            
            for( let index in queues ) {
                try {
                    const promise   =   new queues[ index ]( this.order );
                    const response  =   await promise.run();
                } catch( exception ) {
                    /**
                     * in case there is something broken
                     * on the promise, we just stop the queue.
                     */
                    return false;    
                }
            }

            this.order.payment_status   =   'hold';
            POS.order.next( this.order );

            const popup     =   Popup.show( nsPOSLoadingPopup );
            
            try {
                const result    =   await POS.submitOrder();
                popup.close();
                nsSnackBar.success( result.message ).subscribe();
            } catch( exception ) {
                popup.close();
                nsSnackBar.error( exception.message || __m( 'An unexpected error occured.', 'NsGastro') ).subscribe();
            }
        }
    }

}
</script>