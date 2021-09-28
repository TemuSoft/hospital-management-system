/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    sendCardRenewalRequested: false,
    paymnetRequest: [],
    prepaymentAmount: 0,
    testCaseList: [],
  },

  mutations: {
    setSendCardRenewalRequest(state, payload) {
      state.sendCardRenewalRequested = payload;
    },

    setPaymentRequest(state, payload) {
      state.paymnetRequest = payload;
    },

    setPrepaymentAmount(state, payload) {
      state.prepaymentAmount = payload;
    },

    setTestCaseList(state, payload) {
      state.testCaseList = payload;
    },
  },

  actions: {
    async sendCardRenewalRequest({ commit }, id) {
      let res = await api.get(path.reception_card_renewal, id);
      commit("setSendCardRenewalRequest", res.data.st);
    },

    async getPaymentRequest({ commit }) {
      let res = await api.getAll(path.cashier_payment_request);
      commit("setPaymentRequest", res.data);
    },

    async getPrepaymentAmount({ commit }, patient_id) {
      let res = await api.get(path.cashier_payment_request, patient_id);
      commit("setPrepaymentAmount", res.data);
    },

    async getTestCaseList({ commit }, service_id) {
      let res = await api.get(path.lab_test_case, service_id);
      commit("setTestCaseList", res.data);
    },
  },
};
