import Vue from 'vue'
import Vuex from 'vuex'
import asyncRouterMap from '../router'
Vue.use(Vuex)



export default new Vuex.Store({
  // 创建对象 保存应用 启动时的初始状态
  state: {
    roles: ["admin_role"],
    routers: asyncRouterMap
  },
  // getters: {
  //   roles: ["admin_role"]
  // }
})
