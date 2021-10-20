/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    receptionDashboardCard: [],
    receptionDashboardLiceChart: [],
  },

  mutations: {
    setReceptionDashboardCard(state, payload) {
      state.receptionDashboardCard = payload;
    },

    setReceptionDashboardLiceChart(state, payload) {
      state.receptionDashboardLiceChart = payload;
    },
  },

  actions: {
    async getReceptionDashboardCard({ commit }) {
      let res = await api.getAll(path.reception_dashboard_card);
      commit("setReceptionDashboardCard", res.data);
    },

    async getReceptionDashboardLiceChart({ commit }) {
      let res = await api.getAll(path.reception_dashboard_linechart);
      commit("setReceptionDashboardLiceChart", res.data);
    },
  },
};
