<template>
  <div class="main">
    <h2>Roles & Permissions</h2>
    <br />
    <br />
    <v-tabs vertical>
      <v-btn style="width: 100%" small @click="registerRoleDialog = true">
        Add New Role
      </v-btn>
      <br />
      <br />

      <v-tab v-for="i in 6" :key="i">
        <v-icon left> mdi-account </v-icon>
        Role Adminstrator {{ i }}
      </v-tab>

      <v-tab-item style="margin-left: 6%">
        <v-card>
          <h3>Module Access</h3>
          <br />
          <br />

          <v-card-text> Main Body</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>

    <v-dialog v-model="registerRoleDialog" persistent width="700px">
      <v-card>
        <v-toolbar color="green" dark>Add New Role </v-toolbar>
        <br />
        <v-card-text>
          <v-layout>
            <v-flex xs12 sm1> </v-flex>
            <v-flex xs12 sm3> Name</v-flex>
            <v-flex xs12 sm8>
              <v-text-field dense outlined v-model="item.name"></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm1> </v-flex>
            <v-flex xs12 sm3> Status</v-flex>
            <v-flex xs12 sm8>
              <v-autocomplete
                dense
                :items="statusList"
                outlined
                v-model="item.status"
              ></v-autocomplete>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm1> </v-flex>
            <v-flex xs12 sm3> Description</v-flex>
            <v-flex xs12 sm8>
              <v-text-field
                dense
                outlined
                v-model="item.description"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-spacer></v-spacer>
            <v-btn small @click="registerRoleDialog = false">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn small @click="save()">Save</v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerRoleDialog: false,
      item: [],
      statusList: [],
    };
  },
};
</script>

<style scoped>
.main {
  margin: 15%;
  margin-top: 5%;
}
</style>
