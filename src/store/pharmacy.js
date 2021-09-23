/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    registeredMedicine: false,
    medicineList: [],

    registeredMedicineGroup: false,
    registeredMedicineCategory: false,

    medicineGroupList: [],
    medicineCategoryList: [],
  },

  mutations: {
    setRegisterMedicine(state, payload) {
      state.registeredMedicine = payload;
    },

    setMedicineList(state, payload) {
      state.medicineList = payload;
    },

    setRegisterMedicineGroup(state, payload) {
      state.registeredMedicineGroup = payload;
    },

    setMedicineGroup(state, payload) {
      state.medicineGroupList = payload;
    },

    setRegisterMedicineCategory(state, payload) {
      state.registeredMedicineCategory = payload;
    },

    setMedicineCategory(state, payload) {
      state.medicineCategoryList = payload;
    },
  },

  actions: {
    async registerMedicine({ commit }, data) {
      let res = await api.create(path.medicine, data);
      commit("setRegisterMedicine", res.data);
    },

    async getMedicineList({ commit }) {
      let res = await api.getAll(path.medicine);
      commit("setMedicineList", res.data);
    },

    async registerMedicineGroup({ commit }, data) {
      let res = await api.create(path.medicine_group, data);
      commit("setRegisterMedicineGroup", res.data);
    },

    async getMedicineGroup({ commit }) {
      let res = await api.getAll(path.medicine_group);
      commit("setMedicineGroup", res.data);
    },

    async registerMedicineCategory({ commit }, data) {
      let res = await api.create(path.medicine_category, data);
      commit("setRegisterMedicineCategory", res.data);
    },

    async getMedicineCategory({ commit }) {
      let res = await api.getAll(path.medicine_category);
      commit("setMedicineCategory", res.data);
    },
  },
};
