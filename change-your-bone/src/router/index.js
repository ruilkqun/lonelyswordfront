import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '../views/login/login'
import Container from '../container/Container'
import Dashboard from '../views/dashboard/index'
import USDT from '../views/usdt/index'

import Welcome from '../views/welcome/welcome'

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
        { path: 'dashboard', name: '首页', component: Dashboard,
          children: [
            { path: 'dashboard2', name: '首页2', component: Dashboard,
              children: [
                { path: 'dashboard21', name: '首页21', component: Dashboard,},
              ]
            },
          ]
        },
        { path: 'usdt', name: '小记', component: USDT },
        { path: 'welcome', name: '欢迎', component: Welcome  }
      ]
    },
  ]
})
