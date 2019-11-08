import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

/*
约定路由选项
hidden : true 设置hidden为true则该路由对应的组件不会在侧边栏显示
name: 'router-name' 在用在keep-alive来缓存页面状态
meta: {
  roles:[] 页面的权限
  title: 'title',显示在侧边栏中的名字
  icon:'' 显示在侧边栏的图标

}
*/




//所有不需要权限就能加载的路由
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/Home',
    children:[
      {
        path:'Home',
        component: () => import('@/views/home/index.vue'),
        name:'Home',
        meta:{ title:'Home', icon:'home'}

      },
      {
        path:'uutlist',
        component:() => import('@/views/uutlist/index.vue'),
        name:'uutlist',
        hidden:true
      },

    ],
   

    
  },
  
  {
    path: '/version',
    component: Layout,
    children:[
      {
        path:'',
        component: () => import('@/views/version/index.vue'),
        name:'version',
        meta:{title:'ATA Version',icon:'version'}

      },
      

    ]

  },
  
  {
    path:'/login',
    component: () => import('@/views/login/index.vue'),
    hidden:true,
  },
  
]

// 所有可能需要权限才能加载的路由
export const asyncRoutes = [
  {
    path:'/config',
    component:Layout,
    meta:{title:'Config', icon:'setting'},
    children:[
      {
        path:'suitconfig',
        component: () => import('@/views/config/suitconfig/index.vue'),
        name:'suitconfig',
        meta:{title:'Suit Config'}
        
      },
      {
        path:'atasetting',
        component: () => import('@/views/config/atasetting/index.vue'),
        name:'atasetting',
        meta:{title:'ATA Setting'}
      },
      {
        path:'firmwareconfig',
        component: () => import('@/views/config/firmwareconfig/index.vue'),
        name:'firmwareconfig',
        meta:{title:'Firmware Config'}
      },
      {
        path:'customerconfig',
        component: () => import('@/views/config/customerconfig/index.vue'),
        name:'customerconfig',
        meta:{title:'Customer Config'}
      },
      {
        path:'fixtureconfig',
        component: () => import('@/views/config/fixtureconfig/index.vue'),
        name:'fixtureconfig',
        meta:{title:'Fixture Config'}
      },
      {
        path:'hardwareconfig',
        component: () => import('@/views/config/hardwareconfig/index.vue'),
        name:'hardwareconfig',
        meta:{title:'Hardware Config'}
      },
      {
        path:'monitorconfig',
        component: () => import('@/views/config/monitorconfig/index.vue'),
        name:'monitorconfig',
        meta:{title:'Monitor Config'}
      },
      {
        path:'uutbootupconfig',
        component:() => import('@/views/config/uutbootupconfig/index.vue'),
        name:'uutbootupconfig',
        meta:{title:'UUT BootUP Config'}
      },
      {
        path:'location',
        component: ()=> import('@/views/config/location/index.vue'),
        name:'location',
        meta:{title:'Location'}
      },
      {
        path:'memoryslot',
        component: ()=> import('@/views/config/memoryslot/index.vue'),
        name:'memoryslot',
        meta:{title:'Memory Slot'}
      }

      
    ]
  },
  {
    path:'/query',
    component: Layout,
    meta:{title:'Query',icon:'query'},
    children:[
      {
        path:'bomquery',
        component: () => import('@/views/query/bomquery/index.vue'),
        name:'bomquery',
        meta:{title:'Bom Query'}
      },
      {
        path:'macquery',
        component: () => import('@/views/query/macquery/index.vue'),
        name:'macquery',
        meta:{title:'Mac Query'}
      },
      {
        path:'snquery',
        component: () => import('@/views/query/snquery/index.vue'),
        name:'snquery',
        meta:{title:'Sn Query'}
      },
      {
        path:'sqlquery',
        component: () => import('@/views/query/sqlquery/index.vue'),
        name:'sqlquery',
        meta:{title:'SQL Query'}
      },
      {
        path:'logquery',
        component: () => import('@/views/query/logquery/index.vue'),
        name:'logquery',
        meta:{title:'Log Query'}
      },
    ]
  },
  {
    path:'/utilities',
    component:Layout,
    name:'utilities',
    meta:{title:'Utilities',icon:'spanner'}
  },
  {
    path:'/permission',
    component:Layout,
    
    meta:{title:'Permission',icon:'permission'},
    children:[{
      path:'',
      component: () => import('@/views/permission/index.vue'),
      meta:{title:'Permission'}
    }]
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL, 
  routes:constantRoutes
})

export function resetRouter() {
  const newRouter = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL, 
    routes:constantRoutes
  })
  router.matcher = newRouter.matcher // reset router
}

export default router

