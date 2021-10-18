/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    prescriptionList: [],
  },

  mutations: {
    setPrescriptionList(state, payload) {
      state.prescriptionList = payload;
    },
  },

  actions: {
    async getPrescriptionList({ commit }) {
      let res = await api.getAll(path.prescription_unseen);
      commit("setPrescriptionList", res.data);
    },
  },
};
