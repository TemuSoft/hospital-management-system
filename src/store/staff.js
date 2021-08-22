/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    registeredStaff: false,
    staffs: [],
  },

  mutations: {
    setRegisterStaff(state, payload) {
      state.registeredStaff = payload;
    },

    setStaffList(state, payload) {
      state.staffs = payload;
    },
  },

  actions: {
    async registerStaff({ commit }, data) {
      let res = await api.create(path.register_taff, data);

      commit("setRegisterStaff", res.data);
    },

    async getStaffList({ commit }) {
      let res = await api.getAll(path.staff);

      commit("setStaffList", res.data);
    },

    async getStaffListFilter({ commit }, filter) {
      let res = await api.create(path.staff, filter);

      console.log(res);

      commit("setStaffList", res.data);
    },
  },
};
