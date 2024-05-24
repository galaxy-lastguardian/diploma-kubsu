import {backendURL} from "@/app.config";
import {authHeader} from "@/_helpers/auth-header";

const state = {
  auth_user: null,
};
const getters = {
  isAuthenticated: state => !!state.auth_user,
  StateUser: state => state.auth_user,
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
    localStorage.removeItem('user');
    commit('LogOut', user)
  },
  async SetUserFromToken({commit}) {
    try {
      const response = await fetch(backendURL + 'login/token/email', {
        method: 'GET',
        headers: authHeader(),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch email');
      }
      const email = await response.json();
      commit('setUser', email);
    } catch (error) {
      console.error('Error fetching email:', error.message);
    }
  },
};
const mutations = {
  setUser(state, email) {
        state.auth_user = email
  },
  LogOut(state) {
        state.auth_user = null
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};