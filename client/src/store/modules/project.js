import API from '@/api'

const project = {
  namespaced: true,
  state: {
    projects: [],
    currentProjectID: "",
    projectMembers: [],
  },
  getters: {
    currentProject(state) {
      return state.projects.find(project => project.projectsUuid == state.currentProjectID) || ""
    },
    projectOptions(state) {
      return state.projects.map(project => {
        return {
          name: project.name,
          value: project.projectsUuid
        }
      })
    }
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
    async getAllProjects({ commit }) {
      const { data } = await API.project.getUserProjects();
      commit('setProjects', data)
    },
    setCurrentProject({ commit }, projectId) {
      commit('setCurrentProject', projectId);
      if (projectId == "") return;
      this.dispatch('issue/getAllIssues', projectId, { root: true });
      this.dispatch('project/getProjectMember', projectId);
      this.dispatch('pushRouter', `/projects/${projectId}`, { root: true })
    },
    async getProjectMember({ commit }, projectId) {
      const { data } = await API.project.getProjectMember(projectId);
      commit('setProjectMembers', data);
    },
    async updateProjectMember(_, { formData, projectId, callback}) {
      try {
        await API.project.updateProjectMember(formData, projectId);
        this.dispatch('project/getProjectMember', projectId)
      } catch (e) {
        console.log(e)
      } finally {
        callback && callback()
      }
    },
    async deleteProjectMember({ commit, state }, { userId, projectId }) {
      try {
        await API.project.deleteProjectMember(userId, projectId);
        commit('setProjectMembers', state.projectMembers.filter(user => user.usersUuid != userId ))
      } catch (e) {
        console.log(e)
      }
    }
  },
}

export default project;