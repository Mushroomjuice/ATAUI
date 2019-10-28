import  {constantRoutes}  from '@/router/index.js'

//  将后端传过来的路由表和定义的路由表想匹配
function hasPermission(roles, route) {
  // 
    if (route.path) {
      function(roles){
        
      }


      
      roles.forEach(role => {
        const PMrole = {...role}
        if (PMrole.path){
          console.log()
        }
      })
      return roleskeywords.some(role => route.path.includes(role))
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
      
      // const rolesobject = JSON.parse(roles)
      // console.log(rolesobject)
      if (hasPermission(roles, tmp)) {
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
    // roles   {config:['atasetting','suitconfig']}
    generateRoutes({ commit }, roles) {
      return new Promise(resolve => {
        let accessedRoutes=[]
        // 将roles中提供的路由和asyncRoutes中的路由匹配
        // if (roles.includes('admin')) {
        //   accessedRoutes = asyncRoutes || []
        // } else {
        //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        // }
        if (roles) {
          console.log(roles)
          // console.log(accessedRoutes)
        }
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