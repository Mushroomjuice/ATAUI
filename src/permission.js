import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getpagetitle from '@/utils/page-title'

NProgress.configure({ showSpinner: true }) // NProgress Configuration 页面切换时的进度条

router.beforeEach(async(to,from,next) => {
      NProgress.start()
      // set page title 设置页面title
      document.title = getpagetitle(to.meta.title)
      //从cookie获取token
      const hasToken=getToken()
      if(hasToken) {
            if(to.path === '/login') {
                  next({path:'/home'})
                  NProgress.done()
            }else{
                  const hasRoles = store.getters.roles
                  // console.log(hasRoles)
                  if(hasRoles != null){
                        next()
                  } else {
                        try{
                              // 获取user info
                              
                              const { roles } = await store.dispatch('user/getInfo')
                              
                              const accessRoutes = await store.dispatch('asyncRoutes/generateRoutes', roles)
                              
                              router.addRoutes(accessRoutes)
                              
                              next({ ...to, replace: true })   //不让返回到登录界面 后期如果要添加跳转带参数的路由可以用 ...to (扩展运算符)
                              NProgress.done()
                        } catch (error) {
                              Message.error(error || 'Has Error')
                             
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