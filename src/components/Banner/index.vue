<!-- 公用组件轮播图  需接收props:list-->
<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="banner in list" :key="banner.id">
        <img :src="banner.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'Banner',
  data() {
    return {}
  },
  props: ['list'],
  methods: {},
  //监视属性+生命周期函数 $nextTick 解决轮播图问题
  watch: {
    list: {
      // 立即监听,否则floor组件的轮播图不会变化,因为floor组件的轮播图的数据是floor组件给的
      immediate: true,
      handler() {
        this.$nextTick(function () {
          new Swiper(this.$refs.mySwiper, {
            direction: 'horizontal', // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },

            // 如果需要滚动条
            scrollbar: {
              el: '.swiper-scrollbar',
            },
          })
        })
      },
    },
  },
}
</script>

<style scoped>
</style>
