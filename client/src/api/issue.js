const issue = (axios) => ({
  async getIssuesForProject(projectId) {
    return await axios.get(`/projects/${projectId}/issues`)
  },
  async getIssue(issueId) {
    return await axios.get(`/issues/${issueId}`)
  },
  async getIssueHistory(issueId) {
    return await axios.get(`/issues/${issueId}/history`)
  },
  async createIssue(formData, projectId) {
    return await axios.post(`/projects/${projectId}/issues`, { data: formData })
  },
  async updateIssue(formData, issueId) {
    return await axios.put(`/issues/${issueId}`, { data: formData })
  }
})

export default issue;