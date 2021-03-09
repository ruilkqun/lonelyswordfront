import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '../views/login/login'
import Container from '../container/Container'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: Container,
      component: Container
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
