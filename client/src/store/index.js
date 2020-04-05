import Vue from 'vue';
import Vuex from 'vuex';
// import { Message } from 'element-ui';
import { sync } from 'vuex-router-sync'
import router from '@/router'
import APIrequest from '@/request';
import auth from './modules/auth';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
  },
  state: {
    projects: [],
    currentProjectID: "",
    issues: [],
  },
  mutations: {
    setProjects(state, projects) {
      state.projects = projects;
    },
    setCurrentProject(state, id) {
      state.currentProjectID = id
    },
    setIssues(state, issues) {
      state.issues = issues
    }
  },
  actions: {
    pushRouter(_, path) {
      router.push(path);
    },
    goRouter(_, path) {
      router.go(path);
    },
    async getAllProjects({ commit }) {
      const { data } = await APIrequest.get('/projects');
      commit('setProjects', data)
    },
    setCurrentProject({ commit }, projectId) {
      commit('setCurrentProject', projectId)
      this.dispatch('getAllIssues', projectId)
    },
    async getAllIssues({ commit }, projectId) {
      const { data } = await APIrequest.get(`/projects/${projectId}/issues`);
      commit('setIssues', data)
    }
  }
})

sync(store, router)

export default store;