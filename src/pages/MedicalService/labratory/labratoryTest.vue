<template>
  <div class="main">
    <h3>Labratory Medical Service</h3>
    <v-card flat>
      <v-layout>
        <v-spacer></v-spacer>
        <v-btn small @click="registerLabDialog = true" outlined>Add New</v-btn>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <v-btn small @click="registerLabGroupDialog = true" outlined
          >Register Test Group</v-btn
        >
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <v-btn
          outlined
          small
          @click="$router.push({ name: 'labratoryReport' })"
        >
          Labratory Report
        </v-btn>
      </v-layout>
      <br />

      <v-data-table :items="tests" :headers="headers"> </v-data-table>

      <v-dialog v-model="registerLabDialog" persistent width="700px">
        <v-card>
          <v-toolbar color="green" dark>Add New Labratory Test </v-toolbar>
          <br />
          <v-card-text>
            <v-form @submit.prevent="save" ref="form">
              <v-layout>
                <v-flex xs12 sm1> </v-flex>
                <v-flex xs12 sm3> Category</v-flex>
                <v-flex xs12 sm8>
                  <v-autocomplete
                    dense
                    :items="labratoryGroup"
                    outlined
                    :rules="inputRules"
                    v-model="testInfo.group"
                  ></v-autocomplete>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-flex xs12 sm1> </v-flex>
                <v-flex xs12 sm3> Type</v-flex>
                <v-flex xs12 sm8>
                  <v-text-field
                    dense
                    outlined
                    :rules="inputRules"
                    v-model="testInfo.name"
                  ></v-text-field>
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
                    :rules="inputRules"
                    v-model="testInfo.cost"
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
                    :rules="inputRules"
                    v-model="testInfo.status"
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
                    v-model="testInfo.description"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-spacer></v-spacer>
                <v-btn
                  small
                  outlined
                  color="red"
                  @click="registerLabDialog = false"
                  >Cancel</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn small outlined color="green" @click="save()">Save</v-btn>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="registerLabGroupDialog" persistent width="500px">
        <v-card>
          <v-toolbar dense color="green">Register Labratory Group</v-toolbar>
          <br />
          <br />

          <v-card-text>
            <v-form @submit.prevent="saveGroup" ref="saveGroup">
              <v-layout>
                <v-flex xs12 sm1> </v-flex>
                <v-flex xs12 sm3> Name</v-flex>
                <v-flex xs12 sm8>
                  <v-text-field
                    dense
                    outlined
                    :rules="inputRules"
                    v-model="labgroupInfo.name"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-spacer></v-spacer>
                <v-btn
                  small
                  outlined
                  color="red"
                  @click="registerLabGroupDialog = false"
                  >Cancel</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn small outlined color="green" @click="saveGroup()"
                  >Save</v-btn
                >
              </v-layout>
            </v-form>
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
      registerLabGroupDialog: false,
      statusList: ["Active", "Not Active"],
      testInfo: {},
      labgroupInfo: {},
      inputRules: [(v) => !!v || "This field is required"],

      tests: [],
      headers: [
        { text: "No", value: "no" },
        { text: "Name", value: "name" },
        { text: "Cost", value: "cost" },
        { text: "Status", value: "status" },
        { text: "Group", value: "group" },
        { text: "Description", value: "description" },
        { text: "Action", value: "action" },
      ],
    };
  },

  methods: {
    async save() {
      if (this.$refs.form.validate()) {
        alert("Input valid");
      }
    },

    async saveGroup() {
      if (this.$refs.saveGroup.validate()) {
        alert("Input for group registeration corrct");
      }
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
