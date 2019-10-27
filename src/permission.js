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
                  const hasRoles = store.getters.userroles
                  if(hasRoles){
                        next({path:'/dashboard'})
                  } else{
                        try{
                              // 获取user info
                              const { roles } = await store.dispatch('user/getInfo')
                              const accessRoutes = await store.dispatch('asyncRoutes/generateRoutes', roles)
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
            console.log('not login')
            next({path:'/'})
      }
})

router.afterEach(() => {
      // finish progress bar
      NProgress.done()
    })