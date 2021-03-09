// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
// import '@/styles/index.scss'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/scss/font-awesome.scss'


Vue.use(ElementUI)
Vue.config.productionTip = false


router.beforeEach((to, from, next ) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('user');
  }
  const user = sessionStorage.getItem('user');
  if (!user && to.path !== '/login') {
    next({
      path: '/login'
    })
  } else {
    next();
  }
} )


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
