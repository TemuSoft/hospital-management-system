import Vue from "vue";
import Vuex from "vuex";
import i18n from "../i18n";

import doctor from "./doctor";
import patient from "./patient";
import staff from "./staff";
import department from "./department";
import workPermission from "./workPermission";
import medicalService from "./medicalService";
import inventory from "./inventory";
import insurance from "./insurance";
import item from "./item";
import issue from "./issue";
import measurement from "./measurement";
import room from "./room";
import nurse from "./nurse";
import mainPatientInfoManager from "./mainPatientInfoManager";
import appointment from "./appointment";
import prescription from "./prescription";
import pharmacy from "./pharmacy";
import cashier from "./cashier";
import dashboard from "./dashboard"

Vue.use(Vuex);

const core = {
  namespaced: true,
  state: {
    currentLanguage: "en",
    navDrawerShow: true,
  },
  mutations: {
    toggleLanguage(state) {
      state.currentLanguage = state.currentLanguage === "en" ? "am" : "en";
      i18n.locale = state.currentLanguage;
    },

    setNavDrawerStauts(state, payload) {
      state.navDrawerShow = payload;
    },
  },
  actions: {},
};

export default new Vuex.Store({
  modules: {
    core,
    doctor,
    patient,
    staff,
    department,
    workPermission,
    medicalService,
    inventory,
    insurance,
    item,
    issue,
    measurement,
    room,
    nurse,
    mainPatientInfoManager,
    appointment,
    prescription,
    pharmacy,
    cashier,
    dashboard,
  },
});
