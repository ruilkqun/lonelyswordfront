import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '../views/login/login'
import Container from '../container/Container'
import Dashboard from '../views/dashboard/index'
import USDT from '../views/usdt/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: '/dashboard',
      name: Container,
      component: Container,
      children: [
        { path: 'dashboard', name: '首页', component: Dashboard },
        { path: 'usdt', name: '小记', component: USDT },
      ]
    }
  ]
})
