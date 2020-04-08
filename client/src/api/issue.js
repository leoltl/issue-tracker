const issue = (axios) => ({
  async getIssuesForProject(projectId) {
    return await axios.get(`/projects/${projectId}/issues`)
  },
  async getIssue(issueId) {
    return await axios.get(`/issues/${issueId}`)
  },
  async createIssue(formData, projectId) {
    return await axios.post(`/projects/${projectId}/issues`, { data: formData })
  }
})

export default issue;