/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    registeredPrescription: false,
    prescriptionList: [],
    singlePrescription: [],
  },

  mutations: {
    setRegisterePrescription(state, payload) {
      state.registeredPrescription = payload;
    },

    setPrescriptionList(state, payload) {
      state.prescriptionList = payload;
    },

    setSinglePrescription(state, payload) {
      state.singlePrescription = payload;
    },
  },

  actions: {
    async registerePrescription({ commit }, data) {
      let res = await api.create(path.prescription, data);
      commit("setRegisterePrescription", res.data);
    },

    async getPrescriptionList({ commit }) {
      let res = await api.getAll(path.prescription);
      commit("setPrescriptionList", res.data);
    },

    async getSinglePrescription({ commit }, id) {
      let res = await api.get(path.prescription, id);
      commit("setSinglePrescription", res.data);
    },
  },
};
