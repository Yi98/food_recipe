import Vue from 'vue'
import VueRouter from 'vue-router';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router';
import store from './store';

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter);

Vue.config.productionTip = false

Vue.mixin({
  data: function () {
    return {
      get domain() {
        // return 'http://127.0.0.1:5000';
        return 'https://www.hexameal.com';
      }
    }
  }
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')