import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/profile',
    name: 'profile',

    component: () => import('../views/Profile.vue')
  },
  {
    path: '/login',
    name: 'login',

    component: () => import( '../views/Login.vue')
  },

  {
    path: '/AdminPanel',
    name: 'AdminPanel',
    component: () => import( '../views/AdminPanel.vue')
  },
  {
    path:'/UserEdit/:id',
    name:'UserEdit',
    component:()=>import('../views/UserEdit.vue')
  },

  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
