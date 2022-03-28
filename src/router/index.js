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
    path: '/test',
    name: 'test',
    component: () => import('../views/adminSystem/test.vue')
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
        path: '/sortData',
        name: 'SortData',
        component: () => import('../views/adminSystem/SortData.vue')
      },
      {
        path: '/sortData/:sortId/SecondLevel',
        name: 'SecondSortItem',
        component: () => import('../views/adminSystem/SecondSortItem.vue')
      },
      {
        path: '/science',
        name: 'Science',
        component: () => import('../views/adminSystem/Science.vue')
      },
      {
        path: '/videoData',
        name: 'VideoData',
        component: () => import('../views/adminSystem/VideoData.vue')
      },
      {
        path: '/videoData/Publish',
        name: 'VideoPublish',
        component: () => import('../views/adminSystem/VideoPublish.vue')
      },
      {
        path: '/videoData/video',
        name: 'videoPlayer',
        component: () => import('../views/adminSystem/VideoPlayer.vue')
      },
      {
        path: '/userData',
        name: 'UserData',
        component: () => import('../views/adminSystem/UserData.vue')
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
