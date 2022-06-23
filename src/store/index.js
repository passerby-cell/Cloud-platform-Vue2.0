import Vue from 'vue'
import Vuex from 'vuex'
//引入各存储模块
import Job from './job'
import File from './file'

Vue.use(Vuex)

//创建并暴露store
export default new Vuex.Store({
  modules: {
    Job,
    File,
  }
})