/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    requestedPermission: false,
    workPermissions: [],
    workPermissionSingle: [],

    registeredAnnualPlan: {},
    annualPlans: [],
    annualPlanSingle: [],
  },
  mutations: {
    setRegisterPatient(state, payload) {
      state.requestedPermission = payload;
    },

    setWorkPermission(state, payload) {
      state.workPermissions = payload;
    },

    setWorkPermissionSingle(state, payload) {
      state.workPermissionSingle = payload;
    },

    setRegisterAnnualPlan(state, payload) {
      state.registeredAnnualPlan = payload;
    },

    setAnnualPlans(state, payload) {
      state.annualPlans = payload;
    },

    setAnnualPlanSingle(state, payload) {
      state.annualPlanSingle = payload;
    },
  },

  actions: {
    async sendReuqestPermission({ commit }, data) {
      console.log(data);
      let res = await api.createWithFile(path.work_permission, data);
      commit("setRegisterPatient", res.data);
    },

    async getWorkPermission({ commit }) {
      let res = await api.getAll(path.work_permission_unseen);
      commit("setWorkPermission", res.data);
    },

    async getWorkPermissionSingle({ commit }, user_id) {
      let res = await api.get(path.work_permission_single, user_id);
      commit("setWorkPermissionSingle", res.data);
    },

    async registerAnnualPlan({ commit }, data) {
      let res = await api.createWithFile(path.annual_plan, data);
      commit("setRegisterAnnualPlan", res.data);
    },

    async getAnnualPlans({ commit }) {
      let res = await api.getAll(path.annual_plan_unseen);
      commit("setAnnualPlans", res.data);
    },

    async getAnnualPlanSingle({ commit }, user_id) {
      let res = await api.get(path.annual_plan_persenal, user_id);
      commit("setAnnualPlanSingle", res.data);
    },

    async makeSeenAnnualPlan({ commit }, annual_plan_id) {
      await api.update(path.annual_plan_make_read, annual_plan_id);
      commit;
    },
  },
};
