import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'


Vue.use(VueRouter)

let orginalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    orginalPush.call(this, location, resolve, reject)
  } else {
    orginalPush.call(this, location, () => {}, () => {})
  }
}

let orginalReplace = VueRouter.prototype.Replace;

VueRouter.prototype.Replace = function (location, resolve, reject) {
  if (resolve && reject) {
    orginalReplace.call(this, location, resolve, reject)
  } else {
    orginalReplace.call(this, location, () => {}, () => {})
  }
}

export default new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return {
      y: 0
    }
  },

})