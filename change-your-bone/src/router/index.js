import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '../views/login/login'
import Container from '../container/Container'
// import Dashboard from '../views/dashboard/index'
import Article from '../views/article/classify'

import Welcome from '../views/welcome/welcome'

import User from '../views/user/user'

import PlanList from '../views/plan/list'
import PlanCharts from '../views/plan/charts'

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
          path: 'plan',
          name: '计划',
          component: Container,
          meta: { title: '计划', icon: 'plan' },
          children: [
            {
              path: 'plan-list',
              name: '清单',
              component: PlanList,
              meta: { title: '清单', icon: 'plan-list' }
            },
            {
              path: 'plan-charts',
              name: '图表',
              component: PlanCharts,
              meta: { title: '图表', icon: 'plan-charts' }
            }
          ]
        },
        {
          path: 'article',
          name: '文章',
          component: Article,
          meta: { title: '文章', icon: 'article' },
          children: [
            {
              path: 'article-classify',
              name: '分类',
              component: PlanList,
              meta: { title: '分类', icon: 'classify' }
            },
            {
              path: 'article-notes',
              name: '小记',
              component: Container,
              meta: { title: '图表', icon: 'notes' },

            }
          ]
        },
        {
          path: 'user',
          name: '用户',
          component: User,
          meta: { title: '用户管理', icon: 'user' }
        }
      ]
    }
  ]
})
