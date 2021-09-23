import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "./i18n";

import Notifications from "vue-notification";
import VueSimpleAlert from "vue-simple-alert";

Vue.config.productionTip = false;

Vue.use(Notifications);
Vue.use(VueSimpleAlert);

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
