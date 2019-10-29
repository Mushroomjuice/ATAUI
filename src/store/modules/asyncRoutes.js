import  {constantRoutes, asyncRoutes}  from '@/router/index.js'

//  将后端传过来的路由表和定义的路由表想匹配
function hasPermission(route, roles) {
  if (route.path) {
    //将path中的'/'去掉
    const routepath = route.path.substr(1)
    const allowornot = roles.includes(routepath)
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
    routes: [],
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