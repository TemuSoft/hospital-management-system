<template>
  <v-navigation-drawer fixed class="navDrawerLeft" absolute expand-on-hover>
    <perfect-scrollbar style="overflow: hidden">
      <v-list class="profile">
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
            <v-list-item-subtitle>temusoft2012@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense class="subMenu">
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
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>

<script>
import { menusData } from "@/menuData";

export default {
  data() {
    return {
      menus: [],
    };
  },

  created() {
    this.menus = menusData;
  },
};
</script>

<style scoped></style>
