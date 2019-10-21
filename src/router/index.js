import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

const constroutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children:[
      {
        path:'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name:'dashboard'
      }
    ]

    
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL, 
  routes:constroutes
})

export default router
