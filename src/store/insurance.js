/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    registeredInsurance: false,
    insurances: [],
    updatedInsurance: false,
    singleInsurance: [],
    insuranceStaffList: [],
  },

  mutations: {
    setRegistereInsuranc(state, payload) {
      state.registeredInsurance = payload;
    },

    setInsuranceList(state, payload) {
      state.insurances = payload;
    },

    setUpdateInsurance(state, payload) {
      state.updatedInsurance = payload;
    },

    setSingleInsurance(state, payload) {
      state.singleInsurance, payload;
    },

    setInsuranceStaffList(state, payload) {
      state.insuranceStaffList = payload;
    },
  },

  actions: {
    async registereInsurance({ commit }, data) {
      let res = await api.create(path.insurance, data);

      commit("setRegistereInsuranc", res.data);
    },

    async getInsuranceList({ commit }) {
      let res = await api.getAll(path.insurance);

      commit("setInsuranceList", res.data);
    },

    async updateInsurance({ commo }, data) {
      let res = await api.update(path.insurance, data.id, data);

      commit("setUpdateInsurance", res.data);
    },

    async getSingleInsurance({ commit }, id) {
      let res = await api.get(path.insurance, id);

      commit("setSingleInsurance", res.data);
    },

    async getInsuranceStaffList({ commit }, data) {
      let res = await api.get(path.insurance, id);

      commit("setInsuranceStaffList", res.data);
    },
  },
};
