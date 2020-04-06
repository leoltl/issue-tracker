import Vue from 'vue';
import Vuex from 'vuex';
import { Message } from 'element-ui';
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
    projectMembers: [],
    currentIssue: null,
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
    setIssues(state, issues) {
      state.issues = issues
    },
    setProjectMembers(state, members) {
      state.projectMembers = members
    },
    setCurrentIssue(state, issue) {
      state.currentIssue = issue
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
      this.dispatch('getAllIssues', projectId);
      this.dispatch('getProjectMember', projectId);
      this.dispatch('pushRouter', `/projects/${projectId}`)
    },
    async getAllIssues({ commit }, projectId) {
      const { data } = await APIrequest.get(`/projects/${projectId}/issues`);
      commit('setIssues', data);
    },
    async getProjectMember({ commit }, projectId) {
      const { data } = await APIrequest.get(`/projects/${projectId}/members`);
      commit('setProjectMembers', data);
    },
    async getIssueDetails({ commit }, ticketId) {
      try {
        const { data: issue } = await APIrequest.get(`/issues/${ticketId}`);
        commit('setCurrentIssue', issue);
        this.dispatch('pushRouter', `/issues/${ticketId}`)
      } catch(err) {
        Message({
          message: "TOIMPROVE: NETWORK REQUEST FAILED"
        })
      }
    }
  }
})

sync(store, router)

export default store;