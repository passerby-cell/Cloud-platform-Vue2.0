//引入路由的组件
import Home from '@/pages/Home'

export default [{
    // ?:用于指定params参数可传可不传,没有问号时,不传params参数时路径会出现丢失的情况
    path: '/home/:keyword?',
    component: Home,
    meta: {
      // 通过路由元信息携带参数
      showFooter: true,
    }
  },
  //重定向到home
  {
    path: '*',
    redirect: '/home'
  },
]