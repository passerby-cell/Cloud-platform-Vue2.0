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