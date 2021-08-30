/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    patientAssignedPendding: [],
    patientAssignedServing: [],
    notificationPatient: [],
    vitalSigns: [],
    registeredVitalSign: false,
    patientVitalSigns: [],
  },

  mutations: {
    setPatientAssignedPendding(state, payload) {
      state.patientAssignedPendding = payload;
    },

    setPatientAssignedServing(state, payload) {
      state.patientAssignedServing = payload;
    },

    setNotificationPatient(state, payload) {
      state.notificationPatient = payload;
    },

    setRegisterVitalSign(state, payload) {
      state.registeredVitalSign = payload;
    },

    setUpdateVitalSign(state, payload) {
      state.registeredVitalSign = payload;
    },

    setVitalSignsList(state, payload) {
      state.vitalSigns = payload;
    },

    setPatientVitalSigns(state, payload) {
      state.patientVitalSigns = payload;
    },
  },

  actions: {
    async getPenddingPatientNurse({ commit }, id) {
      let res = await api.getPatientStatus(path.nurse_patient_assigned, id, 0);
      commit("setPatientAssignedPendding", res.data);
    },

    async getServingPatientNurse({ commit }, id) {
      let res = await api.getPatientStatus(path.nurse_patient_assigned, id, 2);
      commit("setPatientAssignedServing", res.data);
    },

    async getNotificationPatient({ commit }, id) {
      let res = await api.getAll(path.nurse_patient_notification, id);
      commit("setNotificationPatient", res.data);
    },

    async acceptPatientRequaestProcess({ commit }, data) {
      await api.update(
        path.update_nurse_patient_assigned,
        data.service_id,
        data
      );
      commit(null, null);
    },

    async registerVitalSign({ commit }, data) {
      let res = await api.create(path.vital_sign, data);
      commit("setRegisterVitalSign", res.data);
    },

    async updateVitalSign({ commit }, data) {
      let res = await api.update(path.update_vital_sign, data.id, data);
      commit("setUpdateVitalSign", res.data);
    },

    async getVitalSignsList({ commit }) {
      let res = await api.getAll(path.vital_sign);
      commit("setVitalSignsList", res.data);
    },

    async patientVitalSignsRegisteration({ commit }, data) {
      await api.create(path.patient_vital_sign, data);
      commit;
    },

    async getPatientVitalSigns({ commit }, service_id) {
      let res = await api.get(path.patient_vital_sign_read, service_id);
      console.log(res.data);
      commit("setPatientVitalSigns", res.data);
    },
  },
};
