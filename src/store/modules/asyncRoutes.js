import  {constantRoutes, asyncRoutes}  from '@/router/index.js'

//  将后端传过来的路由表和定义的路由表想匹配
function hasPermission(route, roles) {
  if (route.path) {
    console.log(roles)
    console.log(route.path.substr(1))
    const routepath = route.path.substr(1)
    const allowornot = roles.include(routepath)
    console.log(allowornot)
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
      // console.log('转化前',roles)
      // console.log(route)
      // const rolesobject = JSON.parse(roles)
      // console.log(rolesobject)
      if (hasPermission(tmp, roles)) {
        
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, roles)
        }
        res.push(tmp)
        // console.log(res)
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