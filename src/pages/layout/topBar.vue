<template>
  <div>
    <v-app-bar dense app flat>
      <div style="cursor: pointer" @click="manageNavDrawer()">
        ::::: Hospital Managment System
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
        label="Dark"
        color="primary"
        @change="darkmode()"
        class="ml-4 mt-5"
      />

      <v-badge :content="7" class="chatRoom" color="red" overlap>
        Chat
      </v-badge>

      <v-btn icon @click="logout" class="logout">
        <v-icon color="red">mdi-logout </v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

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
