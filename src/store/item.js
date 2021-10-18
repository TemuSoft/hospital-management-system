/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {
    registeredItem: false,
    itemsInventory: [],
  },

  mutations: {
    setRegisterItem(state, payload) {
      state.registeredItem = payload;
    },

    setLoadItemListInventory(state, payload) {
      state.itemsInventory = payload;
    },
  },

  actions: {
    async registerItem({ commit }, data) {
      let res = await api.create(path.item, data);
      commit("setRegisterItem", res.data);
    },

    async loadItemListInventory({ commit }, id) {
      let res = await api.get(path.update_item, id);
      for (let i = 0; i < res.data.length; i++) res.data[i].quantity = 0;
      commit("setLoadItemListInventory", res.data);
    },
  },
};
