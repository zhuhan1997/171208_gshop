/* 
 与后台交互模块 (依赖自己的ajax函数)
*/
import ajax from './ajax'

const BASE_URL = '/api'

// 获取地址信息(根据经纬度)
// 这个接口的经纬度是url路径里的,没有query参数
// 向外暴露
export const reqAddress = geohash => ajax(`${BASE_URL}/position/${geohash}`)

// 获取msite食品 列表

export const reqCategorys = () => ajax(BASE_URL + '/index_category')

/* 获取 msite 商铺列表(根据query参数：经纬度)
   将经纬度两个数据作为一个参数对象传入
*/
export const reqShops = ({ latitude, longitude }) => ajax(BASE_URL + '/shops', { latitude, longitude })

/**
 * 账号密码登录
 */
export const reqLoginPwd = ({ name, pwd, captcha }) => ajax(BASE_URL + '/login_pwd', { name, pwd, captcha }, 'POST')
/**
 * 获取短信验证码
 */
export const reqSendCode = phone => ajax(BASE_URL + '/sendcode', { phone })
/**
 * 手机号验证码登录
 */
export const reqLoginSms = ({ phone, code }) => ajax(BASE_URL + '/login_sms', { phone, code }, 'POST')
/**
 * 获取用户信息(根据会话)
 */
// export const requserInfo = () => ajax(BASE_URL + '/userinfo')
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')
/**
 * 请求登出
 */
export const reqlogOut = () => ajax(BASE_URL + 'logout')
/**
 * 获取商家信息(下列请求由mock拦截并返回 不需要代理)
 */

/**
 * 获取商家评价数组
 */

/**
 * 获取商家商品数组
 */
