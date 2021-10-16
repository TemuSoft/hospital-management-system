/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    patientTestCase: [],
    patientLabTestCasesData: [],

    prescriptions: [],
    registeredPrescription: {},

    registeredClearPatient: {},
    clearedPatientInfo: [],
  },

  mutations: {
    setPatientTestCase(state, payload) {
      state.patientLabTestCasesData = payload;
    },

    setPrescriptions(state, payload) {
      state.prescriptions = payload;
    },

    setRegisterPrescription(state, payload) {
      state.registeredPrescription = payload;
    },

    setRegisterClearPatient(state, payload) {
      state.registeredClearPatient = payload;
    },

    setClearPatientInfo(state, payload) {
      state.clearedPatientInfo = payload;
    },
  },

  actions: {
    async registerPatientLabTestCase({ commit }, data) {
      await api.create(path.patient_test_case, data);
      commit;
    },

    async getPatientLabTestCase({ commit }, service_id) {
      let res = await api.get(path.get_patient_test_case, service_id);
      commit("setPatientTestCase", res.data);
    },

    async getPrescriptions({ commit }) {
      let res = await api.getAll(path.prescription);
      commit("setPrescriptions", res.data);
    },

    async registerPrescription({ commit }, data) {
      let res = await api.create(path.prescription, data);
      commit("setRegisterPrescription", res.data);
    },

    async registerClearPatient({ commit }, data) {
      let res = await api.create(path.clear_patient, data);
      commit("setRegisterClearPatient", res.data);
    },

    async getClearPatientInfo({ commit }, service_id) {
      let res = await api.get(path.clear_patient, service_id);
      commit("setClearPatientInfo", res.data);
    },
  },
};
