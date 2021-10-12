/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    sendIssuedRequest: false,
    issues: [],
    confirmIssuedRequest: {},
  },

  mutations: {
    setSendIssueRequest(state, payload) {
      state.sendIssuedRequest = payload;
    },

    setLoadIssueRequest(state, payload) {
      state.issues = payload;
    },

    setConfirmIssueRequest(state, payload) {
      state.confirmIssuedRequest = payload;
    },
  },

  actions: {
    async sendIssueRequest({ commit }, data) {
      let res = await api.create(path.issue, data);
      console.log(res.data);
      commit("setSendIssueRequest", res.data);
    },

    async loadIssueRequest({ commit }) {
      let res = await api.getAll(path.issue);
      commit("setLoadIssueRequest", res.data);
    },

    async confirmIssueRequest({ commit }, data) {
      let res = await api.createById(path.issue_confirm, data.issue_id, data);
      console.log(res);
      commit("setConfirmIssueRequest", res.data);
    },
  },
};
