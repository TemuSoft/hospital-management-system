import Vue from "vue";
import Vuex from "vuex";
import i18n from "../i18n";

import doctor from "./doctor";
import patient from "./patient";
import staff from "./staff";

Vue.use(Vuex);

const core = {
  namespaced: true,
  state: {
    currentLanguage: "en",
  },
  mutations: {
    toggleLanguage(state) {
      state.currentLanguage = state.currentLanguage === "en" ? "am" : "en";
      i18n.locale = state.currentLanguage;
    },
  },
  action: {},
};

export default new Vuex.Store({
  modules: {
    core,
    doctor,
    patient,
    staff,
  },
});
