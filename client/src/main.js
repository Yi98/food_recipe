import Vue from 'vue'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import Index from './components/Index'
import Explore from './components/Explore'
import Featured from './components/Featured'
import Search from './components/Search'
import Fridge from './components/Fridge'
import Details from './components/Details'


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Index },
    { path: '/explore', component: Explore },
    { path: '/featured', component: Featured },
    { path: '/search', component: Search },
    { path: '/fridge', component: Fridge },
    { path: '/details', component: Details }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
