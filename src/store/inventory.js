/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,

  states: {
    registeredInventory: false,
    inventorys: [],
  },

  mutations: {
    setRegisterInventory(state, payload) {
      state.registeredInventory = payload;
    },

    setLoadInventoryList(state, payload) {
      state.inventorys = payload;
    },
  },

  actions: {
    async registerInventory({ commit }, data) {
      let res = await api.create(path.register_inventory, data);

      commit("setRegisterInventory", res.data);
    },

    async loadInventoryList({ commit }) {
      let res = await api.getAll(path.inventory);

      commit("setLoadInventoryList", res.data);
    },
  },
};
