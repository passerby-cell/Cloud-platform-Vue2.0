//示例:user组件的仓库
import {
  reqUserLogin,
  //从api模块中引入请求  
} from '@/api'
//准备actions,用于响应组件中的动作
const actions = {
  //通过api里面的接口函数发送请求,获取服务器的数据
  async userLogin({
    commit
  }, user) {
    let result = await reqUserLogin(user)
    if (result.code === 200) {
      commit('USERLOGIN', result.data)
      commit('TOKEN', result.token)
    }
  },
}
//准备mutations,用于操作数据--state
const mutations = {
  USERLOGIN(state, user) {
    state.user = user
  },
  TOKEN(state, token) {
    state.token = token
  }
}
//准备state,用于存储数据,要先准备仓库categoryList,才能存储数据
const state = {
  user: {},
  token: '',
}

//用于简化数据
const getters = {}

//创建并暴露store
export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
}