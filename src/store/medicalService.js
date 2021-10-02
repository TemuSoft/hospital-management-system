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

    labtestcases: [],
    labratoryRequests: [],
    singleLabratoryRequests: [],
    insertedLabRequestResult: false,

    imagingTestList: [],
    imagingRequests: [],
    singleImagingRequests: [],
    insertedImagingRequestResult: [],

    verifiedTestCase: false,
    registeredMedicalHistory: false,
    medicalHistorys: [],
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

    setTestCaseByGroup(state, payload) {
      state.labtestcases = payload;
    },

    setLabrtoryRequest(state, payload) {
      state.labratoryRequests = payload;
    },

    setSingleLabrtoryRequest(state, payload) {
      state.singleLabratoryRequests = payload;
    },

    setInsertLabRequestResult(state, payload) {
      state.insertedLabRequestResult = payload;
    },

    setImagingRequest(state, payload) {
      state.imagingRequests = payload;
    },

    setSingleImagingRequest(state, payload) {
      state.singleImagingRequests = payload;
    },

    setInsertImagingRequestResult(state, payload) {
      state.insertImagingRequestResult = payload;
    },

    setVerificationTestCase(state, payload) {
      state.verifiedTestCase = payload;
    },

    setRegisterMedicalHistory(state, payload) {
      state.registeredMedicalHistory = payload;
    },

    setMedicalHistory(state, payload) {
      state.medicalHistorys = payload;
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

    async getTestCaseByGroup({ commit }, groupid) {
      let res = await api.get(path.lab_test_case_by_gruop, groupid);
      commit("setTestCaseByGroup", res.data);
    },

    async getLabrtoryRequest({ commit }) {
      let res = await api.getAll(path.all_lab_test_case_request);
      commit("setLabrtoryRequest", res.data);
    },

    async getSingleLabrtoryRequest({ commit }, service_id) {
      let res = await api.get(path.single_lab_test_case_request, service_id);
      commit("setSingleLabrtoryRequest", res.data);
    },

    async insertLabRequestResult({ commit }, data) {
      let res = await api.update(
        path.updatae_lab_test_case_request,
        data.id,
        data
      );
      commit("setInsertLabRequestResult", res.data);
    },

    async insertLabRequestResultOutsource({ commit }, data) {
      await api.create(path.register_outsourced_test_case, data);
      commit;
    },

    async getImagingRequest({ commit }) {
      let res = await api.getAll(path.all_imaging_test_case_request);
      commit("setImagingRequest", res.data);
    },

    async getSingleImagingRequest({ commit }, service_id) {
      let res = await api.get(
        path.single_imaging_test_case_request,
        service_id
      );
      commit("setSingleImagingRequest", res.data);
    },

    async insertImagingRequestResult({ commit }, data) {
      let res = await api.update(
        path.updatae_imaging_test_case_request,
        data.id,
        data
      );
      commit("setInsertImagingRequestResult", res.data);
    },

    async insertImagingRequestResultOutsource({ commit }, data) {
      await api.create(path.register_outsourced_imaging_case, data);
      commit;
    },

    async verificationTestCase({ commit }, data) {
      console.log(data);
      let res = await api.create(path.verification_test_case, data);
      commit("setVerificationTestCase", res.data);
    },

    async registerMedicalHistory({ commit }, data) {
      let res = await api.create(path.medical_history_list, data);
      commit("setRegisterMedicalHistory", res.data);
    },

    async getMedicalHistory({ commit }, patinet_id) {
      let res = await api.get(path.medical_history_patient_id, patinet_id);
      commit("setMedicalHistory", res.data);
    },
  },
};
