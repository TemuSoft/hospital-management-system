/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    sendCardRenewalRequested: false,
    paymnetRequest: [],
    prepaymentAmount: 200,
    testCaseList: [],
    testCasePaymentDone: false,

    registeredPrepayment: false,
    prepaymentList: [],
    registeredCardrenewalPayment: {},
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

    setTestCasePaymentRegister(state, payload) {
      state.testCasePaymentDone = payload;
    },

    setRegisterPrepayment(state, payload) {
      state.registeredPrepayment = payload;
    },

    setPrepaymentList(state, payload) {
      state.prepaymentList = payload;
    },

    setRegisterCardrenewalPayment(state, payload) {
      state.registeredCardrenewalPayment = payload;
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
      let res = await api.get(path.single_prepayment_load, patient_id);
      commit("setPrepaymentAmount", res.data);
    },

    async getTestCaseList({ commit }, service_id) {
      let res = await api.get(path.lab_test_case, service_id);
      commit("setTestCaseList", res.data);
    },

    async testCasePaymentRegister({ commit }, data) {
      let res = await api.create(path.test_case_payment_done, data);
      commit("setTestCasePaymentRegister", res.data);
    },

    async registerPrepayment({ commit }, data) {
      let res = await api.create(path.register_prepayment, data);
      commit("setRegisterPrepayment", res.data);
    },

    async getPrepaymentList({ commit }) {
      let res = await api.getAll(path.get_prepayment_list);
      commit("setPrepaymentList", res.data);
    },

    async registerCardrenewalPayment({ commit }, data) {
      let res = await api.createById(
        path.card_renewal_payment,
        data[1],
        data[0]
      );
      commit("setRegisterCardrenewalPayment", res.data);
    },
  },
};
