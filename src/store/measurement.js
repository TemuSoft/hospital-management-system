/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    registeredMeasurement: false,
    measurements: [],
    updatedMeasurement: false,
  },

  mutations: {
    setRegisterMeasurement(state, payload) {
      state.registeredMeasurement = payload;
    },

    setMeasurementList(state, payload) {
      state.measurements = payload;
    },

    setUpdateMeasurement(state, payload) {
      state.updatedMeasurement = payload;
    },
  },

  actions: {
    async registerMeasurement({ commit }, data) {
      let res = await api.create(path.measurement, data);

      commit("setRegisterMeasurement", res.data);
    },

    async getMeasurementList({ commit }) {
      let res = await api.getAll(path.measurement);

      commit("setMeasurementList".res.data);
    },

    async updateMeasurement({ commit }, data) {
      let res = await api.update(path.measurement, data.id, data);

      commit("setUpdateMeasurement", res.data);
    },
  },
};
