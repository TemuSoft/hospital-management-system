/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    registeredLab: false,
    registeredLabGroup: false,
    labratoryGroup: [],
    registeredImaging: false,
    labTestList: [],
    imagingTestList: [],
  },
  mutations: {
    setRegisterLab(state, payload) {
      state.registeredLab = payload;
    },

    setRegisterLabGroup(state, payload) {
      state.registeredLabGroup = payload;
    },

    setLabratoryGroup(state, payload) {
      state.labratoryGroup = payload;
    },

    setRegisterImaging(state, payload) {
      state.registeredImaging = payload;
    },

    setLabTestList(state, payload) {
      state.labTestList = payload;
    },

    setImagingTestList(state, payload) {
      state.imagingTestList = payload;
    },
  },

  actions: {
    async registerLab({ commit }, data) {
      let res = await api.create(path.register_lab_case, data);
      commit("setRegisterLab", res.data);
    },

    async getLabTestList({ commit }) {
      let res = await api.getAll(path.register_lab_case);
      commit("setLabTestList", res.data);
    },

    async registerLabGroup({ commit }, data) {
      let res = await api.create(path.register_lab_group, data);
      commit("setRegisterLabGroup", res.data);
    },

    async getLabratoryGroup({ commit }) {
      let res = await api.getAll(path.register_lab_group);
      commit("setLabratoryGroup", res.data);
    },

    async registerImaging({ commit }, data) {
      let res = await api.create(path.register_imaging, data);
      commit("setRegisterImaging", res.data);
    },

    async getImagingTestList({ commit }) {
      let res = await api.getAll(path.register_imaging);
      commit("setImagingTestList", res.data);
    },
  },
};
