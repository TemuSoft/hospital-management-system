/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    registeredMedicine: {},
    addMoredMedicine: {},

    medicineList: [],
    registeredMedicineCategory: {},
    medicineCategoryList: [],
    registeredDispensary: {},
    dispensaryList: [],
    dispensarySingle: [],
    confirmedDispensaryRequest: {},
  },

  mutations: {
    setRegisterMedicine(state, payload) {
      state.registeredMedicine = payload;
    },

    setAddMoreMedicine(state, payload) {
      state.addMoredMedicine = payload;
    },

    setMedicineList(state, payload) {
      state.medicineList = payload;
    },

    setRegisterMedicineCategory(state, payload) {
      state.registeredMedicineCategory = payload;
    },

    setMedicineCategory(state, payload) {
      state.medicineCategoryList = payload;
    },

    setRegisterDispensary(state, payload) {
      state.registeredDispensary = payload;
    },

    setDispensaryList(state, payload) {
      state.dispensaryList = payload;
    },

    setDispensarySingle(state, payload) {
      state.dispensarySingle = payload;
    },

    setConfirmDispensaryRequest(state, payload) {
      state.confirmedDispensaryRequest = payload;
    },
  },

  actions: {
    async registerMedicine({ commit }, data) {
      let res = await api.create(path.medicine, data);
      commit("setRegisterMedicine", res.data);
    },

    async addMoreMedicine({ commit }, data) {
      let res = await api.create(path.medicine_detail, data);
      commit("setAddMoreMedicine", res.data);
    },

    async getMedicineList({ commit }) {
      let res = await api.getAll(path.medicine);
      commit("setMedicineList", res.data);
    },

    async registerMedicineCategory({ commit }, data) {
      let res = await api.create(path.medicine_category, data);
      commit("setRegisterMedicineCategory", res.data);
    },

    async getMedicineCategory({ commit }) {
      let res = await api.getAll(path.medicine_category);
      commit("setMedicineCategory", res.data);
    },

    async registerDispensary({ commit }, data) {
      let res = await api.create(path.dispensary_request, data);
      commit("setRegisterDispensary", res.data);
    },

    async getDispensaryList({ commit }) {
      let res = await api.getAll(path.dispensary_request);
      commit("setDispensaryList", res.data);
    },

    async getDispensarySingle({ commit }, dispensary_id) {
      let res = await api.get(path.dispensary_request, dispensary_id);
      commit("setDispensarySingle", res.data);
    },

    async confirmDispensaryRequest({ commit }, data) {
      let res = await api.updateWithoutId(
        path.dispensary_request_confirm,
        data
      );
      commit("setConfirmDispensaryRequest", res.data);
    },
  },
};
