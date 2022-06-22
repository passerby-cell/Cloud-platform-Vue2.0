//示例:user组件的仓库
import {
  reqJobList,
  //从api模块中引入请求  
} from '@/api'
//准备actions,用于响应组件中的动作
const actions = {
  //通过api里面的接口函数发送请求,获取服务器的数据
  async getJobList({
    commit
  }, {
    token,
    userid,
    pagenum,
    pagesize
  }) {
    let result = await reqJobList(token, userid, pagenum, pagesize)
    if (result.code === 200) {
      commit('JOBLIST', result.data.rows)
      commit('PAGENUM', result.data.pagenum)
      commit('PAGESIZE', result.data.pagesize)
      commit('TOTALPAGE', result.data.totalpage)
    }
  },
}
//准备mutations,用于操作数据--state
const mutations = {
  JOBLIST(state, joblist) {
    state.joblist = joblist
  },
  PAGENUM(state, pagenum) {
    state.pagenum = pagenum
  },
  PAGESIZE(state, pagesize) {
    state.pagesize = pagesize
  },
  TOTALPAGE(state, totalpage) {
    state.totalpage = totalpage
  },
}
//准备state,用于存储数据,要先准备仓库categoryList,才能存储数据
const state = {
  joblist: [],
  pagesize: '',
  pagenum: '',
  totalpage: '',
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