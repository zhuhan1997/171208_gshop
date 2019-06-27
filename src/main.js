// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 引入mockjs
import './mock/mockServer'

import {
  NavBar,
  Swipe,
  SwipeItem,
  Button 

} from 'vant';
Vue
  .use(NavBar)
  .use(Swipe)
  .use(SwipeItem)
  .use(Button)

// 引入 axios 
// import axios from 'axios'
// // 设置原型
// Vue.prototype.$http = axios
// //  axios 请求根路径这只
// axios.defaults.baseURL = '/api'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
