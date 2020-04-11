import API from '@/api';

const user = {
  namespaced: true,
  state: {
    users: [],
    selectedUser: {}
  },
  getters: {
    userOptions(state) {
      return state.users.map(user => ({
          name: user.name,
          value: user.usersUuid
        })
      );
    }
  },
  mutations: {
    setUsers(state, users) {
      state.users = users
    },
    setUser(state, user) {
      state.selectedUser = user
    }
  },
  actions: {
    async getAllUsers({ commit }) {
      const { data: users } = await API.user.getAllUsers();
      commit('setUsers', users)
    },
    setUser({ commit }, user) {
      commit('setUser', user)
    },
    async updateRole( { commit, state }, { formData, callBack }) {
      try {
        const { data: [user] } = await API.user.updateUser(formData.usersUuid, formData);
        const newUsersList = [...state.users.slice().filter(u => u.usersUuid != user.usersUuid), user]
        commit('setUsers', newUsersList)
      } catch (e) {
        console.log(e)
      } finally {
        callBack && callBack()
      } 
    }
  }
}

export default user