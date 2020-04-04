import Vue from 'vue';
import Vuex from 'vuex';
import { Message } from 'element-ui';
import { sync } from 'vuex-router-sync'
import router from '@/router'
import APIrequest from '@/request';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
    projects: []
  },
  getters: {
    isAuthenticated(state) {
      return state.user != null 
    }
  },
  mutations: {
    setCurrentUser(state, user) {
      state.user = user;
    },
    setProjects(state, projects) {
      state.projects = projects;
    }
  },
  actions: {
    async checkAuth({ commit }) {
      console.log('checking auth');
      
      const { data } = await APIrequest('/me')
      const user = JSON.parse(data)
      if (Object.keys(user).length) {
        commit('setCurrentUser', user)
      }
    },
    signinSuccess({ commit }, user) {
      commit('setCurrentUser', user);
      this.dispatch('pushRouter', { name: 'Home' })
    },
    signupSuccess({ commit }, user) {
      commit('setCurrentUser', user);
      this.dispatch('pushRouter', { name: 'Home' })
    },
    signupFailed(_,actionName) {
      Message({
        message: `${actionName} Failed. Please try again.`,
        type: 'warning',
        showClose: true,
      })
    },
    signinFailed(_,actionName) {
      Message({
        message: `${actionName} Failed. Please try again.`,
        type: 'warning',
        showClose: true,
      })
    },
    pushRouter(_, path) {
      router.push(path);
    },
    goRouter(_, path) {
      router.go(path);
    },
    async getAllProjects({ commit }) {
      const { data } = await APIrequest('/projects');
      commit('setProjects', data)
    }
  }
})

sync(store, router)

export default store;