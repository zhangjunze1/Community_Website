import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/system'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/system',
    name: 'System',
    component: () => import('../views/System.vue')
  },
  {
    path: '/invite',
    name: 'Invite',
    component: () => import('../views/me/invite.vue')
  },
  {
    path: '/adminlogin',
    name: 'AdminLogin',
    component: () => import('../views/AdminLogin.vue')
  },
  {
    path: '/dataQuery',
    name: 'dataQuery',
    component: () => import('../views/showSystem/dataQuery.vue')
  },
  {
    path: '/dataCharts',
    name: 'dataCharts',
    component: () => import('../views/showSystem/dataCharts.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  },
  {
    path: '/adminMain',
    name: 'AdminMain',
    component: () => import('../views/adminSystem/adminMain.vue'),
    children: [
      {
        path: '/host',
        name: 'Host',
        component: () => import('../views/adminSystem/Host.vue')
      },
      {
        path: '/data',
        name: 'Data',
        component: () => import('../views/adminSystem/Data.vue')
      },
      {
        path: '/science',
        name: 'Science',
        component: () => import('../views/adminSystem/Science.vue')
      },
      {
        path: '/invitationCode',
        name: 'InvitationCode',
        component: () => import('../views/adminSystem/InvitationCode.vue')
      },
      {
        path: '/showCode',
        name: 'ShowCode',
        component: () => import('../views/adminSystem/ShowCode.vue')
      }]
  }
]

const router = new VueRouter({
  routes
})

export default router
