/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { api, path } from "../network/index";

export default {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    async sendCardRenewalRequest({ commit }, data) {
      await api.create(path.cashier_card_renewal, data);
      commit;
    },
  },
};
