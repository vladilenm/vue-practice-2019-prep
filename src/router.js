import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {layout: 'empty'},
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: {layout: 'empty'},
      component: () => import('./views/Register.vue')
    },
    {
      path: '/',
      name: 'home',
      meta: {auth: true, layout: 'main'},
      component: () => import('./views/Home.vue')
    },
    {
      path: '/history',
      name: 'history',
      meta: {auth: true, layout: 'main'},
      component: () => import('./views/History.vue')
    },
    {
      path: '/record/:id',
      name: 'detail-record',
      meta: {auth: true, layout: 'main'},
      component: () => import('./views/DetailRecord.vue')
    },
    {
      path: '/planning',
      name: 'planning',
      meta: {auth: true, layout: 'main'},
      component: () => import('./views/Planning.vue')
    },
    {
      path: '/record',
      name: 'record',
      meta: {auth: true, layout: 'main'},
      component: () => import('./views/Record.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {auth: true, layout: 'main'},
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      meta: {auth: true, layout: 'main'},
      component: () => import('./views/Categories.vue')
    },
    {
      path: '*',
      meta: {layout: 'empty'},
      component: () => import('./views/Error.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
