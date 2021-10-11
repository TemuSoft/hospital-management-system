/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    sendIssuedRequest: false,
    issues: [],
  },

  mutations: {
    setSendIssueRequest(state, payload) {
      state.sendIssuedRequest = payload;
    },

    setLoadIssueRequest(state, payload) {
      state.issues = payload;
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
  },
};
