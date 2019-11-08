import store from '@/store'
// import router from '@/router'
export default function checkButtonPermission(pagename,value) {
    //获取当前路由地址，去store中匹配该地址是否有value权限
    
    const roles = store.getters && store.getters.roles
    if(roles!=null){
        try {
            const permission = roles[pagename]
            const haspermission = permission.includes(value)
            if (!haspermission) {
                return false
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    // const currentpath = this.$route.path
    return true

}