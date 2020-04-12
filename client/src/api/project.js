const project = (axios) => ({
  async getUserProjects() {
    return await axios.get('/projects');
  },
  async getProjectMember(projectId) {
    return await axios.get(`/projects/${projectId}/members`);
  },
  async updateProjectMember(formData, projectId) {
    return await axios.post(`/projects/${projectId}/members`, { data: formData });
  },
  async deleteProjectMember(userId, projectId) {
    return await axios.delete(`/projects/${projectId}/members`, { data: { data: { userId } }});
  }
})

export default project;