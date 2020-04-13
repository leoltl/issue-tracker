import { Message } from 'element-ui';
import API from '@/api';

const issue = {
  namespaced: true,
  state: {
    issues: [],
    currentIssue: null,
    currentIssueHistory: [],
    currentIssueComments: [],
  },
  getters: {
    issueData(state) {
      const data = {...state.currentIssue}
      data.projectId = state.currentIssue.projectId.projectsUuid || ""
      data.authorId = state.currentIssue.authorId.usersUuid
      data.assignedId = state.currentIssue.assignedId?.usersUuid || ""
      return data;
    }
  },
  mutations: {
    setIssues(state, issues) {
      state.issues = issues
    },
    setCurrentIssue(state, issue) {
      state.currentIssue = issue
    },
    setCurrentIssueHistory(state, issueHistory) {
      state.currentIssueHistory = issueHistory
    },
    setCurrentIssueComments(state, issueComments) {
      state.currentIssueComments = issueComments;
    }
  },
  actions: {
    async getAllIssues({ commit }, projectId) {
      const { data } = await API.issue.getIssuesForProject(projectId);
      commit('setIssues', data);
    },
    async getIssueDetails({ commit }, ticketId) {
      try {
        if (ticketId == "") { 
          commit ('setCurrentIssue', null) 
          return
        }
        const { data: issue } = await API.issue.getIssue(ticketId);
        commit('setCurrentIssue', issue);
        this.dispatch('pushRouter', `/issues/${ticketId}`, { root: true })
      } catch(err) {
        Message({
          message: "TOIMPROVE: NETWORK REQUEST FAILED"
        })
      }
    },
    async getIssueHistory({ commit }, ticketId) {
      try {
        if (ticketId == "") { 
          commit('setCurrentIssueHistory', []) 
          return
        }
        const { data } = await API.issue.getIssueHistory(ticketId);
        commit('setCurrentIssueHistory', data);
      } catch(err) {
        commit('setCurrentIssueHistory', []);
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
    },
    async updateIssue( { commit }, { formData, issuesId, loaderCallback }) {
      try {
        const { data: issue } = await API.issue.updateIssue(formData, issuesId);
        commit('setCurrentIssue', issue)
        this.dispatch('issue/getIssueHistory', issue.issuesUuid)
      } catch (e) {
        console.log(e)
      } finally {
        loaderCallback && loaderCallback()
      }
    },
    async getAllIssueComments({ commit }, ticketId) {
      try {
        const { data } = await API.issue.getIssueComments(ticketId); 
        commit('setCurrentIssueComments', data);
      } catch (e) {
        commit('setCurrentIssueComments', []);
      }
    }
  }
}

export default issue