<template>
    <section class="loginContainer">
        <div class="loginInner">
            <div class="login_header">
                <h2 class="login_logo">硅谷外卖</h2>
                <div class="login_header_title">
                    <!-- 这里写对象的方式是写在,类名确定,只是选择不确定的时候用 -->
                    <a href="javascript:;" :class="{on:loginIrc}" @click="loginIrc=true">短信登录</a>
                    <a href="javascript:;" :class="{on:!loginIrc}" @click="loginIrc=false">密码登录</a>
                </div>
            </div>
            <div class="login_content">
                <form>
                    <div :class="{on:loginIrc}">
                        <section class="login_message">
                            <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                            <!-- disabled 是取得布尔值,如果phone正则表达是对的就为false,这里取反, -->
                            <!-- get_lack 也是取的布尔值, 这个类名是是因为这个changeColor方法为ture 的时候才添加上去的 -->
                            <button :disabled="!phone" class="get_verification" :class="{get_lack:changeColor}" @click.prevent="countDown">{{countTime > 0? `已发送(${countTime})s`:'获取验证码'}}</button>
                        </section>
                        <section class="login_verification">
                            <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
                        </section>
                        <section class="login_hint">
                            温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                            <a href="javascript:;">《用户服务协议》</a>
                        </section>
                    </div>
                    <div :class="{on:!loginIrc}">
                        <section>
                            <section class="login_message">
                                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                            </section>
                            <section class="login_verification">
                                <input type="text" maxlength="8" placeholder="密码" v-if="showWord" v-model="pwd">
                                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">

                                <div class="switch_button off" :class="showWord? 'on':'off'" @click="showWord=!showWord">
                                    <div class="switch_circle" :class="showWord? 'right':'switch_circle'"></div>
                                    <span class="switch_text">{{showWord? 'abc':'...'}}</span>
                                </div>
                            </section>
                            <section class="login_message">
                                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                                <img class="get_verification" :src="imgSrc" alt="captcha" @click="alterImgSrc">
                            </section>
                        </section>
                    </div>
                    <button class="login_submit" @click.prevent="register ">登录</button>
                </form>
                <a href="javascript:;" class="about_us">关于我们</a>
            </div>
            <a href="javascript:" class="go_back" @click="$router.go(-1)">
                <i class="iconfont icon-icon-test9"></i>
            </a>
        </div>
        <AlertTip :alertText="alertText" v-show="cut" @closeTip="closeTip" />
    </section>
</template>

<script>
import AlertTip from "../../components/AlertTip/AlertTip";
import { reqLoginPwd, reqSendCode, reqLoginSms } from "../../api";
export default {
    data() {
        return {
            loginIrc: true, //true代表验证码登录 flase代表密码登录
            phone: "", // 手机号码初始化
            countTime: 0, //倒计时
            showWord: false, // 密码可见与不可见之间的切换
            pwd: "", // 密码
            code: "", //验证码
            name: "", //用户名
            captcha: "", // 图形验证码
            alertText: "", //提示组件上显示的内容,
            cut: false, //提示组件默认不显示
            imgSrc: "http://localhost:4000/captcha?time"
        };
    },
    methods: {
        // 1 异步获取验证码
        // 1.1 设置秒数递减的定时器
        async countDown() {
            if (this.countTime === 0 && this.phone.length === 11) {
                // 验证码定制器,countTime刚进来的时候赋值为30
                this.countTime = 30;
                // 这里如果用const 是一个块级作用域,后面是访问不到的
                this.StopTiming = setInterval(() => {
                    this.countTime--;
                    if (this.countTime <= 0) {
                        clearInterval(this.StopTiming);
                    }
                }, 1000);
            }
            // 1.2 发送ajax请求(异步获取验证码)
            const res = await reqSendCode(this.phone);
            console.log(res);
            if (res.code === 1) {
                this.showAlert("获取验证码失败");
                this.countTime = 0;
                clearInterval(this.StopTiming);
            }
        },
        // 点击提交的时候验证
        showAlert(alertText) {
            this.cut = true;
            this.alertText = alertText;
        },
        // 点击登录
        async register() {
            // 短信登录验证
            let res;
            if (this.loginIrc) {
                const { phone, code } = this;
                if (!this.changeColor) {
                    // 请输入正确的手机号
                    this.showAlert("请输入正确的手机号");
                    return;
                } else if (!/^\d{6}$/.test(code)) {
                    // 请输入正确的验证码
                    this.showAlert("请输入正确的验证码");
                    return;
                }
                // 发送请求
                res = await reqLoginSms(phone, code);
                // console.log(res)
            }
            if (!this.loginIrc) {
                // 密码登录
                const { name, pwd, captcha } = this;
                if (!name) {
                    // 请输入账号
                    this.showAlert("请输入账号");
                    return;
                } else if (!pwd) {
                    // 请输入密码
                    this.showAlert("请输入密码");
                    return;
                } else if (!captcha) {
                    //请输入验证码
                    this.showAlert("请输入验证码");
                    return;
                }
                // 发送请求
                res = await reqLoginPwd({ name, pwd, captcha });
            }

            if (this.countTime) {
                this.countTime = 0;
                clearInterval(this.StopTiming);
                this.StopTiming = undefined;
            }

            //判断
            if (res.code == 0) {
                const user = res.data;
                console.log(user);
                this.$store.dispatch("recordUser", user);
                // 去个人中心界面
                this.$router.replace("/profile");
            } else {
                const msg = res.msg;
                this.showAlert(msg);
                this.imgSrc = "http://localhost:4000/captcha?time" + Date.now();
            }
        },
        closeTip() {
            this.cut = false;
        },
        alterImgSrc() {
            this.imgSrc = "http://localhost:4000/captcha?time" + Date.now();
        }
    },
    computed: {
        changeColor() {
            return /^1\d{10}$/.test(this.phone);
        }
    },
    components: {
        AlertTip
    }
};
</script>

<style>
.loginContainer {
    width: 100%;
    height: 100%;
    background: #fff;
}
.loginContainer .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;
}
.loginContainer .loginInner .login_header .login_logo {
    font-size: 40px;
    font-weight: bold;
    color: #02a774;
    text-align: center;
}
.loginContainer .loginInner .login_header .login_header_title {
    padding-top: 40px;
    text-align: center;
}
.loginContainer .loginInner .login_header .login_header_title > a {
    color: #333;
    font-size: 14px;
    padding-bottom: 4px;
}

.loginContainer .loginInner .login_header .login_header_title > a:first-child {
    margin-right: 40px;
}

.loginContainer .loginInner .login_header .login_header_title > a.on {
    color: #02a774;
    font-weight: 700;
    border-bottom: 2px solid #02a774;
}
.loginContainer .loginInner .login_content > form > div {
    display: none;
}
.loginContainer .loginInner .login_content > form > div.on {
    display: block;
}
.loginContainer .loginInner .login_content > form > div input {
    width: 100%;
    height: 100%;
    padding-left: 10px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: 0;
    font: 400 14px Arial;
}
.loginContainer .loginInner .login_content > form > div input:focus {
    border: 1px solid #02a774;
}

.loginContainer .loginInner .login_content > form > div .login_message {
    position: relative;
    margin-top: 16px;
    height: 48px;
    font-size: 14px;
    background: #fff;
}

.loginContainer
    .loginInner
    .login_content
    > form
    > div
    .login_message
    .get_verification {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    border: 0;
    color: #ccc;
    font-size: 14px;
    background: transparent;
}
.loginContainer
    .loginInner
    .login_content
    > form
    > div
    .login_message
    .get_lack {
    color: black;
}
.loginContainer .loginInner .login_content > form > div .login_verification {
    position: relative;
    margin-top: 16px;
    height: 48px;
    font-size: 14px;
    background: #fff;
}

.loginContainer
    .loginInner
    .login_content
    > form
    > div
    .login_verification
    .switch_button {
    font-size: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    transition: background-color 0.3s, border-color 0.3s;
    padding: 0 6px;
    width: 30px;
    height: 16px;
    line-height: 16px;
    color: #fff;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
}

.loginContainer
    .loginInner
    .login_content
    > form
    > div
    .login_verification
    .switch_button.off {
    background: #fff;
}

.loginContainer
    .loginInner
    .login_content
    > form
    > div
    .login_verification
    .switch_button.off
    .switch_text {
    float: right;
    color: #ddd;
}

.loginContainer
    .loginInner
    .login_content
    > form
    > div
    .login_verification
    .switch_button.on {
    background: #02a774;
}

.loginContainer
    .loginInner
    .login_content
    > form
    > div
    .login_verification
    .switch_button
    > .switch_circle {
    position: absolute;
    top: -1px;
    left: -1px;
    width: 16px;
    height: 16px;
    border: 1px solid #ddd;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
}
.loginContainer
    .loginInner
    .login_content
    > form
    > div
    .login_verification
    .switch_button
    > .right {
    transform: translateX(30px);
}

.loginContainer .loginInner .login_content > form > div .login_hint {
    margin-top: 12px;
    color: #999;
    font-size: 14px;
    line-height: 20px;
}

.loginContainer .loginInner .login_content > form > div .login_hint > a {
    color: #02a774;
}
.loginContainer .loginInner .login_content > form .login_submit {
    display: block;
    width: 100%;
    height: 42px;
    margin-top: 30px;
    border-radius: 4px;
    background: #4cd96f;
    color: #fff;
    text-align: center;
    font-size: 16px;
    line-height: 42px;
    border: 0;
}
.loginContainer .loginInner .login_content .about_us {
    display: block;
    font-size: 12px;
    margin-top: 20px;
    text-align: center;
    color: #999;
}
.loginContainer .loginInner .go_back {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 30px;
    height: 30px;
}
.loginContainer .loginInner .go_back > .iconfont {
    font-size: 30px;
    color: #999;
}
</style>
