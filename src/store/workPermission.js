/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    requestedPermission: false,
    workPermissions: [],
  },
  mutations: {
    setRegisterPatient(state, payload) {
      state.requestedPermission = payload;
    },

    setWorkPermission(state, payload) {
      state.workPermissions = payload;
    },
  },

  actions: {
    async sendReuqestPermission({ commit }, data) {
      let res = await api.create(path.register_work_permission, data);

      commit("setRegisterPatient", res.data);
    },

    async getWorkPermission({ commit }) {
      let res = await api.getAll(path.work_permission);

      commit("setWorkPermission", res.data);
    },
  },
};
