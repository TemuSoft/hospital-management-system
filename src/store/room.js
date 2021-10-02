/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    registeredRoom: false,
    updatedRoom: false,
    assignedPatientRoom: false,
    rooms: [],
    assignedRoomStaff: false,
    singleRoomInfo: [],
    staffListInRoom: [],
    assignedPatientRoomRequest: {},
  },

  mutations: {
    setRegisterRoom(state, payload) {
      state.registeredRoom = payload;
    },

    setRoomsList(state, payload) {
      state.rooms = payload;
    },

    setUpdateRoom(state, payload) {
      state.updatedRoom = payload;
    },

    setAssignRoomStaff(state, payload) {
      state.assignedRoomStaff = payload;
    },

    setSIngleRoomInfo(state, payload) {
      state.singleRoomInfo = payload;
    },

    setStaffListInRoom(state, payload) {
      state.staffListInRoom = payload;
    },

    setAssignPatientRoomRequest(state, payload) {
      state.assignedPatientRoomRequest = payload;
    },
  },

  actions: {
    async registerRoom({ commit }, data) {
      let res = await api.create(path.room, data);
      commit("setRegisterRoom", res.data);
    },

    async getRoomsList({ commit }) {
      let res = await api.getAll(path.room);
      commit("setRoomsList", res.data);
    },

    async updateRoom({ commit }, data) {
      let res = await api.update(path.update_room, data.id, data);
      commit("setUpdateRoom", res.data);
    },

    async getSIngleRoomInfo({ commit }, id) {
      let res = await api.get(path.update_room, id);
      commit("setSIngleRoomInfo", res.data);
    },

    async assignRoomStaff({ commit }, data) {
      let res = await api.create(path.room_staff, data);
      commit("setAssignRoomStaff", res.data);
    },

    async getStaffListInRoom({ commit }, id) {
      let res = await api.get(path.get_room_staff, id);
      commit("setStaffListInRoom", res.data);
    },

    async assignPatientRoomRequest({ commit }, data) {
      let res = await api.create(path.assing_patient_room_request, data);

      commit("setAssignPatientRoomRequest", res.data);
    },
  },
};
