/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    makedAppointment: false,
    updatedAppointment: {},

    appointmentLists: [],
    singleAppointment: [],
  },

  mutations: {
    setMakeAppointment(state, payload) {
      state.makedAppointment = payload;
    },

    setUpdateAppointment(state, payload) {
      state.updatedAppointment = payload;
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
      let res = await api.create(path.make_appointment, data);
      commit("setMakeAppointment", res.data);
    },

    async updateAppointment({ commit }, data) {
      let res = await api.update(path.update_appointment, data.id, data);
      commit("setUpdateAppointment", res.data);
    },

    async getAppointmentList({ commit }) {
      let res = await api.getAll(path.make_appointment);
      commit("setAppointmentList", res.data);
    },

    async getSingleAppointment({ commit }, id) {
      let res = await api.get(path.single_make_appointment, id);
      commit("setSingleAppointment", res.data);
    },
  },
};
