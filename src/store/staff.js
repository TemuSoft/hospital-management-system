/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    registeredStaff: false,
  },

  mutations: {
    setRegisterStaff(state, payload) {
      state.registeredStaff = payload;
    },
  },

  actions: {
    async registerStaff({ commit }, data) {
      let res = await api.create(path.registerStaff, data);

      commit("setRegisterStaff", res.data);
    },
  },
};
