// import axios from "axios";
import {backendURL} from "@/app.config";

const state = {
  user: null,
};
const getters = {
  isAuthenticated: state => !!state.user,
  StateUser: state => state.user,
};
const actions = {
  async LogIn({commit}, User) {
    try {
      const response = await fetch( backendURL +'login/token', {
        method: 'POST',
        body: User
      });
      if (!response.ok) {
        throw new Error('Failed to login');
      }
      const user_data = await response.json();
      localStorage.setItem('user', JSON.stringify(user_data));
      await commit('setUser', User.get('username'));
    } catch (error) {
      console.error('Error during login:', error.message);
    }
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