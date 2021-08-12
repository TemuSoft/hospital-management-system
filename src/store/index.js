import Vue from "vue";
import Vuex from "vuex";

import doctor from "./doctor";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutation: {},
  action: {},

  modules: {
    doctor,
  },
});
