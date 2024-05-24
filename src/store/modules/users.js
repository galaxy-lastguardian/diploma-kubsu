import { backendURL } from "@/app.config";

const state = {
  users_to_view: [],
  current_user_to_view: {
    id: null,
    email: ''
  }
};

const getters = {
  getUsers: state => state.users_to_view,
  getUser: state => state.current_user_to_view
};

const actions = {
  async fetchUsers({ commit }) {
    try {
      const response = await fetch(backendURL +'user/users');
      const data = await response.json();
      commit('setUsers', data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },
  async fetchUser({ commit }, email) {
    try {
      const response = await fetch(backendURL +'user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
      });
      const data = await response.json();
      commit('setUser', data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  },
  async createUser({ dispatch }, user) {
    try {
      await fetch(backendURL +'user/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      dispatch('fetchUsers');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  },
  async updateUser({ dispatch }, user) {
    try {
      await fetch(backendURL +`user/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      dispatch('fetchUsers');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  },
  async deleteUser({ dispatch }, id) {
    try {
      await fetch(backendURL +`user/${id}`, {
        method: 'DELETE'
      });
      dispatch('fetchUsers');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
};

const mutations = {
  setUsers(state, users) {
    state.users_to_view = users;
  },
  setUser(state, user) {
    state.current_user_to_view = user;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
