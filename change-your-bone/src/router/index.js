import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '../views/login/login'
import Container from '../container/Container'
import Dashboard from '../views/dashboard/index'
import USDT from '../views/usdt/index'

import Welcome from '../views/welcome/welcome'

import User from '../views/user/user'

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
      redirect: '/welcome',
      name: Container,
      component: Container,
      children: [
        {
          path: 'welcome',
          name: '欢迎',
          component: Welcome,
          meta: { title: '欢迎', icon: 'welcome' }
        },
        {
          path: 'user',
          name: '用户',
          component: User,
          meta: { title: '用户管理', icon: 'user' }
        },
        {
          path: 'usdt',
          name: '小记',
          component: USDT,
          meta: { title: '欢迎', icon: 'welcome' }
        },
        {
          path: 'dashboard',
          name: '首页',
          component: Dashboard,
          meta: { title: '欢迎', icon: 'welcome' },
          children: [
            {
              path: 'dashboard2',
              name: '首页2',
              component: Dashboard,
              meta: { title: '欢迎', icon: 'welcome' },
              children: [
                {
                  path: 'dashboard21',
                  name: '首页21',
                  component: Dashboard,
                  meta: { title: '欢迎', icon: 'welcome' }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})
