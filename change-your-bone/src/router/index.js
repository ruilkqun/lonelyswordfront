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
import Permission from '../components/Permission'


Vue.use(Router)


//登录页和首页和一些不用权限的公用页面
export const constantRouterMap = [
  {
      path: '/login',
      name: 'Login',
      component: Login
  },
  {
    path: '/',
    component: Container,
    redirect: '/welcome',
    name: '首页',
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
        component: Container,
        meta: { title: '文章', icon: 'article' },
        children: [
          {
            path: 'article-classify',
            name: '分类',
            component: ArticleClassify,
            meta: { title: '分类', icon: 'article-classify' }
          },
          {
            path: 'article-notes',
            name: '小记',
            component: ArticleNote,
            meta: { title: '图表', icon: 'article-notes' }
          },
          {
            path: 'article-display',
            name: '展示',
            component: Container,
            meta: { title: '展示', icon: 'article-display' },
            children: [
            {
              path: 'article-list',
              name: '文章列表',
              component: ArticleList,
              meta: { title: '文章列表', icon: 'article-list' }
            },
            {
              path: 'article-content',
              name: '文章内容',
              component: ArticleMarkdownDisplay,
              meta: { title: '文章内容', icon: 'article-markdown-display' }
            },
              {
              path: 'article-framework',
              name: '展示框架',
              component: ArticleFramework,
              meta: { title: '展示框架', icon: 'article-framework' }
            }]
          }
        ]
      },
    ]
  },
]



export default new Router({
  routes: constantRouterMap
});



//异步挂载的路由
//动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/permission',
    component: Container,
    name: '显示权限',
    meta: { role: ['admin_role','search_role'] }, //页面需要的权限
    children: [
      {
        path: 'index',
        component: Permission,
        name: '权限设置',
        meta: { role: ['admin_role','search_role'] }  //页面需要的权限
      },
      {
          path: 'user',
          name: '用户',
          component: User,
          meta: { title: '用户管理', icon: 'user', roles: ["admin_role"] }
        }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];
