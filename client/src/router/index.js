import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import PageNotFound from '@/components/PageNotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
      path: '*',
      name: "NotFound",
      component: PageNotFound
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router
