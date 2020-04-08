const auth = (axios) => ({
  async signIn(formData) {
    return await axios.post('/signin', { data: formData })
  },
  async signUp(formData) {
    return await axios.post('signup', { data: formData })
  },
  async refreshToken() {
    return await axios.get('/refresh-token')
  },
  async checkAuth() {
    return await axios.get('/me')
  },
})

export default auth;