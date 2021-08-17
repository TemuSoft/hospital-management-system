<template>
  <v-app class="mainBody">
    <topBar />

    <v-main>
      <v-layout>
        <sideBar />

        <div class="mainDiv">
          <router-view />
        </div>
      </v-layout>
    </v-main>
  </v-app>
</template>

<script>
import topBar from "./pages/layout/topBar.vue";
import sideBar from "./pages/layout/sideBar.vue";

export default {
  name: "App",

  data() {
    return {};
  },

  components: {
    topBar,
    sideBar,
  },

  created() {},

  computed: {},

  methods: {},
};
</script>

<style scoped>
.mainDiv {
  width: 100%;
  margin-left: 5%;
  margin-right: 2%;
  margin-top: 1%;
}
.logout {
  margin-left: 3%;
}

.chatRoom {
  cursor: pointer;
  margin-left: 1%;
}

.mainDiv {
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll;
}

.mainDiv::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}
</style>
