//引入路由的组件
import Login from '@/pages/Login'
import Job from '@/pages/Job'
import Data from '@/pages/Data'
import Images from '@/pages/Images'
import Register from '@/pages/Register'
import StandardJob from '@/pages/StandardJob'
export default [
  // ?:用于指定params参数可传可不传,没有问号时,不传params参数时路径会出现丢失的情况
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: {
      show: false,

    }
  },
  {
    name: 'standardjob',
    path: '/standardjob',
    component: StandardJob,
    meta: {
      show: true,
      requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
    }
  },
  {
    name: 'register',
    path: '/register',
    component: Register,
    meta: {
      show: false,
    }
  },
  {
    name: 'job',
    path: '/job',
    component: Job,
    meta: {
      show: true,
      requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
    }
  },
  {
    name: 'images',
    path: '/images',
    component: Images,
    meta: {
      show: true,
      requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
    }
  },
  {
    name: 'data',
    path: '/data',
    component: Data,
    meta: {
      show: true,
      requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
    }
  },
  {
    path: '/*',
    redirect: '/login'
  }
]