<template>
  <div id="app">
    <router-view/>
    <FoorerGuide v-show="$route.meta.showModule" />
  </div>
</template>

<script>
import FoorerGuide from "./components/FooterGuide/FooterGuide.vue";
import { mapActions } from "vuex";

export default {
  // 因为经纬度后面也要用得到,所以越早获取越好,,所以在App里面获取,在哪里获取都一样,因为是用vuex状态保管着数据
    created() {
      this.getAddress()
      this.getUserInfo()
    },
    methods: {
        ...mapActions(["getAddress","getUserInfo"])
    },
    components: {
        FoorerGuide
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
</style>
