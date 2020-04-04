import Vue from 'vue';
import Vuex from 'vuex';
import { Message } from 'element-ui';
import APIrequest from '@/request';
import { parseJWToken } from '@/utils';

Vue.use(Vuex);

const authModule = {
  state: {
    user: null
  },
  getters: {
    isAuthenticated(state) {
      return state.user != null 
    }
  },
  mutations: {
    setCurrentUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    async loadToken({ commit }) {
      const storedToken = window.localStorage.getItem('jwt-token')
      if (storedToken) {
        const { name, username, email, role, exp } = parseJWToken(storedToken)
        commit('setCurrentUser', { name, username, email, role })
        // check for token expirary
        const expiraryHour = (new Date(exp * 1000) - Date.now()) / 1000 / 60 / 60
        if (expiraryHour > 0 && expiraryHour < 1) {
          this.dispatch("refreshToken")
        }
      }
    },
    async refreshToken() {
      const { data: token } = await APIrequest('/refresh-token')
      window.localStorage.setItem('jwt-token', token)
    },
    async checkAuth({ commit }) {
      const { data } = await APIrequest('/me')
      if (!data.user) {
        this.dispatch("pushRouter", { name: "Login" })
      }
      commit('setCurrentUser', data.user);
    },
    signinSuccess({ commit }, token) {
      window.localStorage.setItem('jwt-token', token)
      const { name, username, email, role } = parseJWToken(token)
      commit('setCurrentUser', { name, username, email, role });
      this.dispatch('pushRouter', { name: 'Home' })
    },
    signupSuccess({ commit }, token) {
      window.localStorage.setItem('jwt-token', token)
      const { name, username, email, role } = parseJWToken(token)
      commit('setCurrentUser', { name, username, email, role });
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
  }
}

export default authModule;