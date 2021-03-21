import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '../views/login/login'
import Container from '../container/Container'
// import Dashboard from '../views/dashboard/index'
import ArticleClassify from '../views/article/classify'
import ArticleNote from '../views/article/note'
import ArticleList from '../views/article/list'
import ArticleMarkdownDisplay from '../views/article/markdown'
import ArticleFramework from '../views/article/framework'

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
          meta: { title: '欢迎', icon: 'welcome', roles: ["admin_role","add_role","delete_role","change_role","delete_role","visitor_role"] }
        },
        {
          path: 'plan',
          name: '计划',
          component: Container,
          meta: { title: '计划', icon: 'plan', roles: ["admin_role","add_role","delete_role","change_role","delete_role","visitor_role"] },
          children: [
            {
              path: 'plan-list',
              name: '清单',
              component: PlanList,
              meta: { title: '清单', icon: 'plan-list', roles: ["admin_role","add_role","delete_role","change_role","delete_role","visitor_role"] }
            },
            {
              path: 'plan-charts',
              name: '图表',
              component: PlanCharts,
              meta: { title: '图表', icon: 'plan-charts', roles: ["admin_role","add_role","delete_role","change_role","delete_role","visitor_role"] }
            }
          ]
        },
        {
          path: 'article',
          name: '文章',
          component: Container,
          meta: { title: '文章', icon: 'article', roles: ["admin_role","add_role","delete_role","change_role","delete_role","visitor_role"] },
          children: [
            {
              path: 'article-classify',
              name: '分类',
              component: ArticleClassify,
              meta: { title: '分类', icon: 'article-classify', roles: ["admin_role","add_role","delete_role","change_role","delete_role","visitor_role"] }
            },
            {
              path: 'article-notes',
              name: '小记',
              component: ArticleNote,
              meta: { title: '图表', icon: 'article-notes', roles: ["admin_role","add_role","delete_role","change_role","delete_role","visitor_role"] }
            },
            {
              path: 'article-display',
              name: '展示',
              component: Container,
              meta: { title: '展示', icon: 'article-display', roles: ["admin_role","add_role","delete_role","change_role","delete_role","visitor_role"] },
              children: [
              {
                path: 'article-list',
                name: '文章列表',
                component: ArticleList,
                meta: { title: '文章列表', icon: 'article-list', roles: ["admin_role","add_role","delete_role","change_role","delete_role","visitor_role"] }
              },
              {
                path: 'article-content',
                name: '文章内容',
                component: ArticleMarkdownDisplay,
                meta: { title: '文章内容', icon: 'article-markdown-display', roles: ["admin_role","add_role","delete_role","change_role","delete_role","visitor_role"] }
              },
                {
                path: 'article-framework',
                name: '展示框架',
                component: ArticleFramework,
                meta: { title: '展示框架', icon: 'article-framework', roles: ["admin_role","add_role","delete_role","change_role","delete_role","visitor_role"] }
              }]
            }
          ]
        },
        {
          path: 'user',
          name: '用户',
          component: User,
          meta: { title: '用户管理', icon: 'user', roles: ["admin_role"] }
        }
      ]
    }
  ]
})
