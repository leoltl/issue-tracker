const user = (axios) => ({
  async getAllUsers() {
    return await axios.get('/u/all');
  },
  async updateUser(userId, formData) {
    return await axios.put(`/u/${userId}`, { data: formData })
  }
})

export default user;