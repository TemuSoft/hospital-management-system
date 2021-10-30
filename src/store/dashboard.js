/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    receptionDashboardCard: [],
    receptionDashboardLiceChart: [],
    cashierDashboardLiceChart: [],

    nurseStaffList: [],
    OPDStaffList: [],
    cashierStaffList: [],
    laboratoryTechStaffList: [],

    piechartLaboratory: [],
    piechartLaboratoryVistors: [],
    hospitalPatientInfo: [],
    nurseDoneInfo: [],
    OPDDoneInfo: [],
    cashierDoneInfo: [],
    pharmacyDoneInfo: [],

    generalViewLaboratoryHead: [],
  },

  mutations: {
    setReceptionDashboardCard(state, payload) {
      state.receptionDashboardCard = payload;
    },

    setReceptionDashboardLiceChart(state, payload) {
      state.receptionDashboardLiceChart = payload;
    },

    setCashierDashboardLiceChart(state, payload) {
      state.cashierDashboardLiceChart = payload;
    },

    setNurseStaffList(state, payload) {
      state.nurseStaffList = payload;
    },

    setOPDStaffList(state, payload) {
      state.OPDStaffList = payload;
    },

    setCashierStaffList(state, payload) {
      state.cashierStaffList = payload;
    },

    setLaboratoryTechStaffList(state, payload) {
      state.laboratoryTechStaffList = payload;
    },

    setPiechartLaboratory(state, payload) {
      state.piechartLaboratory = payload;
    },

    setPiechartLaboratoryVistors(state, payload) {
      state.piechartLaboratoryVistors = payload;
    },

    setHospitalPatientInfo(state, payload) {
      state.hospitalPatientInfo = payload;
    },

    setNurseDoneInfo(state, payload) {
      state.nurseDoneInfo = payload;
    },

    setOPDDoneInfo(state, payload) {
      state.OPDDoneInfo = payload;
    },

    setCashierDoneInfo(state, payload) {
      state.cashierDoneInfo = payload;
    },

    setPharmacyDoneInfo(state, payload) {
      state.pharmacyDoneInfo = payload;
    },

    setGeneralViewLaboratoryHead(state, payload) {
      state.generalViewLaboratoryHead = payload;
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

    async getCashierDashboardLiceChart({ commit }) {
      let res = await api.getAll(path.cashier_dashboard_linechart);
      commit("setCashierDashboardLiceChart", res.data);
    },

    async getStaffListByRole({ commit }, role) {
      let res = await api.get(path.staff_by_role, role);
      res = res.data;

      for (let i = 0; i < res.length; i++)
        res[i].full_name = res[i].first_name + " " + res[i].father_name;

      if (role === "nurse") commit("setNurseStaffList", res);
      else if (role === "opd") commit("setOPDStaffList", res);
      else if (role === "cashier") commit("setCashierStaffList", res);
      else if (role === "laboratory") {
        res.reverse();
        res.push({ full_name: "All", id: "all" });
        res.reverse();
        commit("setLaboratoryTechStaffList", res);
      }
    },

    async getPiechartLaboratory({ commit }, date) {
      let filter = {
        d1: date[0],
        d2: new Date(new Date(date[1]).getTime() + 24 * 60 * 60 * 1000 - 1000),
      };
      let res = await api.create(
        path.piechart_lab_testcase_wise_dashboard,
        filter
      );
      commit("setPiechartLaboratory", res.data);
    },

    async getPiechartLaboratoryVistors({ commit }, date) {
      let filter = {
        d1: date[0],
        d2: new Date(new Date(date[1]).getTime() + 24 * 60 * 60 * 1000 - 1000),
      };
      let res = await api.create(
        path.piechart_lab_vistor_wise_dashboard,
        filter
      );
      commit("setPiechartLaboratoryVistors", res.data);
    },

    async getHospitalPatientInfo({ commit }, date) {
      let filter = {
        d1: date[0],
        d2: date[1],
      };
      let res = await api.create(path.general_info_dashboard, filter);
      commit("setHospitalPatientInfo", res.data);
    },

    async getNurseDoneInfo({ commit }, data) {
      let filter = {
        d1: data.date[0],
        d2: data.date[1],
        nurse_id: data.nurse_id,
      };
      let res = await api.create(path.nurse_done_dashboard, filter);
      commit("setNurseDoneInfo", res.data);
    },

    async getOPDDoneInfo({ commit }, data) {
      let filter = {
        d1: data.date[0],
        d2: data.date[1],
        opd_id: data.opd_id,
      };
      let res = await api.create(path.opd_done_dashboard, filter);
      commit("setOPDDoneInfo", res.data);
    },

    async getCashierDoneInfo({ commit }, data) {
      let filter = {
        d1: data.date[0],
        d2: data.date[1],
        cashier_id: data.cashier_id,
      };
      let res = await api.create(path.cashier_done_dashboard, filter);
      commit("setCashierDoneInfo", res.data);
    },

    async getPharmacyDoneInfo({ commit }, data) {
      let filter = {
        d1: data.date[0],
        d2: data.date[1],
        pharmacy_id: data.pharmacy_id,
      };
      let res = await api.create(path.pharmacy_done_dashboard, filter);
      commit("setPharmacyDoneInfo", res.data);
    },

    async getGeneralViewLaboratoryHead({ commit }, data) {
      let filter = {
        who: data.who,
        d1: data.date[0],
        d2: new Date(
          new Date(data.date[1]).getTime() + 24 * 60 * 60 * 1000 - 1000
        ),
      };

      let res = await api.create(path.general_info_laboratory_head, filter);
      commit("setGeneralViewLaboratoryHead", res.data);
    },
  },
};
