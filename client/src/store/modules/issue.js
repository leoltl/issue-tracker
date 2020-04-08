import { Message } from 'element-ui';
import API from '@/api';

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
      const { data } = await API.issue.getIssuesForProject(projectId);
      commit('setIssues', data);
    },
    async getIssueDetails({ commit }, ticketId) {
      try {
        const { data: issue } = await API.issue.getIssue(ticketId);
        commit('setCurrentIssue', issue);
        this.dispatch('pushRouter', `/issues/${ticketId}`, { root: true })
      } catch(err) {
        Message({
          message: "TOIMPROVE: NETWORK REQUEST FAILED"
        })
      }
    },
    async createIssue( _, { formData, projectId, loaderCallback }) {
      try {
        const { data: [issue] } = await API.issue.createIssue(formData, projectId);
        this.dispatch('pushRouter', `/issues/${issue.issuesUuid}`, { root: true })
      } catch (e) {
        console.log(e)
      } finally {
        loaderCallback && loaderCallback()
      }
    }
  }
}

export default issue