//对api进行统一的管理
import apirequest from './apiAjax'
import mockrequest from './mockAjax'

// 接口示例
// // 普通用户登录接口
export const reqUserLogin = (user) => apirequest({
  url: '/user/login',
  method: 'GET',
  params: {
    username: user.username,
    password: user.password,
  }
})

export const reqUserRegist = (user) => apirequest({
  url: '/user/regist',
  method: 'GET',
  params: {
    username: user.username,
    password: user.password,
  }
})

export const reqJobList = (token, userid, pagenum, pagesize) => apirequest({
  url: '/job/getjoblist',
  method: 'GET',
  params: {
    token,
    userid,
    pagenum,
    pagesize,
  }
})

export const reqPauseJob = (token, id) => apirequest({
  url: '/job/pausejob',
  method: 'GET',
  params: {
    token,
    id,
  }
})

export const reqStartJob = (token, id) => apirequest({
  url: '/job/startjob',
  method: 'GET',
  params: {
    token,
    id,
  }
})