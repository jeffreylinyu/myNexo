import { VueMasonryPlugin } from 'vue-masonry';

declare const nsExtraComponents;
declare const Vue;

Vue.use( VueMasonryPlugin );


const gastroKitchen         =   require( './components/gastro-kitchen' ).default;
const gastroKitchenSelect   =   require( './components/gastro-kitchen-select' ).default;

export class GastroKitchen {

}

/**
 * when the DOM is ready
 * to be loaded.
 */
nsExtraComponents[ 'gastroKitchen' ]            =   gastroKitchen;
nsExtraComponents[ 'gastroKitchenSelect' ]      =   gastroKitchenSelect;

document.addEventListener( 'DOMContentLoaded', () => {
    window[ 'Gastro' ]                      =   new GastroKitchen;
});