<template>
    <div class="ns-button hover-info">
        <button @click="openTableManagement()" class="flex-shrink-0 h-12 flex items-center shadow rounded px-2 py-1 text-sm">
            <i class="text-xl las la-utensils"></i>
            <span>{{ __m( 'Tables', 'NsGastro' ) }}</span>
        </button>
    </div>
</template>
<script>
import gastroPosTablesVue from './gastro-pos-tables.vue'
import gastroTableVue from './gastro-table.vue';
export default {
    methods: {
        __m,
        async openTableManagement() {
            try {
                const result    =   await new Promise( ( resolve, reject ) => {
                    Popup.show( gastroTableVue, { resolve, reject, mode: 'explore' });
                });
            } catch( exception ) {
                console.log( exception );
            }
        }
    }
}
</script>