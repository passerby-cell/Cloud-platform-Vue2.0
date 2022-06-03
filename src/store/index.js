import Vue from 'vue'
import Vuex from 'vuex'
//引入各存储模块
import home from './home'

Vue.use(Vuex)

//创建并暴露store
export default new Vuex.Store({
  modules: {
    home,
  }
})