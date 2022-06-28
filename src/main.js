import Vue from 'vue'
import App from './App.vue'
import store from '@/store/index'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'animate.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入mock模块
import './mock/mockServer.js'
//引入swiper样式
import 'swiper/css/swiper.css'


import router from '@/router'


Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.use(VueAxios, axios) // 使用 axios 插件

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
  if ((to.name === 'login') && localStorage.getItem('token')) {
    next({
      path: '/job',
    })
  }
  next()
})


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')