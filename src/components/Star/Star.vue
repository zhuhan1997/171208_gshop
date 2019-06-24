<template>
    <div class="star" :class="'star-'+ size">
        <span class="star-item on" v-for="(sc,index) in starClasses" :class="sc" :key="index"></span>
    </div>
</template>

<script>
const CLASS_ON = "on";
const CLASS_HALF = "half";
const CLASS_OFF = "off";
export default {
    data() {
        return {};
    },
    props: {
        score: Number,
        size: Number
    },
    computed: {
        /*
    3.2: 3 + 0 + 2
    4.7: 4 + 1 + 0
    */
        // 该方法产生一个数组starArr来表示on half off类名的span数量（总长度为5）
        starClasses() {
            // 结构赋值 this , this指向的是vue实例
            const { score } = this;

            const starArr = [];
            // 向下取整score
            const scoreInteger = Math.floor(score);
            // 循环scoreInteger
            for (let i = 0; i < scoreInteger; i++) {
                // 如果i小于scoreInteger,就把CLASS_ON(全星)添加到starAll数组里
                starArr.push(CLASS_ON);
            }
            // 判断,如果score减去screInteger大于等于5的话,就添加一个半星
            if (score * 10 - scoreInteger * 10 >= 5) {
                starArr.push(CLASS_HALF);
            }
            //
            if (starArr.length < 5) {
                starArr.push(CLASS_OFF)
            }
            return starArr;
        }
    }
};
</script>

<style>
.star {
    float: left;
    font-size: 0;
}
.star .star-item {
    display: inline-block;
    background-repeat: no-repeat;
}
.star.star-48 .star-item {
    width: 20px;
    height: 20px;
    margin-right: 22px;
    background-size: 20px 20px;
}
.star.star-48 .star-item:last-child {
    margin-right: 0;
}
.star.star-48 .star-item.on {
    background-image: url("./images/star48_on@2x.png");
}

.star.star-36 .star-item {
    width: 15px;
    height: 15px;
    margin-right: 6px;
    background-size: 15px 15px;
}
.star.star-36 .star-item:last-child {
    margin-right: 0;
}
.star.star-36 .star-item.on {
    background-image: url("./images/star36_on@2x.png");
}
@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    .star.star-36 .star-item.on {
        background-image: url("./images/star36_on@3x.png");
    }
}
.star.star-36 .star-item.half {
    background-image: url("./images/star36_half@2x.png");
}
.star.star-24 .star-item {
    width: 10px;
    height: 10px;
    margin-right: 3px;
    background-size: 10px 10px;
}
.star.star-24 .star-item:last-child {
    margin-right: 0;
}
.star.star-24 .star-item.on {
    background-image: url("./images/star24_on@2x.png");
}

.star.star-24 .star-item.off {
    background-image: url("./images/star24_off@2x.png");
}
</style>
