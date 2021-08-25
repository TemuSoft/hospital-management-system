<template>
  <v-app class="mainBody">
    <notifications position="top center" duration="5" max="3" width="300" />
    <br />
    <br />
    <br />
    <br />

    <button @click="notify">Popup alert</button>

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

  methods: {
    clear() {
      this.$notify({
        clean: true,
      });
    },
    notify() {
      this.$notify({
        type: "success",
        title: "Something Wrong!!!",
        text: "Input is invlide try agin please!!!",
      });
    },
  },
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
