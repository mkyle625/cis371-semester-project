import { initializeApp } from 'firebase/app';
import Vue from 'vue';
import App from './App.vue';
import { firebaseConfig } from './myconfig';
import router from "./router";
import store from "./store";

Vue.config.productionTip = false
const app = initializeApp(firebaseConfig);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
