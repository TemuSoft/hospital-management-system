<template>
  <v-app :style="{ background: $vuetify.theme.themes.dark.background }">
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="3">
          <v-app-bar flat>
            <v-btn tile x-large block>Chat Group List </v-btn>
            <br />
            <br />
          </v-app-bar>
          <v-btn>Group One</v-btn>
          <br />
          <br />
          <v-btn>Group Two</v-btn>
          <br />
          <br />
          <v-btn>Group Three</v-btn>
        </v-col>
        <v-col cols="12" sm="6" class="border">
          <v-app-bar color="rgba(0,0,0,0)" flat>
            <v-spacer></v-spacer>
            <v-toolbar-title class="title pl-0 mr-2 mt-n4">
              Members :
            </v-toolbar-title>
            <v-btn
              color="blue"
              icon
              class="mt-n5 mr-n2"
              outlined
              max-height="35"
              max-width="35"
            >
              +
            </v-btn>
          </v-app-bar>

          <v-app-bar color="rgba(0,0,0,0)" flat class="mb-16">
            <v-spacer></v-spacer>
            <v-card class="mt-10 mr-2" max-width="350px" color="blue" dark>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="mb-4">Good morning. How are you today?</div>
                  <v-list-item-subtitle
                    >16 mins ago
                    <span class="ml-16">Seen 1:03PM</span></v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-card>
            <v-badge
              bordered
              bottom
              color="green"
              dot
              offset-x="10"
              offset-y="10"
            >
              <v-avatar class="mt-n5" size="30" elevation="10">
                <img src="https://cdn.vuetifyjs.com/images/lists/5.jpg" />
              </v-avatar>
            </v-badge>
          </v-app-bar>

          <v-app-bar color="rgba(0,0,0,0)" flat class="mb-16">
            <v-badge
              bordered
              bottom
              color="green"
              dot
              offset-x="16"
              offset-y="9"
            >
              <v-avatar class="mt-n5 mr-2" size="30" elevation="10">
                <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
              </v-avatar>
            </v-badge>
            <v-card class="mt-10" max-width="350px">
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="mb-4">
                    Hey! Very good.I'm taking a photos in the office
                  </div>
                  <v-list-item-subtitle>12 mins ago</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
            <v-btn color="black" icon class="mb-n10">
              <v-icon>fas fa-ellipsis-h</v-icon>
            </v-btn>
          </v-app-bar>

          <v-app-bar color="rgba(0,0,0,0)" flat>
            <v-text-field
              v-model="message"
              :append-outer-icon="message ? 'mdi-send' : 'mdi-microphone'"
              filled
              clear-icon="mdi-close-circle"
              clearable
              label="Message"
              type="text"
            ></v-text-field>
          </v-app-bar>
        </v-col>
        <v-col cols="12" sm="3">
          <v-card class="text-center mt-8 mb-3" shaped>
            <v-badge
              bordered
              bottom
              color="green"
              dot
              offset-x="11"
              offset-y="13"
            >
              <v-avatar class="mt-n7" size="60" elevation="10">
                <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
              </v-avatar>
            </v-badge>
            <v-card-title class="layout justify-center"
              >Fernando Gaucho</v-card-title
            >
            <v-card-subtitle class="layout justify-center"
              >CEO & Founder at Highly inc</v-card-subtitle
            >
            <v-list> </v-list>
          </v-card>
          <br />
          <v-divider></v-divider>

          <div>
            <h3>Members</h3>
            <v-divider></v-divider>
            <br />
            <div style="margin-top: 15px" v-for="i in 5" :key="i">
              <v-badge
                bordered
                bottom
                color="green"
                dot
                offset-x="10"
                offset-y="10"
              >
                <v-avatar class="mt-n5" size="30" elevation="10">
                  <img src="https://cdn.vuetifyjs.com/images/lists/5.jpg" />
                </v-avatar>
              </v-badge>
              Temesgen Kefie {{ i }}
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        title: "Ali Connors",
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        subtitle: `Wish I could come, but I'm out of town this weekend.`,
        title: "me, Scrott, Jennifer",
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        subtitle: "Do you have Paris recommendations? Have you ever been?",
        title: "Sandra Adams",
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        subtitle:
          "Have any ideas about what we should get Heidi for her birthday?",
        title: "Trevor Hansen",
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        subtitle:
          "We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
        title: "Britta Holt",
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        title: "Connors",
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        subtitle: `Wish I could come, but I'm out of town this weekend.`,
        title: " Jennifer",
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        subtitle: "Do you have Paris recommendations? Have you ever been?",
        title: "Sandra ",
      },
    ],
    files: [
      { text: "Landing_page.zip", icon: " mdi-cloud-upload" },
      { text: "Requirements.pdf", icon: " mdi-cloud-upload" },
      { text: "Uwagi.docx", icon: " mdi-cloud-upload" },
    ],
    panel: [2],

    password: "Password",
    show: false,
    message: "Type a message here",
    marker: true,
    iconIndex: 0,
  }),
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  methods: {
    sendMessage() {
      this.resetIcon();
      this.clearMessage();
    },
    clearMessage() {
      this.message = "";
    },
    resetIcon() {
      this.iconIndex = 0;
    },
  },
};
</script>
<style scoped>
.border {
  border-right: 1px solid grey;
}
</style>
