/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    registeredStaff: false,
    staffs: [],
    updatedStaff: false,
    singleStaff: [],
  },

  mutations: {
    setRegisterStaff(state, payload) {
      state.registeredStaff = payload;
    },

    setStaffList(state, payload) {
      state.staffs = payload;
    },

    setSingleStaff(state, payload) {
      state.singleStaff = payload;
    },

    setUpdateStaff(state, payload) {
      state.updatedStaff = payload;
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

      commit("setStaffList", res.data);
    },

    async getSingleStaff({ commit }, id) {
      let res = await api.get(path.staff, id);

      commit("setSingleStaff", res.data);
    },

    async updateStaff({ commit }, data) {
      let res = await api.update(path.staff, data);

      commit("setUpdateStaff", res.data);
    },
  },
};
