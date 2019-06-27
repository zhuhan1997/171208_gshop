<template>
    <div>
        <ShopHead/>
        <div class="tab">
            <div class="tab-goods">
                <router-link to="/goods">点餐</router-link>
            </div>
            <div class="tab-info">  
                <router-link to="/info">评价</router-link>
            </div>
           <div class="tab-ratins">
               <router-link to="/ratins">评价</router-link>
           </div>
        </div>
        <router-view/>
    </div>
</template>

<script>
import ShopHead from '../../components/ShopHead/ShopHead.vue'

export default {
    data() {
        return{

        }
    },
    created(){
        this.$store.dispatch('getInfo')
          
    },
    methods:{

    },
    components:{
        ShopHead
    },
    mounted:{

    }
}
</script>

<style>

</style>
