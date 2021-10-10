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
      console.log(data);
      let res = await api.create(path.register_issue, data);
      console.log(res);
      commit("setSendIssueRequest", res.data);
    },

    async loadIssueRequest({ commit }) {
      let res = await api.getAll(path.isuse);
      commit("setLoadIssueRequest", res.data);
    },
  },
};
