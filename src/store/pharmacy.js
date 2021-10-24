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

    singleMedicineUofM: [],
    medicineListWithUofM: [],
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

    setSingleMedicineUofM(state, payload) {
      state.singleMedicineUofM = payload;
    },

    setMedicineListWithUofM(state, payload) {
      state.medicineListWithUofM = payload;
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

    async getSingleMedicineUofM({ commit }, medicine_id) {
      let res = await api.get(path.measurement_pharmacy, medicine_id);
      commit("getSingleMedicineUofM", res.data);
    },

    async getMedicineListWithUofM({ commit }) {
      let res = await api.getAll(path.medicine);
      res = res.data;
      for (let i = 0; i < res.length; i++) {
        let id = res[i].id;
        res[i].balanceDetail = [];
        res[i].quantity_requested = 0;
        let balance = await api.get(path.medicine_detail, id);
        res[i].balanceDetail.push({
          balance: balance.data.balance_in_store,
          uofm_id: res[i].unit_of_measurement,
        });

        let ur = await api.get(path.medicine_measurment_relation, id);
        ur = ur.data;
        for (let k = 0; k < ur.length; k++) {
          res[i].balanceDetail.push({
            balance:
              res[i].balanceDetail[k].balance * parseFloat(ur[k].quantity),
            uofm_id: ur[k].sub_unit_id,
          });
        }
        // res[i].uofmRelation = ur;

        let uofmList = await api.get(path.medicine_measurment_list, id);
        uofmList = uofmList.data;

        let temp = res[i].balanceDetail;
        for (let l = 0; l < uofmList.length; l++) {
          for (let m = 0; m < temp.length; m++) {
            let s = uofmList[i].symbol;
            let u = uofmList[i].unit;
            if (temp[m].uofm_id === uofmList[l].id) {
              uofmList[l].note = u + "-" + s + "-" + temp[m].balance;
              uofmList[l].balance = temp[m].balance;
            }
          }
        }
        res[i].unit = uofmList[0];
        res[i].uofmlist = uofmList;
      }
      commit("setMedicineListWithUofM", res);
    },
  },
};
