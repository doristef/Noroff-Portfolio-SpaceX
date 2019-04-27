/* Import - Vue and App */
import Vue from 'vue';
import App from './App.vue';
  Vue.config.productionTip = false;

/* Vue Router */
import VueRouter from 'vue-router'
  Vue.use(VueRouter)
/* Lodash */
import VueLodash from 'vue-lodash'
const options = { name: 'lodash' } 
  Vue.use(VueLodash, options)

/* Google Maps */
import * as VueGoogleMaps from 'vue2-google-maps'
  Vue.use(VueGoogleMaps, {
    load: { key: 'AIzaSyAGbs_BPoFSN9r1QVRq_uS4i2Vsu4IMxGo' }
  });

/* FILTERS */
import moment from 'moment';

    // Date
        Vue.filter('formatDate', function(value) {
            return moment(String(value)).format('DD/MM/YYYY');
        });
    // Date & Time
      Vue.filter('formatDateTime', function(value) {
          return moment(String(value)).format('DD/MM/YYYY hh:mm');
      });

    // Currency
      Vue.filter('formatMoney', function(value) {
      if (typeof value !== "number") {
          return value;
      }
      return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
    });

    // Number Format 
    Vue.filter('formatNumber', function(value) {
      if (typeof value !== "number") {
        return value;
      }
      return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    });


    // Read More
      import ReadMore from 'vue-read-more';
        Vue.use(ReadMore);

    // First letter Uppercase
      Vue.filter('upperFirst', function (value) {
        return value.charAt(0).toUpperCase() + value.slice(1)
      })
  

/* SASS - SCSS */
import BootstrapVue from 'bootstrap-vue';
import './scss/styles.scss';
import "animate.css/animate.css";
  Vue.use(BootstrapVue);

/* FontAwesome - FortAwesome  */
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faCheck, faChevronRight } from "@fortawesome/free-solid-svg-icons";
  library.add( faSearch, faCheck, faChevronRight );

/* Mount */
new Vue({
  render: h => h(App)
}).$mount('#app');
