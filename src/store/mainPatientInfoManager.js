/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    patientTestCase: [],
  },

  mutations: {},

  actions: {
    async registerPatientTestCase({ commit }, data) {
      let res = await api.create(path.patient_test_case, data);
      commit("setRegisterPatientTestCase", res.data);
    },
    async getPatientTestCase({ commit }, service_id) {
      let res = await api.get(path.patient_test_case, service_id);
      commit("setPatientTestCase", res.data);
    },
  },
};
