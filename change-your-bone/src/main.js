// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/scss/font-awesome.scss'
import '@/styles/index.scss'
import './icons'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import store from './store'
import { filterAsyncRoutes } from './utils/asyncRouter'



Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.config.productionTip = false

router.beforeEach(async (to, from, next) => {
  const jwt = sessionStorage.getItem('jwt')
  if (jwt) {
    if (to.path === '/login') {
      window.sessionStorage.removeItem('jwt')
      next()
    } else {
      // 从store中获取用户角色
      // const hasRoles = store.getters.roles && store.getters.roles.length() > 0
      const hasRoles = false
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户角色
          const roles = await store.state.roles
          // 通过用户角色 获取到角色路由表
          const accessRoutes = filterAsyncRoutes(await store.state.routers,roles)
          // 动态 添加 路由 到 router中
          router.addRoutes(accessRoutes)
          next()
          // next({...to, replace:true})
        } catch (error) {
            window.sessionStorage.removeItem('jwt')
            next()
        }
      }
    }
  }else {
    next({
      path: '/login'
    })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
