<template>
  <div class="main">
    <v-layout row>
      <v-flex xxs12 sm3>
        <v-card class="chatPerson">
          <v-btn style="width: 100%; color: green" tile x-large block>
            Chat Group List
          </v-btn>
          <br />
          <br />
          <v-tabs vertical>
            <v-tab v-for="i in 30" :key="i">
              <v-avatar class="mt-n5" size="30" elevation="10">
                <img src="https://cdn.vuetifyjs.com/images/lists/5.jpg" />
              </v-avatar>
              Person name {{ i }}
            </v-tab>
          </v-tabs>
        </v-card>
      </v-flex>

      <v-flex xs12 sm9>
        <v-card outlined class="chatRoom">
          <v-toolbar dense color="green">
            Full Name, Role and Description
            <v-spacer />

            <v-avatar class="mt-n5" size="30" elevation="10" ma-5>
              <img src="https://cdn.vuetifyjs.com/images/lists/5.jpg" />
            </v-avatar>
          </v-toolbar>
          <v-divider />

          <div class="chatConversation">
            <v-app-bar
              color="rgba(0,0,0,0)"
              flat
              class="mb-16"
              v-for="n in 2"
              :key="n"
            >
              <v-spacer></v-spacer>
              <v-card class="mt-10 mr-2" max-width="350px" color="blue" dark>
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="mb-4">Good morning. How are you today?</div>
                    <v-list-item-subtitle
                      >16 mins ago
                      <span class="ml-16"
                        >Seen 1:03PM</span
                      ></v-list-item-subtitle
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

            <v-app-bar
              color="rgba(0,0,0,0)"
              flat
              class="mb-16"
              v-for="k in 3"
              :key="k"
            >
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
          </div>
          <v-divider />
          <br />
          <div class="messeageType">
            <v-layout>
              <v-text-field
                rounded
                solo
                :label="hintMessage"
                dense
                v-model="message"
              />
              <v-spacer />

              <v-btn text color="green">Send</v-btn>
            </v-layout>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
    
  </div>
</template>
<script>
export default {
  data: () => ({
    message: "",
    hintMessage: "Type a message here",
  }),
  computed: {},
  methods: {},
};
</script>
<style scoped>
.main {
  margin: 7%;
  margin-top: 2%;
}

.chatPerson {
  height: 90vh;
  border-color: rgb(72, 155, 72);
  overflow-y: auto;
}

.chatRoom {
  width: 100%;
  height: 90vh;
  margin-left: 3%;
  border-color: green;
}

.chatConversation {
  overflow-y: auto;
  height: 80%;
  background-color: rgb(171, 189, 171);
}

.messeageType {
  height: 15%;
}
</style>
