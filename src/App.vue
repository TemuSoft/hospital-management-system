<template>
  <v-app class="mainBody">
    <notifications position="top center" duration:5 max:3 width="300" />
    <topBar />
    <v-main>
      <v-layout v-if="navDrawerShow">
        <sideBar />
        <div class="mainDiv">
          <router-view />
        </div>
      </v-layout>
      <router-view v-else />
    </v-main>
  </v-app>
</template>

<script>
import topBar from "./pages/layout/topBar.vue";
import sideBar from "./pages/layout/sideBar.vue";
import { mapState } from "vuex";

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

  computed: {
    ...mapState("core", ["navDrawerShow"]),
  },

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

      this.$fire({
        title: "Title",
        text: "text",
        type: "error",
        timer: 3000,
      }).then((r) => {
        console.log(r.value);
      });

      // this.$confirm("Are you sure?").then(() => {
      //do something...
      // });

      // this.$prompt("Input your name").then(() => {
      // do somthing with text
      // });
    },
  },
};
</script>

<style scoped>
.mainDiv {
  width: 100%;
  margin-left: 2%;
  margin-right: 2%;
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
