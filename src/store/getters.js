const getters = {
    
    // roles: state => state.user.roles,
    permission_routes: state => state.asyncRoutes.routes,
    username:state => state.user.name,
    userroles:state => state.user.roles,

  }
export default getters