import axios from "axios";

const state = {
  user: null,
};
const getters = {
  isAuthenticated: state => !!state.user,
  StateUser: state => state.user,
};
const actions = {
  async LogIn({commit}, User) {
    const user_data = await axios.post('login/token', User)
    localStorage.setItem('user', JSON.stringify(user_data.data))
    await commit('setUser', User.get('username'))
  },
  async LogOut({commit}) {
    let user = null
    commit('LogOut', user)
  },
};
const mutations = {
  setUser(state, email) {
        state.user = email
  },
  LogOut(state) {
        state.user = null
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};