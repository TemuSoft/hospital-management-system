/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    registeredDeprtment: false,
    departments: [],
    updatedDeprtment: false,
    staffInDepartent: [],
  },

  mutations: {
    setRegisterDeprtment(state, payload) {
      state.registeredDeprtment = payload;
    },

    setDeprtmentList(state, payload) {
      state.departments = payload;
    },

    setUpdateDeprtment(state, payload) {
      state.updatedDeprtment = payload;
    },

    setStaffsInDepartment(state, payload) {
      state.staffInDepartent = payload;
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

    async updateDeprtment({ commit }, data) {
      let res = await api.update(path.department, data.id, data);
      commit("setUpdateDeprtment", res.data);
    },

    async getStaffsInDepartment({ commit }, id) {
      let res = await api.get(path.get_staff_deprtment, id);
      commit("setStaffsInDepartment", res.data);
    },
  },
};
