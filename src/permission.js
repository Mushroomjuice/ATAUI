import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie


NProgress.configure({ showSpinner: false }) // NProgress Configuration



router.beforeEach(async(to,from,next) => {
      NProgress.start()
      const hasToken=getToken()
      if(hasToken) {
            if(to.path === '/login') {
                  next({path:'/dashboard'})
                  NProgress.done()
            }else{
                  const hasRoles = store.getters.roles
                  if(hasRoles.lenght>0){

                        next()
                  } else {
                        try{
                              // 获取user info
                              const { roles } = await store.dispatch('user/getInfo')
                              
                              const accessRoutes = await store.dispatch('asyncRoutes/generateRoutes', roles)
                              console.log('11111', accessRoutes)
                              router.addRoutes(accessRoutes)
                              next({path:'/'})
                              NProgress.done()
                        } catch (error) {
                              // Message.error(error || 'Has Error')
                              NProgress.done()
                        }
                  }
            }
      } else {
            //如果没有登录，则跳转到首页，显示默认路由
            console.log('not login')
            next()
            NProgress.done()
      }
})

router.afterEach(() => {
      // finish progress bar
      NProgress.done()
    })