import Vue from "vue";
import Vuex from "vuex";
import i18n from "../i18n";

import doctor from "./doctor";

Vue.use(Vuex);

const core = {
  namespaced: true,
  state: {
    currentLanguage: "am",
  },
  mutations: {
    toggleLanguage(state) {
      state.currentLanguage = state.currentLanguage === "am" ? "en" : "am";
      i18n.locale = state.currentLanguage;
    },
  },
  action: {},
};

export default new Vuex.Store({
  modules: {
    core,
    doctor,
  },
});
