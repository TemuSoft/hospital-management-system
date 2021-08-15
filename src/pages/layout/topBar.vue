<template>
  <div>
    <v-app-bar app dark>
      <div class="navDrawer" @click="navDrawerShow = !navDrawerShow">
        ::::: Hospital Managment System
      </div>

      <v-spacer></v-spacer>

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
  computed: {
    ...mapState("core", ["currentLanguage"]),
  },

  methods: {
    ...mapMutations("core", ["toggleLanguage"]),
  },
};
</script>

<style></style>
