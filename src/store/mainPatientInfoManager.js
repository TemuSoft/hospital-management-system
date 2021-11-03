/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    patientTestCase: [],
    patientLabTestCasesData: [],

    prescriptionsSingle: [],
    registeredPrescription: {},

    registeredClearPatient: {},
    clearedPatientInfo: [],

    registeredAssignedOPD: {},
    assignedOPD: {},
    reassignededOPD: {},

    registeredSurgicalOrder: [],
    surgicalOrderList: [],

    registeredRefferal: {},
    refferalData: {},
  },

  mutations: {
    setPatientTestCase(state, payload) {
      state.patientLabTestCasesData = payload;
    },

    setPrescriptionsSingle(state, payload) {
      state.prescriptionsSingle = payload;
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

    setRegisterAssignedOPD(state, payload) {
      state.registeredAssignedOPD = payload;
    },

    setAssignedOPD(state, payload) {
      state.assignedOPD = payload;
    },

    setReassignedOPD(state, payload) {
      state.reassignededOPD = payload;
    },

    setRegisterSurgicalOrder(state, payload) {
      state.registeredSurgicalOrder = payload;
    },

    setSurgicalOrderList(state, payload) {
      state.surgicalOrderList = payload;
    },

    setRegisterRefferal(state, payload) {
      state.registeredRefferal = payload;
    },

    setRefferalData(state, payload) {
      state.refferalData = payload;
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

    async getPrescriptionsSingle({ commit }, service_id) {
      let res = await api.get(path.prescription_persenal, service_id);
      commit("setPrescriptionsSingle", res.data);
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

    async registerAssignedOPD({ commit }, data) {
      let res = await api.create(path.assign_opd, data);
      commit("setRegisterAssignedOPD", res.data);
    },

    async getAssignedOPD({ commit }, service_id) {
      let res = await api.get(path.update_nurse_patient_assigned, service_id);
      commit("setAssignedOPD", res.data);
    },

    async reassignedOPD({ commit }, data) {
      let res = await api.update(path.reassign_opd, data.id, data);
      commit("setReassignedOPD", res.data);
    },

    async registerSurgicalOrder({ commit }, data) {
      let res = await api.create(path.surgical_order, data);
      commit("setRegisterSurgicalOrder", res.data);
    },

    async getSurgicalOrderList({ commit }, service_id) {
      let res = await api.get(path.surgical_orders_service, service_id);
      commit("setSurgicalOrderList", res.data);
    },

    async registerRefferal({ commit }, data) {
      let res = await api.create(path.refferal, data);
      commit("setRegisterRefferal", res.data);
    },

    async getRefferalData({ commit }, service_id) {
      let res = await api.get(path.read_refferal, service_id);
      commit("setRefferalData", res.data);
    },
  },
};
