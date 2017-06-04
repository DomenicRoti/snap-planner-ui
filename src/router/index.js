import Vue from 'vue'
import Router from 'vue-router'
import Events from '@/components/Events'
import Login from '@/components/Login'

Vue.use(Router)

function requireAuth (to, from, next) {
  if (window.localStorage.getItem('auth') === 'true') {
    next()
  } else {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
}

const routes = [
  {
    path: '/',
    name: 'Events',
    component: Events,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (!to.query.redirect) {
        to.query.redirect = from.path
      } else {
        to.query.fromAuth = true
      }
      next()
    }
  }
]

let router = new Router({
  routes, // short for routes: routes
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
