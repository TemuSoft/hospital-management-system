/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    makedAppointment: false,
    appointmentLists: [],
    singleAppointment: [],
  },

  mutations: {
    setMakeAppointment(state, payload) {
      state.makedAppointment = payload;
    },

    setAppointmentList(state, payload) {
      state.appointmentLists = payload;
    },

    setSingleAppointment(state, payload) {
      state.singleAppointment = payload;
    },
  },

  actions: {
    async makeAppointment({ commit }, data) {
      let res = await api.create(path.make_appointemtn, data);
      commit("setMakeAppointment", res.data);
    },

    async getAppointmentList({ commit }) {
      let res = await api.getAll(path.get_make_appointemtn);
      commit("setAppointmentList", res.data);
    },

    async getSingleAppointment({ commit }, id) {
      let res = await api.get(path.single_make_appointemtn, id);
      commit("setSingleAppointment", res.data);
    },
  },
};