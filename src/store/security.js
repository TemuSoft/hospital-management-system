/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    changedPassword: {},
  },

  mutations: {
    setChangePassword(state, payload) {
      state.changedPassword = payload;
    },
  },

  actions: {
    async changePassword({ commit }, data) {
      let res = await api.update(path.update_password, data.user_id, data);
      commit("setChangePassword", res.data);
    },
  },
};
