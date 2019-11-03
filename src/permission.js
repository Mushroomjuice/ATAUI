import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie


NProgress.configure({ showSpinner: true }) // NProgress Configuration



router.beforeEach(async(to,from,next) => {
      NProgress.start()
      const hasToken=getToken()
      if(hasToken) {
            if(to.path === '/login') {
                  next({path:'/home'})
                  NProgress.done()
            }else{
                  const hasRoles = store.getters.roles && store.getters.roles.length > 0
                  if(hasRoles){
                        console.log('获取roles之后')
                        next()
                  } else {
                        try{
                              // 获取user info
                              console.log('正在获取roles')
                              const { roles } = await store.dispatch('user/getInfo')
                              console.log('已经获取roles')
                              const accessRoutes = await store.dispatch('asyncRoutes/generateRoutes', roles)
                              console.log('11111', accessRoutes)
                              router.addRoutes(accessRoutes)
                              next({ ...to, replace: true })
                              NProgress.done()
                        } catch (error) {
                              // Message.error(error || 'Has Error')
                              NProgress.done()
                        }
                  }
            }
      } else {
                  next()
            NProgress.done()
            // }
            
      }
})

router.afterEach(() => {
      // finish progress bar
      NProgress.done()
    })