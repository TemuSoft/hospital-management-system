<template>
  <div>
    <v-app-bar dense app flat>
      <div style="cursor: pointer" @click="manageNavDrawer()">
        ::::: {{ $t("hospital_managment_system") }}
      </div>
      <v-spacer />

      <v-switch
        label="አማርኛ"
        :input-value="currentLanguage === 'am'"
        color="primary"
        @change="toggleLanguage()"
        class="ml-4 mt-5"
      />

      <v-switch
        :label="$t('dark')"
        color="primary"
        @change="darkmode()"
        class="ml-4 mt-5"
      />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

      <v-badge :content="7" class="chatRoom" color="red" overlap>
        {{ $t("chat") }}
      </v-badge>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

      <v-btn @click="logout" color="red" text>Logout</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import AccountService from "@/network/accountService";

export default {
  data() {
    return {};
  },

  mounted() {
    this.loadData();
  },

  computed: {
    ...mapState("core", ["currentLanguage", "navDrawerShow"]),
  },

  methods: {
    ...mapMutations("core", ["setNavDrawerStauts"]),
    ...mapMutations("core", ["toggleLanguage"]),

    async loadData() {
      await this.setNavDrawerStauts(true);
    },

    async manageNavDrawer() {
      await this.setNavDrawerStauts(!this.navDrawerShow);
    },

    logout() {
      AccountService.logout();
    },

    darkmode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>

<style scoped>
.navDrawer {
  cursor: pointer;
}
</style>
