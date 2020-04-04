import Vue from 'vue';
import Vuex from 'vuex';
import { Message } from 'element-ui';
import { sync } from 'vuex-router-sync'
import router from '@/router'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
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
  },
  actions: {
    signinSuccess({ commit }, user) {
      commit('setCurrentUser', user);
      this.dispatch('pushRouter', { name: 'home' })
    },
    signupSuccess({ commit }, user) {
      commit('setCurrentUser', user);
      this.dispatch('pushRouter', { name: 'home' })
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
    }
  }
})

sync(store, router)

export default store;