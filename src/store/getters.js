const getters = {
    
    // roles: state => state.user.roles,
    permission_routes: state => state.asyncRoutes.routes,
    username:state => state.user.name,
    roles:state => state.user.roles,
    token:state => state.user.token

  }
export default getters