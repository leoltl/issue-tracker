import Vue from 'vue';
import Vuex from 'vuex';
import { sync } from 'vuex-router-sync'
import router from '@/router'
import APIrequest from '@/request';
import auth from './modules/auth';
import issue from './modules/issue';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    issue,
  },
  state: {
    projects: [],
    currentProjectID: "",
    projectMembers: [],
  },
  getters: {
    currentProject(state) {
      return state.projects.find(project => project.projectsUuid == state.currentProjectID) || ""
    },
  },
  mutations: {
    setProjects(state, projects) {
      state.projects = projects;
    },
    setCurrentProject(state, id) {
      state.currentProjectID = id
    },
    setProjectMembers(state, members) {
      state.projectMembers = members
    },
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
      commit('setCurrentProject', projectId);
      this.dispatch('issue/getAllIssues', projectId);
      this.dispatch('getProjectMember', projectId);
      this.dispatch('pushRouter', `/projects/${projectId}`)
    },
    async getProjectMember({ commit }, projectId) {
      const { data } = await APIrequest.get(`/projects/${projectId}/members`);
      commit('setProjectMembers', data);
    },
  }
})

sync(store, router)

export default store;