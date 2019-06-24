import Vue from 'vue'
import Router from 'vue-router'
// import App from '../App'
import Msite from '../pages/Msite/Msite'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'
import Login from '../pages/Login/Login'
import Userinfo from '../pages/Userinfo/Userinfo.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/msite',
      meta: {
        showModule: true
      }
    },
    {
      path: '/msite',
      component: Msite,
      meta: {
        showModule: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showModule: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showModule: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showModule: true
      }
    },
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/userinfo',
      redirect: Userinfo
    }
  ]
})
