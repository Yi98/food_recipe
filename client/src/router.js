import VueRouter from 'vue-router';
import Index from './views/Index'
import Explore from './views/Explore'
import Featured from './views/Featured'
import Search from './views/Search'
import Fridge from './views/Fridge'
import Details from './views/Details'
import PageNotFound from './views/PageNotFound'


const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'Index', component: Index },
    { path: '/explore', name: 'Explore', component: Explore },
    { path: '/featured', name: 'Featured', component: Featured },
    { path: '/search', name: 'Search', component: Search },
    { path: '/fridge', name: 'Fridge', component: Fridge },
    { path: '/details', name: 'Details', component: Details },
    { path: '*', name: 'PageNotFound', component: PageNotFound }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
});


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.name != 'Index') {
    if (!token) {
      next({ name: 'Index' });
    }
    else {
      next();
    }
  }
  else {
    next();
  }


});


export default router;