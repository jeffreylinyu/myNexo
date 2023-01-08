<template>
    <div class="w-95vw md:w-3/5-screen lg:w-2/5-screen shadow-xl ns-box">
        <div class="p-2 flex items-center border-b ns-box-header justify-between">
            <div class="h3 font-semibold">{{ title }}</div>
            <div>
                <ns-close-button @click="popupResolver( false )"></ns-close-button>
            </div>
        </div>
        <div class="p-2">
            <ns-field v-for="( field, index ) of fields" :key="index" :field="field"></ns-field>
        </div>
        <div class="p-2 border-t ns-box-body flex justify-between">
            <div></div>
            <div>
                <ns-button @click="saveForm()" type="info">{{ __m( 'Save', 'NsGastro' ) }}</ns-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'gastro-kitchen-settings',
    data() {
        console.log( this );
        return {
            validation: new FormValidation,
            fields : []
        }
    },
    computed: {
        title() {
            return this.$popupParams.title || __m( 'Untitled Popup', 'NsGastro' );
        }
    },
    mounted() {
        this.fields     =   this.validation.createFields( this.$popupParams.fields );
        this.popupCloser();
    },
    methods: {
        __m,
        popupResolver,
        popupCloser,
        saveForm() {
            // nsHttpClient
            this.popupResolver( this.validation.extractFields( this.fields ) );
        },
        popupCloser,
        popupResolver,
        closePopup() {
            this.popupResolver( false );
        }
    }
}
</script>