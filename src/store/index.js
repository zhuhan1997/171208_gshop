//  vuex最核心的store管理对象

import Vue from 'vue'
import Vuex from 'vuex'

//引入四个最基本的模块
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

// 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});