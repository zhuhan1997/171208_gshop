// 注意要引入api接口函数
import {
    reqAddress,
    reqCategorys,
    reqShops,
    reqUserInfo,
    reqlogOut
} from '../api'

import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO
} from './mutations-types'

export default {
    //异步获取地址
    async getAddress({ commit, state }) {
        // 从state状态中获取到经纬度用来设置reqAddress的参数
        const geohash = state.latitude + ',' + state.longitude
        // 1. 发送异步ajax请求
        const result = await reqAddress(geohash)
        // 2. 提交一个mutation
        if (result.code === 0) {
            const address = result.data
            commit(RECEIVE_ADDRESS, { address })
        }
    },

    // 异步获取商家列表
    async reqCategorys({ commit, state }) {
        // 发送异步ajax请求
        const result = await reqCategorys()
        // 提交一个mutation
        if (result.code === 0) {
            const categorys = result.data
            commit(RECEIVE_CATEGORYS, { categorys })
        }
    },

    // 异步获取商家列表
    async getShops({ commit, state }) {
        // 对象的结构赋值
        const { longitude, latitude } = state
        // 发送异步ajax请求
        const result = await reqShops(longitude, latitude)
        // 提交一个mutation
        if (result.code === 0) {
            const shops = result.data
            commit(RECEIVE_SHOPS, { shops })
        }
    },
    // 同步记录用户信息
    recordUser({ commit }, userInfo) {
        commit(RECEIVE_USER_INFO, { userInfo })
    },
    // 异步获取用户信息
    async getUserInfo ({commit}) {
        const result = await reqUserInfo()
        if (result.code === 0) {
          const userInfo = result.data
          commit(RECEIVE_USER_INFO, {userInfo})
        }
      },
      // 退出登录
    async getLogOut({commit}) {
        const result = await reqlogOut()
        if(result.code ===0 ) {
            commit(RESET_USER_INFO)
        }
    }
}

