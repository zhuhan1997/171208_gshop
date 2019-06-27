import Vue from 'vue'
import Router from 'vue-router'
// import App from '../App'
import Msite from '../pages/Msite/Msite'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'
import Login from '../pages/Login/Login'
import Userinfo from '../pages/Userinfo/Userinfo.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRatins from '../pages/Shop/ShopRatins/ShopRatins.vue'
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
      component: Userinfo
    },
    {
      path:'/shop',
      component:Shop,
      children:[
        {
          path:'/goods',
          component:ShopGoods
        },
        {
          path:'/info',
          component:ShopInfo
        },
        {
          path:'/ratins',
          component:ShopRatins
        },
        {
          path:'',
          redirect:'/goods'
        }
      ]
    }
  ]
})
