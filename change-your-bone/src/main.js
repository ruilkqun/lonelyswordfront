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
import store from './store/index'

Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const jwt = sessionStorage.getItem('jwt')
  if (jwt) {
    if (to.path === '/login') {
      window.sessionStorage.removeItem('jwt')
      window.sessionStorage.removeItem('role')
      store.getters.routers = []
      next()
    } else {
      const r = sessionStorage.getItem('role')
      if (!r) {
        next()
      } else {
        let roles = []
        for (let v = 0; v < r.split(',').length; v++) {
          roles.push(r.split(',')[v])
        }
        // window.sessionStorage.setItem('role', 'admin_role')
        // const userRole = ["admin_role1"]
        store.dispatch('GenerateRoutes', roles).then(() => {
          const newRouter = store.getters.routers
          // alert(newRouter[1]['children'])
          // alert(newRouter[0]['path'])
          router.addRoutes(newRouter)
          // next()

          sessionStorage.removeItem('role')
          next({...to, replace: true})
        })
      }
    }
  } else if (to.path !== '/login') {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
