/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    stateTy: "State try work well done!",
    items: [],
  },
  mutations: {
    setLoadAstraData(state, data) {
      state.items = data;
    },
  },

  actions: {
    async loadAstraData({ commit }) {
      let res = await api.getAll(path.items);
      commit("setLoadAstraData", res);
    },
  },
};
