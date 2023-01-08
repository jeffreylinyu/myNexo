<template>
    <div class="ns-button hover-warning">
        <button @click="openMergeOrderPopup()" class="flex-shrink-0 h-12 flex items-center shadow rounded px-2 py-1 text-sm">
            <i class="text-xl las la-compress-arrows-alt mr-2"></i>
            <span>{{ __m( 'Merge Orders', 'NsGastro' ) }}</span>
        </button>
    </div>
</template>
<script>
import gastroPosMergeVue from './gastro-pos-merge.vue';
export default {
    methods: {
        __m,
        async openMergeOrderPopup() {
            try {
                const result    =   await new Promise( ( resolve, reject ) => {
                    Popup.show( gastroPosMergeVue, { resolve, reject });
                });
            } catch( exception ) {
                console.log( exception );
            }
        }
    }
}
</script>