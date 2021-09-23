<template>
  <v-navigation-drawer fixed absolute expand-on-hover v-show="navDrawerShow">
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
            <div v-if="validateRole(menu.allowedRoles) === true">
              <v-expansion-panel-header
                v-if="menu.links && validateRole(menu.allowedRoles) === true"
              >
                <strong class="grey--text">{{ $t(menu.title) }}</strong>
              </v-expansion-panel-header>

              <v-list-item
                v-else
                :key="menu.title"
                @click="$router.push({ name: menu.route })"
              >
                <v-list-item-icon
                  v-if="validateRole(menu.allowedRoles) === true"
                >
                  <v-icon color="red"> </v-icon>
                  <v-list-item-content>
                    <v-list-item-subtitle>
                      <strong class="grey--text">{{ $t(menu.title) }}</strong>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item-icon>
              </v-list-item>
            </div>

            <v-expansion-panel-content>
              <template v-for="item in menu.links">
                <v-list-item
                  v-if="validateRole(item.allowedRoles) === true"
                  :key="item.title"
                  @click="$router.push({ name: item.route })"
                >
                  <v-list-item-icon>
                    <v-icon color="red">mdi-logout </v-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle>{{
                        $t(item.title)
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
import { mapState, mapActions } from "vuex";
import { menusData } from "@/menuData";

export default {
  name: "sideBar",
  data() {
    return {
      menus: [],
    };
  },

  created() {
    this.menus = menusData;
    this.loadData();
  },

  computed: {
    ...mapState("core", ["activeUser", "navDrawerShow"]),
  },

  methods: {
    ...mapActions("core", ["getActiveUser"]),

    async loadData() {
      await this.getActiveUser();
    },

    validateRole(rols) {
      let validated = false;

      if (rols.indexOf(this.activeUser) > -1) validated = true;
      else validated = false;

      validated = true;

      return validated;
    },
  },
};
</script>

<style scoped></style>
