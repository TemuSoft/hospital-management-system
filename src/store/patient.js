/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    registeredPatient: false,
    patients: [],
    patientsInsurance: [],
    patientsNewFive: [],
    updateResponse: false,
    singlePatient: [],
  },
  mutations: {
    setRegisterPatient(state, payload) {
      state.registeredPatient = payload;
    },

    setPatientList(state, payload) {
      state.patients = payload;
    },

    setPatientListInsurance(state, payload) {
      state.patientsInsurance = payload;
    },

    setPatientListNewFive(state, payload) {
      state.patientsNewFive = payload;
    },

    setUpdatePatientInfo(state, payload) {
      state.updateResponse = payload;
    },

    setSinglePatientInfo(state, payload) {
      state.singlePatient = payload;
    },
  },

  actions: {
    async registerPatient({ commit }, data) {
      let res = await api.create(path.register_patient, data);
      commit("setRegisterPatient", res.data);
    },

    async getPatientList({ commit }) {
      let res = await api.getAll(path.patient);
      commit("setPatientList", res.data);
    },

    async getPatientListInsurance({ commit }) {
      let res = (await api.getAll(path.patient)).data;
      for (let i = 0; i < res.length; i++) {
        if (res[i].patient_type != 3) {
          let fi = res[i].first_name + " ";
          let fa = res[i].fathers_name + " ";
          let ca = res[i].card_number;
          res[i].full_name = fi + fa + ca;
        } else res.splice(i, 1);
      }
      commit("setPatientListInsurance", res);
    },

    async getPatientListNewFive({ commit }) {
      let res = await api.getAll(path.patient);
      res.data.reverse();
      commit("setPatientListNewFive", res.data);
    },

    async getPatientFilter({ commit }, filter) {
      let res = await api.create(path.patient, filter);
      commit("setPatientList", res.data);
    },

    async singlePatientInfo({ commit }, id) {
      let res = await api.create(path.patient, {
        key: "id",
        value: id,
      });

      commit("setSinglePatientInfo", res.data);
    },

    async updatePatientInfo({ commit }, data) {
      let res = await api.update(path.update_patient, data.id, data);
      commit("setUpdatePatientInfo", res.data);
    },
  },
};
