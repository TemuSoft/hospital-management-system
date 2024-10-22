/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    registeredInventory: false,
    inventorys: [],
    singleInventory: [],
    updatedInventory: false,
  },

  mutations: {
    setRegisterInventory(state, payload) {
      state.registeredInventory = payload;
    },

    setLoadInventoryList(state, payload) {
      state.inventorys = payload;
    },

    setLoadSingleInvetory(state, payload) {
      state.singleInventory = payload;
    },

    setUpdateInventory(state, payload) {
      state.updatedInventory = payload;
    },
  },

  actions: {
    async registerInventory({ commit }, data) {
      let res = await api.create(path.inventory, data);
      commit("setRegisterInventory", res.data);
    },

    async loadInventoryList({ commit }) {
      let res = await api.getAll(path.inventory);
      commit("setLoadInventoryList", res.data);
    },

    async loadSingleInvetory({ commit }, id) {
      let res = await api.get(path.inventory_detail, id);
      commit("setLoadSingleInvetory", res.data);
    },

    async updateInventory({ commit }, data) {
      let res = await api.update(path.inventory_detail, data.id, data);
      commit("setUpdateInventory", res.data);
    },
  },
};
