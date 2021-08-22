/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    registeredDeprtment: false,
    departments: [],
  },

  mutations: {
    setRegisterDeprtment(state, payload) {
      state.registeredDeprtment = payload;
    },

    setDeprtmentList(state, payload) {
      state.departments = payload;
    },
  },

  actions: {
    async registerDepartment({ commit }, data) {
      let res = await api.create(path.register_department, data);

      commit("setRegisterDeprtment", res.data);
    },

    async getDepartmentList({ commit }) {
      let res = await api.getAll(path.department);

      commit("setDeprtmentList", res.data);
    },
  },
};
