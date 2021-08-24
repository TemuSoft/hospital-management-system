<template>
  <div class="main">
    <h3>Imaging Medical Service</h3>
    <v-card flat>
      <v-layout>
        <v-spacer></v-spacer>
        <v-btn small @click="registerImagingDialog = true" outlined
          >Add New</v-btn
        >
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <v-btn outlined small @click="$router.push({ name: 'imagingReport' })">
          Imaging Report
        </v-btn>
      </v-layout>
      <br />

      <v-data-table :items="imagingTestList" :headers="headers"> </v-data-table>

      <v-dialog v-model="registerImagingDialog" persistent width="700px">
        <v-card>
          <v-toolbar color="green" dark>Add New Imaging Test </v-toolbar>
          <br />
          <v-card-text>
            <v-form @submit.prevent="save" ref="form">
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
                  @click="registerImagingDialog = false"
                  >Cancel</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn small outlined color="green" @click="save()">Save</v-btn>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      registerImagingDialog: false,
      statusList: ["Active", "Not Active"],
      testInfo: {},
      inputRules: [(v) => !!v || "This field is required"],

      tests: [],
      headers: [
        { text: "No", value: "no" },
        { text: "Name", value: "name" },
        { text: "Cost", value: "cost" },
        { text: "Status", value: "status" },
        { text: "Description", value: "description" },
        { text: "Action", value: "action" },
      ],
    };
  },

  created() {
    this.loadData();
  },

  computed: {
    ...mapState("medicalService", ["registeredImaging", "imagingTestList"]),
  },

  methods: {
    ...mapActions("medicalService", ["registerImaging", "getImagingTestList"]),

    async loadData() {
      this.testInfo.created_by = "Temesgen";
      await this.getImagingTestList();
    },

    async save() {
      if (this.$refs.form.validate()) {
        await this.registeredImaging(this.testInfo);

        if (this.registeredImaging === true) this.registerImagingDialog = false;
        else alert("Somethong wrong plese try later");
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
