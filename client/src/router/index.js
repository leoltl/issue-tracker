import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login.vue'
import Projects from '@/views/Projects.vue'
import Project from '@/views/Project.vue'
import Ticket from '@/views/Ticket.vue'
import PageNotFound from '@/views/PageNotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    name: 'Home',
    path: '/', redirect: '/projects'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { isFullScreen: true }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
    meta: { restricted: true },
  },
  {
    path: '/projects/:projectId',
    meta: { restricted: true },
    component: Projects,
    children: [
      { name: 'Project', path: "", component: Project } 
    ],
  },
  {
    path: '/tickets/:ticketId',
    name: "Ticket",
    meta: { restricted: true },
    component: Ticket
  },
  {
    path: '*',
    name: "NotFound",
    component: PageNotFound,
    meta: { isFullScreen: true }
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router
