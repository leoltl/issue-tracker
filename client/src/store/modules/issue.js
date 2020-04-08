import { Message } from 'element-ui';
import APIrequest from '@/request';

const issue = {
  namespaced: true,
  state: {
    issues: [],
    currentIssue: null,
  },
  mutations: {
    setIssues(state, issues) {
      state.issues = issues
    },
    setCurrentIssue(state, issue) {
      state.currentIssue = issue
    },
  },
  actions: {
    async getAllIssues({ commit }, projectId) {
      const { data } = await APIrequest.get(`/projects/${projectId}/issues`);
      commit('setIssues', data);
    },
    async getIssueDetails({ commit }, ticketId) {
      try {
        const { data: issue } = await APIrequest.get(`/issues/${ticketId}`);
        commit('setCurrentIssue', issue);
        this.dispatch('pushRouter', `/issues/${ticketId}`, { root: true })
      } catch(err) {
        Message({
          message: "TOIMPROVE: NETWORK REQUEST FAILED"
        })
      }
    }
  }
}

export default issue