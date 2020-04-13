import { parseJWToken } from '@/utils';
import { Message } from 'element-ui';

import API from '@/api';

const auth = {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    isAuthenticated(state) {
      return state.user != null;
    },
    userId(state) {
      return state.user.usersUuid;
    },
    userName(state) {
      return state.user.name;
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
          this.dispatch("auth/refreshToken")
        }
      }
    },
    async refreshToken() {
      const { data: token } = await API.auth.refreshToken();
      window.localStorage.setItem('jwt-token', token)
    },
    async checkAuth({ commit }) {
      if (window.localStorage.getItem('jwt-token')) {
        try {
          const { data: { user } } = await API.auth.checkAuth()
          commit('setCurrentUser', user);
        } catch {
          this.dispatch("pushRouter", { name: "Login" })
          window.localStorage.setItem('jwt-token', "");
          Message({ 
            message: `Your login session is invalid. Please login and retry.`,
            type: 'warning',
            showClose: true,
          })
        }
      }
    },
    signOut({ commit }) {
      window.localStorage.setItem('jwt-token', "");
      if (this.state.user) { 
        commit('setCurrentUser', null)
      }
      this.dispatch('pushRouter', { name: 'Login' }, { root: true })
    },
    async signIn(_, { formData, loaderCallback }) {
      try {
        const { data: token } = await API.auth.signIn(formData);
        this.dispatch('auth/signinSuccess', token)
      } catch (e) {
        this.dispatch('auth/signinFailed')
      } finally {
        loaderCallback && loaderCallback();
      }
    },
    async signUp(_, { formData, loaderCallback }) {
      try {
        const { data: token } = await API.auth.signUp(formData);
        this.dispatch('auth/signupSuccess', token)
      } catch (e) {
        this.dispatch('auth/signupFailed')
      } finally {
        loaderCallback && loaderCallback();
      }
    },
    signinSuccess({ commit }, token) {
      window.localStorage.setItem('jwt-token', token)
      const { name, username, email, role, usersUuid } = parseJWToken(token)
      commit('setCurrentUser', { name, username, email, role, usersUuid });
      this.dispatch('pushRouter', { name: 'Home' }, { root: true })
    },
    signupSuccess({ commit }, token) {
      window.localStorage.setItem('jwt-token', token)
      const { name, username, email, role, usersUuid } = parseJWToken(token)
      commit('setCurrentUser', { name, username, email, role, usersUuid });
      this.dispatch('pushRouter', { name: 'Home' }, { root: true })
    },
    signupFailed() {
      Message({
        message: `Sign Up Failed. Please try again.`,
        type: 'warning',
        showClose: true,
      })
    },
    signinFailed() {
      Message({
        message: `Sign In Failed. Please try again.`,
        type: 'warning',
        showClose: true,
      })
    },
  }
}

export default auth