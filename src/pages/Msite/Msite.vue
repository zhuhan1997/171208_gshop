<template>
    <div id="app">
        <section class="content">
            <!--首页外卖-->
            <div class="on">
                <section class="msite">
                    <!--首页头部-->
                    <HeaderTop :title="address.name">
                        <span class="header_search" slot="left">
                            <i class="iconfont icon-sousuo"></i>
                        </span>
                        <span class="header_login" slot="right">
                            <span class="header_login_text">登录|注册</span>
                        </span>
                    </HeaderTop>
                    <!--首页导航-->
                    <!-- 轮播图区域 -->
                    <van-swipe indicator-color="#000" class="van-swipe" v-if="categoryArr.length">
                        <van-swipe-item class="swiper-slide" v-for="(pages,index) in categoryArr" :key="index">
                            <a href="javascript:" class="link_to_food" v-for="(data,index) in pages" :key="index">
                                <div class="food_container">
                                    <img :src="baseImags + data.image_url">
                                </div>
                                <span>{{data.title}}</span>
                            </a>

                        </van-swipe-item>

                    </van-swipe>
                    <img src="./images/msite_back.svg" alt="back" v-else>
                    <!--首页附近商家-->
                    <div class="msite_shop_list">
                        <div class="shop_header">
                            <i class="iconfont icon-xuanxiang"></i>
                            <span class="shop_header_title">附近商家</span>
                        </div>
                        <!-- 剪切的 ShopList 组件-->
                        <ShopList/>
                    </div>
                </section>
            </div>
            <!--搜索-->
            <div>
                <!-- search -->
            </div>
            <!--订单-->
            <div>
                <!-- order -->
            </div>
            <!--我的-->
            <div>
                <!--Profile -->
            </div>
        </section>
        <!--on表示显示，off表示关闭-->
        <div class="off">

        </div>
        <footer class="footer_guide border-1px">
            <a href="javascript:;" class="guide_item on">
                <span class="item_icon">
                    <i class="iconfont icon-waimai"></i>
                </span>
                <span>外卖</span>
            </a>
            <a href="javascript:;" class="guide_item">
                <span class="item_icon">
                    <i class="iconfont icon-search"></i>
                </span>
                <span>搜索</span>
            </a>
            <a href="javascript:;" class="guide_item">
                <span class="item_icon">
                    <i class="iconfont icon-dingdan"></i>
                </span>
                <span>订单</span>
            </a>
            <a href="javascript:;" class="guide_item">
                <span class="item_icon">
                    <i class="iconfont icon-geren"></i>
                </span>
                <span>我的</span>
            </a>
        </footer>
    </div>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop";
import ShopList from "../../components/ShopList/ShopList";
import { mapState } from "vuex";
export default {
    data() {
        return {
            baseImags: "https://fuss10.elemecdn.com"
        };
    },
    methods: {},
    components: {
        ShopList,
        HeaderTop
    },
    created() {
        this.$store.dispatch("reqCategorys");
        this.$store.dispatch("getShops");
    },
    computed: {
        ...mapState(["address", "categorys"]),
        categoryArr() {
            const { categorys } = this;

            const maxArr = [];
            let minArr = [];

            // 遍历循环 categorys 里面的每一个元素
            categorys.forEach(element => {
                // 如果minArr数组里面的元素 等于8个的话就把数组清空
                if (minArr.length === 8) {
                    minArr = [];
                }
                // 如果minArrr 里面的元素等于 0个的话就把minarr数组里的元素添加的maxArr里面
                if (minArr.length === 0) {
                    maxArr.push(minArr);
                }
                minArr.push(element);
            });
            return maxArr;
        }
    }
};
</script>

<style lang="less" >
* {
    touch-action: pan-y;
}
#app {
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    position: relative;
    overflow-x: hidden;
}
#app .footer_guide {
    position: relative;
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    width: 100%;
    height: 50px;
    display: flex;
}
#app .footer_guide::before {
    content: "";
    position: absolute;
    z-index: 200;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    background-color: #e4e4e4;
}
#app .footer_guide .guide_item {
    display: flex;
    flex: 1;
    text-align: center;
    flex-direction: column;
    align-items: center;
    margin: 5px;
    color: #999;
}
#app .footer_guide .guide_item.on {
    color: #02a774;
}
#app .footer_guide .guide_item span {
    font-size: 12px;
    margin-top: 2px;
    margin-bottom: 2px;
}
#app .footer_guide .guide_item span .iconfont {
    font-size: 22px;
}
#app .content > div {
    display: none;
}
#app .content > div.on {
    display: block;
}
.header {
    background-color: #02a774;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 45px;
}
.header .header_search {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 10%;
    height: 50%;
}
.header .header_search .iconfont {
    font-size: 22px;
    color: #fff;
}
.header .header_title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30%;
    color: #fff;
    font-size: 22px;
    text-align: center;
}
#app .content > div > section.msite {
    width: 100%;
}

#app .content > div > section.msite .msite_nav {
    position: relative;
    margin-top: 45px;
    height: 200px;
    background: #fff;
}
#app .content > div > section.msite .msite_nav::before {
    content: "";
    position: absolute;
    z-index: 200;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #e4e4e4;
    transform: scaleY(0.5);
}
#app .content > div > section.msite .msite_nav .swiper-container {
    width: 100%;
    height: 100%;
}
#app
    .content
    > div
    > section.msite
    .msite_nav
    .swiper-container
    .swiper-wrapper {
    width: 100%;
    height: 100%;
}
#app .van-swipe .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
}
#app .van-swipe .swiper-slide .link_to_food {
    width: 25%;
    margin-top: 8px;
}
#app .van-swipe .swiper-slide .link_to_food .food_container {
    display: block;
    width: 100%;
    text-align: center;
    padding-bottom: 8px;
    font-size: 0;
}
#app .van-swipe .swiper-slide .link_to_food .food_container img {
    display: inline-block;
    width: 50px;
    height: 50px;
}
#app .van-swipe .swiper-slide .link_to_food span {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 13px;
    color: #666;
}
#app
    .content
    > div
    > section.msite
    .msite_nav
    .swiper-container
    .swiper-pagination
    > span.swiper-pagination-bullet-active {
    background: #02a774;
}
#app .content > div > section.msite .msite_shop_list {
    position: relative;
    margin-top: 10px;
    background: #fff;
}
#app .content > div > section.msite .msite_shop_list::before {
    content: "";
    position: absolute;
    z-index: 200;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    background-color: #e4e4e4;
}
#app .content > div > section.msite .msite_shop_list .shop_header {
    padding: 10px 10px 0;
}
#app .content > div > section.msite .msite_shop_list .shop_header .shop_icon {
    margin-left: 5px;
    color: #999;
}
#app
    .content
    > div
    > section.msite
    .msite_shop_list
    .shop_header
    .shop_header_title {
    color: #999;
    font-size: 14px;
    line-height: 20px;
}
//
#app > .off {
    display: none;
}
#app > .on {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
}
#app > .on .loginContainer {
    width: 100%;
    height: 100%;
    background: #fff;
}
#app > .on .loginContainer .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;
}
#app > .on .loginContainer .loginInner .login_header .login_logo {
    font-size: 40px;
    font-weight: bold;
    color: #02a774;
    text-align: center;
}
#app > .on .loginContainer .loginInner .login_header .login_header_title {
    padding-top: 40px;
    text-align: center;
}
#app > .on .loginContainer .loginInner .login_header .login_header_title > a {
    color: #333;
    font-size: 14px;
    padding-bottom: 4px;
}
#app
    > .on
    .loginContainer
    .loginInner
    .login_header
    .login_header_title
    > a:first-child {
    margin-right: 40px;
}
#app
    > .on
    .loginContainer
    .loginInner
    .login_header
    .login_header_title
    > a.on {
    color: #02a774;
    font-weight: 700;
    border-bottom: 2px solid #02a774;
}
#app > .on .loginContainer .loginInner .login_content > form > div {
    display: none;
}
#app > .on .loginContainer .loginInner .login_content > form > div.on {
    display: block;
}
#app > .on .loginContainer .loginInner .login_content > form > div input {
    width: 100%;
    height: 100%;
    padding-left: 10px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: 0;
    font: 400 14px Arial;
}
#app > .on .loginContainer .loginInner .login_content > form > div input:focus {
    border: 1px solid #02a774;
}
#app
    > .on
    .loginContainer
    .loginInner
    .login_content
    > form
    > div
    .login_message {
    position: relative;
    margin-top: 16px;
    height: 48px;
    font-size: 14px;
    background: #fff;
}
#app
    > .on
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
#app
    > .on
    .loginContainer
    .loginInner
    .login_content
    > form
    > div
    .login_verification {
    position: relative;
    margin-top: 16px;
    height: 48px;
    font-size: 14px;
    background: #fff;
}
#app
    > .on
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
#app
    > .on
    .loginContainer
    .loginInner
    .login_content
    > form
    > div
    .login_verification
    .switch_button.off {
    background: #fff;
}
#app
    > .on
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
#app
    > .on
    .loginContainer
    .loginInner
    .login_content
    > form
    > div
    .login_verification
    .switch_button.on {
    background: #02a774;
}
#app
    > .on
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
#app > .on .loginContainer .loginInner .login_content > form > div .login_hint {
    margin-top: 12px;
    color: #999;
    font-size: 14px;
    line-height: 20px;
}
#app
    > .on
    .loginContainer
    .loginInner
    .login_content
    > form
    > div
    .login_hint
    > a {
    color: #02a774;
}
#app > .on .loginContainer .loginInner .login_content > form .login_submit {
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
#app > .on .loginContainer .loginInner .login_content .about_us {
    display: block;
    font-size: 12px;
    margin-top: 20px;
    text-align: center;
    color: #999;
}
#app > .on .loginContainer .loginInner .go_back {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 30px;
    height: 30px;
}
#app > .on .loginContainer .loginInner .go_back > .iconfont {
    font-size: 20px;
    color: #999;
}
#app {
    .van-swipe {
        height: 200px;
        margin-top: 45px;
        background-color: #fff;
    }
}
</style>
