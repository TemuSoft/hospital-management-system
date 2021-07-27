<template>
  <v-app class="mainBody">
    <v-app-bar app dark>
      <div class="navDrawer" @click="navDrawerShow = !navDrawerShow">
        ::::: Hospital Managment System
      </div>

      <v-spacer></v-spacer>

      <v-switch
        label="አማርኛ"
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

    <v-main>
      <v-layout>
        <v-navigation-drawer
          v-show="navDrawerShow"
          class="navDrawerLeft"
          absolute
          expand-on-hover
        >
          <v-list>
            <v-list-item class="px-2">
              <v-list-item-avatar>
                <v-img src="@/assets/images/icon.png"></v-img>
              </v-list-item-avatar>
            </v-list-item>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  Temesgen Kefie
                </v-list-item-title>
                <v-list-item-subtitle
                  >temusoft2012@gmail.com</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list nav dense>
            <v-expansion-panels flat>
              <v-expansion-panel
                v-for="menu in menus"
                :key="menu.title"
                style="background-color: transparent"
              >
                <v-expansion-panel-header v-if="menu.links">
                  <strong class="grey--text">{{ menu.title }}</strong>
                </v-expansion-panel-header>

                <v-list-item
                  v-else
                  :key="menu.title"
                  @click="$router.push({ name: menu.route })"
                >
                  <v-list-item-icon>
                    <v-icon color="red"> </v-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle>
                        <strong class="grey--text">{{ menu.title }}</strong>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item-icon>
                </v-list-item>

                <v-expansion-panel-content>
                  <template v-for="item in menu.links">
                    <v-list-item
                      :key="item.title"
                      @click="$router.push({ name: item.route })"
                    >
                      <v-list-item-icon>
                        <v-icon color="red">mdi-logout </v-icon>
                        <v-list-item-content>
                          <v-list-item-subtitle>{{
                            item.title
                          }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item-icon>
                    </v-list-item>
                  </template>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-list>
        </v-navigation-drawer>
        <div class="mainDiv">
          <router-view />
        </div>
      </v-layout>
    </v-main>
  </v-app>
</template>

<script>
import { menusData } from "@/menuData";

export default {
  name: "App",

  data() {
    return {
      navDrawerShow: true,
      menus: [],
    };
  },
  created() {
    this.menus = menusData;
  },
};
</script>

<style scoped>
.navDrawer {
  cursor: pointer;
}
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
</style>
