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





export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children:[
      {
        path:'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name:'dashboard',
        meta:{ title:'dashboard', icon:'email'}

      },
      

    ]

    
  },
  {
    path: '/version',
    component: Layout,
    redirect: '/version',
    children:[
      {
        path:'version',
        component: () => import('@/views/version/index.vue'),
        name:'version',
        meta:{title:'version',icon:'email'}

      },
      

    ]

  },
  {
    path:'/config',
    component:Layout,
    meta:{title:'Config'},
    children:[
      {
        path:'suitconfig',
        component: () => import('@/views/suitconfig/index.vue'),
        name:'suitconfig',
        meta:{title:'suitconfig'}
      },
      {
        path:'atasetting',
        component: () => import('@/views/atasetting/index.vue'),
        name:'atasetting',
        meta:{title:'atasetting'}
      },
      {
        path:'firmwareconfig',
        component: () => import('@/views/firmwareconfig/index.vue'),
        name:'firmwareconfig',
        meta:{title:'firmwareconfig'}
      },
      {
        path:'customerconfig',
        component: () => import('@/views/customerconfig/index.vue'),
        name:'customerconfig',
        meta:{title:'customerconfig'}
      },
      {
        path:'fixtureconfig',
        component: () => import('@/views/fixtureconfig/index.vue'),
        name:'fixtureconfig',
        meta:{title:'fixtureconfig'}
      },
      {
        path:'hardwareconfig',
        component: () => import('@/views/hardwareconfig/index.vue'),
        name:'hardwareconfig',
        meta:{title:'hardwareconfig'}
      },
      {
        path:'monitorconfig',
        component: () => import('@/views/monitorconfig/index.vue'),
        name:'monitorconfig',
        meta:{title:'monitorconfig'}
      },
      {
        path:'uutlist',
        component: () => import('@/views/uutlist/index.vue'),
        name: 'uutlist',
        meta:{title:'uutlist'}
      }
    ]
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL, 
  routes:constantRoutes
})

export default router

