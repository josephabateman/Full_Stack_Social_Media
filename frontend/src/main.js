import '@babel/polyfill'
import 'mutationobserver-shim'
// import './plugins/bootstrap-vue'

import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

// import '@fortawesome/fontawesome-free/css/all.css'
// import '@fortawesome/fontawesome-free/js/all.js'

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App)
  .use(router)
  .mount("#app");

// below is what i want it to look like

// import '@babel/polyfill';
// import 'mutationobserver-shim';
// import Vue from "vue";
// // import './plugins/bootstrap-vue';
// import App from "./App.vue";
// import router from "./router";

// Vue.config.productionTip = false;

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount("#app");