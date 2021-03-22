import {asyncRouterMap, constantRouterMap} from "../../router";


function filterAsyncRouter(asyncRouterMap, roles) { //传入两个参数，路由和角色
  return asyncRouterMap.filter(route => {
      if (hasPermission(roles, route)) { //若得到true，执行下一步
        if (route.children && route.children.length) { //判断是否存在子路由
          route.children = filterAsyncRouter(route.children, roles) //对子路由进行过滤
        }
        return true
      }
      return false
    })
}

function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) { //需要角色的路由
        return roles.some(role => route.meta.roles.includes(role) === true) //存在该角色，返回true，否则返回false
    } else {
        return true
    }
}


const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    roles: [],
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      if (routers === asyncRouterMap) {
        constantRouterMap[1]['children'].push(routers[0]);
        state.routers = constantRouterMap;
      } else {
        state.routers = constantRouterMap.concat(routers);
      }
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const roles = data;
        let accessedRouters
        if (roles.includes('admin_role') === true){
          accessedRouters = asyncRouterMap
        }else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      })
    }
  }
}

export default permission
