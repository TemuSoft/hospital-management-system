<template>
  <div class="main">
    <h3>Medical Service</h3>
    <v-card flat>
      <v-layout>
        <v-spacer></v-spacer>
        <v-btn small @click="registerLabDialog = true">Add New</v-btn>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <v-btn small @click="registerLabGroupDialog = true"
          >Register Test Group</v-btn
        >
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <v-btn small @click="$router.push({ name: 'labratoryReport' })">
          Labratory Report
        </v-btn>
      </v-layout>
      <br />

      <v-data-table :items="dataList" :headers="headers"> </v-data-table>

      <v-dialog v-model="registerLabDialog" persistent width="700px">
        <v-card>
          <v-toolbar color="green" dark>Add New Labratory Service </v-toolbar>
          <br />
          <v-card-text>
            <v-layout>
              <v-flex xs12 sm1> </v-flex>
              <v-flex xs12 sm3> Type</v-flex>
              <v-flex xs12 sm8>
                <v-text-field dense outlined v-model="item.name"></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs12 sm1> </v-flex>
              <v-flex xs12 sm3> Cost</v-flex>
              <v-flex xs12 sm8>
                <v-text-field
                  type="number"
                  dense
                  outlined
                  v-model="item.cost"
                ></v-text-field>
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
                  v-model="item.staus"
                ></v-autocomplete>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs12 sm1> </v-flex>
              <v-flex xs12 sm3> Category</v-flex>
              <v-flex xs12 sm8>
                <v-autocomplete
                  dense
                  :items="statusList"
                  outlined
                  v-model="item.category"
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
              <v-btn small @click="registerLabDialog = false">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn small @click="save()">Save</v-btn>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerLabDialog: false,
      statusList: ["Active", "Not Active"],
      item: [],
      dataList: [],
      headers: [
        { text: "No", value: "no" },
        { text: "Name", value: "name" },
        { text: "Cost", value: "cost" },
        { text: "Status", value: "status" },
        { text: "Category", value: "category" },
        { text: "Description", value: "description" },
        { text: "Action", value: "action" },
      ],
    };
  },

  methods: {
    async save() {
      alert("save buton clicked");
    },
  },
};
</script>

<style scoped>
.main {
  margin: 7%;
  margin-top: 2%;
}
</style>
