/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    receptionDashboardCard: [],
    receptionDashboardLiceChart: [],

    nurseStaffList: [],
    OPDStaffList: [],
  },

  mutations: {
    setReceptionDashboardCard(state, payload) {
      state.receptionDashboardCard = payload;
    },

    setReceptionDashboardLiceChart(state, payload) {
      state.receptionDashboardLiceChart = payload;
    },

    setNurseStaffList(state, payload) {
      state.nurseStaffList = payload;
    },

    setOPDStaffList(state, payload) {
      state.OPDStaffList = payload;
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

    async getStaffListByRole({ commit }, role) {
      let res = await api.get(path.staff_by_role, role);
      res = res.data;

      for (let i = 0; i < res.length; i++)
        res[i].full_name = res[i].first_name + " " + res[i].father_name;

      if (role === "nurse") commit("setNurseStaffList", res);
      else if (role === "opd") commit("setOPDStaffList", res);
    },
  },
};
