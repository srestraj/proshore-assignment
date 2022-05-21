import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import User from '../components/User.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if(!store.state.login.isAuthenticated) {
        return next({ name: 'login' })
      }
      next()
    },
    meta: {
      title: 'Home',
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if(store.state.login.isAuthenticated) {
        return next({ name: 'home' })
      }
      next()
    },
    meta: {
      title: 'Login Page'
    }
  },
  {
    path: '/user/:id',
    name: 'user',
    component: User,
    beforeEnter: (to, from, next) => {
      if(!store.state.login.isAuthenticated) {
        return next({ name: 'login' })
      }
      next()
    },
    meta: {
      title: 'Edit User',
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`
  next()
})
export default router