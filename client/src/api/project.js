const project = (axios) => ({
  async getUserProjects() {
    return await axios.get('/projects');
  },
  async getProjectMember(projectId) {
    return await axios.get(`/projects/${projectId}/members`);
  }
})

export default project;