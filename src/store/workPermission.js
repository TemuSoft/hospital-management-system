/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    requestedPermission: false,
    workPermissions: [],

    registeredAnnualReport: {},
    annualPlans: [],
  },
  mutations: {
    setRegisterPatient(state, payload) {
      state.requestedPermission = payload;
    },

    setWorkPermission(state, payload) {
      state.workPermissions = payload;
    },

    setRegisterAnnualReport(state, payload) {
      state.registeredAnnualReport = payload;
    },

    setAnnualReports(state, payload) {
      state.annualPlans = payload;
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

    async registerAnnualReport({ commit }, data) {
      let res = await api.create(path.annual_plan, data);
      commit("setRegisterAnnualReport", res.data);
    },

    async getAnnualReports({ commit }, user_id) {
      let res = api.get(path.annual_plan, user_id);
      commit("setAnnualReports", res.data);
    },
  },
};
