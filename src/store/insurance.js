/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    registeredInsurance: false,
    insurances: [],
    updatedInsurance: false,
    singleInsurance: {},
    registeredInsuranceMember: {},
  },

  mutations: {
    setRegistereInsurance(state, payload) {
      state.registeredInsurance = payload;
    },

    setInsuranceList(state, payload) {
      state.insurances = payload;
    },

    setUpdateInsurance(state, payload) {
      state.updatedInsurance = payload;
    },

    setSingleInsurance(state, payload) {
      state.singleInsurance = payload;
    },

    setRegistereInsuranceMember(state, payload) {
      state.registeredInsuranceMember = payload;
    },
  },

  actions: {
    async registereInsurance({ commit }, data) {
      let res = await api.createWithFile(path.insurance, data);
      commit("setRegistereInsurance", res.data);
    },

    async getInsuranceList({ commit }) {
      let res = await api.getAll(path.insurance);
      commit("setInsuranceList", res.data);
    },

    async updateInsurance({ commit }, data) {
      let res = await api.update(path.insurance, data.id, data);
      commit("setUpdateInsurance", res.data);
    },

    async getSingleInsurance({ commit }, id) {
      let res = await api.get(path.insurance_single, id);
      commit("setSingleInsurance", res.data);
    },

    async registereInsuranceMember({ commit }, data) {
      let res = await api.createWithFile(path.insurance_member, data);
      commit("setRegistereInsuranceMember", res.data);
    },

    async suspendInsuranceMember({ commit }, data) {
      await api.update(path.insurance_member_options, data.id, data);
      commit;
    },

    async removeInsuranceMember({ commit }, id) {
      await api.delete(path.insurance_member_options, id);
      commit;
    },
  },
};
