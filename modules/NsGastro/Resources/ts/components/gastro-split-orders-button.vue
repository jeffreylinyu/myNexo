<template>
    <div class="ns-button">
        <div class="ns-button hover-warning">
            <button @click="openSplitOrderPopup()" class="flex-shrink-0 h-12 flex items-center shadow rounded px-2 py-1 text-sm">
                <i class="text-xl las la-expand-arrows-alt mr-2"></i>
                <span>{{ __m( 'Split Orders', 'NsGastro' ) }}</span>
            </button>
        </div>
    </div>
</template>
<script>
import gastroSplitOrderVue from './gastro-split-order.vue';
import gastroTableVue from './gastro-table.vue';
export default {
    methods: {
        __m,
        async openSplitOrderPopup() {
            try {
                const result    =   await new Promise( ( resolve, reject ) => {
                    Popup.show( gastroSplitOrderVue, { resolve, reject });
                });
            } catch( exception ) {
                console.log( exception );
            }
        }
    }
}
</script>