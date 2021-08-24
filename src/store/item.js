import { api, path } from "../network";

export default {
  namedspace: true,

  states: {
    registeredItem: false,
    items: [],
    inventotyItems: [],
  },

  mutations: {
    setRegisterItem(state, payload) {
      state.registeredItem = payload;
    },

    setLoadItemList(state, payload) {
      state.items = payload;
    },

    setInventoryItems(state, payload) {
      state.inventotyItems = payload;
    },
  },

  actions: {
    async registerItem({ commit }, data) {
      let res = await api.create(path.register_item, data);

      commit("setRegisterItem", res.data);
    },

    async loadItemList({ commit }) {
      let res = await api.getAll(path.item);

      commit("setLoadItemList", res.data);
    },

    async getInventoryItems({ commit }, id) {
      let res = await api.create(path.item, { key: "inventoryId", value: id });

      commit("setInventoryItems", res.data);
    },
  },
};
