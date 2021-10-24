/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    registeredMeasurement: false,
    measurements: [],
    updatedMeasurement: false,

    registeredMeasurementPharmacy: false,
    measurementsPharmacy: [],
    updatedMeasurementPharmacy: false,

    medicineUofMRelationList: [],
    measurementsPharmacySelf: [],
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

    ///Pharmacy related
    setRegisterMeasurementPharmacy(state, payload) {
      state.registeredMeasurementPharmacy = payload;
    },

    setMeasurementListPharmacy(state, payload) {
      state.measurementsPharmacy = payload;
    },

    setUpdateMeasurementPharmacy(state, payload) {
      state.updatedMeasurementPharmacy = payload;
    },

    setMedicineUofMRelationList(state, payload) {
      state.medicineUofMRelationList = payload;
    },

    setMeasurementsPharmacySelf(state, payload) {
      state.measurementsPharmacySelf = payload;
    },
  },

  actions: {
    async registerMeasurement({ commit }, data) {
      let res = await api.create(path.measurement, data);
      commit("setRegisterMeasurement", res.data);
    },

    async getMeasurementList({ commit }) {
      let res = await api.getAll(path.measurement);
      commit("setMeasurementList", res.data);
    },

    async updateMeasurement({ commit }, data) {
      let res = await api.update(path.measurement, data.id, data);
      commit("setUpdateMeasurement", res.data);
    },

    //Pharmacy related
    async registerMeasurementPharmacy({ commit }, data) {
      let res = await api.create(path.measurement_pharmacy, data);
      commit("setRegisterMeasurementPharmacy", res.data);
    },

    async getMeasurementListPharmacy({ commit }) {
      let res = await api.getAll(path.measurement_pharmacy);
      commit("setMeasurementListPharmacy", res.data);
    },

    async updateMeasurementPharmacy({ commit }, data) {
      let res = await api.update(path.measurement_pharmacy, data.id, data);
      commit("setUpdateMeasurementPharmacy", res.data);
    },

    async registerMedicineUofMRelation({ commit }, data) {
      await api.create(path.medicine_measurment_relation, data);
      commit;
    },

    async getMedicineUofMRelationList({ commit }, medicine_id) {
      let res = await api.get(path.medicine_measurment_relation, medicine_id);
      commit("setMedicineUofMRelationList", res.data);
    },

    async getMeasurementsPharmacySelf({ commit }, medicine_id) {
      let res = await api.get(path.medicine_measurment_list, medicine_id);
      commit("setMeasurementsPharmacySelf", res.data);
    },
  },
};
