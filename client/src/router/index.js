import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import PageNotFound from '@/components/PageNotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Dashboard,
    meta: { restricted: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '*',
    name: "NotFound",
    component: PageNotFound,
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router
