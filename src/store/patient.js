/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    registeredPatient: false,
    patients: [],
  },
  mutations: {
    setRegisterPatient(state, payload) {
      state.registeredPatient = payload;
    },

    setPatientList(state, payload) {
      state.patients = payload;
    },
  },

  actions: {
    async registerPatient({ commit }, data) {
      let res = await api.create(path.registerPatient, data);

      commit("setRegisterPatient", res.data);
    },

    async getPatientList({ commit }) {
      let res = await api.getAll(path.patient);

      commit("setPatientList", res.data);
    },

    async getPatientFilter({ commit }, filter) {
      let res = await api.create(path.patient, filter);

      commit("setPatientList", res.data);
    },
  },
};
