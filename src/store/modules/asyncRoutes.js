import  {constantRoutes, asyncRoutes}  from '@/router/index.js'

//  将后端传过来的路由表和定义的路由表想匹配
function hasPermission(route, roles) {
  if (route.path) {
    //将path中的'/'去掉
    // const routepath = route.path.substr(1)
    //判断该路由在不在可访问路由里面 startsWith()可能有浏览器兼容性问题
    const generalpath = route.path.startsWith('/') ? route.path.substr(1) : route.path
    const allowornot = roles.includes(generalpath)
    // console.log(allowornot)
    return allowornot
  } else {
    return true
  }
}
  /**
   * Filter asynchronous routing tables by recursion
   * @param routes asyncRoutes
   * @param roles
   */
  export function filterAsyncRoutes(routes, roles) {
    const res = []
  
    routes.forEach(route => {
      const tmp = { ...route }
      
      if (hasPermission(tmp, roles)) {
        
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, roles)
        }
        res.push(tmp)
        
      }
    })
    
    return res
  }



const state = {
    routes: constantRoutes,
    addRoutes: []
  }


const mutations = {
SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
}
}


const actions = {
    // roles: ['config','atasetting','suitconfig']
    generateRoutes({ commit }, roles) {
      return new Promise(resolve => {
        let accessedRoutes
        // 将roles中提供的路由和asyncRoutes中的路由匹配
        
        accessedRoutes = filterAsyncRoutes(asyncRoutes,roles)
        console.log(accessedRoutes)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }