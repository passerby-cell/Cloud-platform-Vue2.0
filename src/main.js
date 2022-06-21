import Vue from 'vue'
import App from './App.vue'
import store from '@/store/index'
import VueRouter from 'vue-router'
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