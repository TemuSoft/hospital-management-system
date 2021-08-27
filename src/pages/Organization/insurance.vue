<template>
  <div class="main">
    <h2>Insurane</h2>
    <br />

    <v-data-table :headers="headers" :items="insuranes" :search="search">
      <template v-slot:item.action="{ item }">
        <Edit @click="editInsurance(item)" class="icon" />
        &nbsp;&nbsp;&nbsp;
        <Detail @click="detailInsurance(item)" class="icon" />
      </template>

      <template v-slot:top>
        <br />
        <v-layout>
          <v-text-field
            v-model="search"
            label="Enter search text ..."
            dense
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>

          <v-btn
            @click="registerInsuranceDialog = true"
            small
            prepend-icon="mdi-plus"
          >
            <v-icon left>mdi-plus</v-icon>Add New
          </v-btn>
        </v-layout>
        <br />
      </template>
    </v-data-table>

    <v-dialog v-model="updateInsuranceDialog" persistent width="700px">
      <v-card>
        <v-toolbar color="green" dark>Add New Insurane </v-toolbar>
        <br />
        <v-card-text>
          <v-form @submit.prevent="save" ref="save">
            <v-layout>
              <v-flex xs12 sm1> </v-flex>
              <v-flex xs12 sm3> Name</v-flex>
              <v-flex xs12 sm8>
                <v-text-field
                  dense
                  outlined
                  v-model="insuranceInfo.name"
                  :rules="inputRules"
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
                  item-text="name"
                  item-id="value"
                  :rules="inputRules"
                  v-model="insuranceInfo.status"
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
                  v-model="insuranceInfo.description"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-spacer></v-spacer>
              <v-btn small @click="cancelDialog()">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn small @click="save()">Save</v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="updateInsuranceDialog" persistent width="700px">
      <v-card>
        <v-toolbar color="green" dark>Update Insurane </v-toolbar>
        <br />
        <v-card-text>
          <v-form @submit.prevent="update" ref="update">
            <v-layout>
              <v-flex xs12 sm1> </v-flex>
              <v-flex xs12 sm3> Name</v-flex>
              <v-flex xs12 sm8>
                <v-text-field
                  dense
                  outlined
                  :rules="inputRules"
                  v-model="insuranceInfo.name"
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
                  item-text="name"
                  item-id="value"
                  v-model="insuranceInfo.status"
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
                  v-model="insuranceInfo.description"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-spacer></v-spacer>
              <v-btn small @click="cancelDialog()">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn small @click="update()">Update</v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Edit from "@/assets/icons/edit.svg";
import Detail from "@/assets/icons/eye.svg";

export default {
  data() {
    return {
      registerInsuranceDialog: false,
      updateInsuranceDialog: false,
      insuranceInfo: {},
      inputRules: [(v) => !!v || "This field is required"],
      statusList: [
        { name: "Active", value: 1 },
        { name: "Not Active", value: 0 },
      ],
      headers: [
        { text: "ID", value: "id" },
        { text: "Partner Name", value: "name" },
        { text: "Description", value: "description" },
        { text: "Status", value: "status" },
        { text: "Start Date", value: "startDate" },
        { text: "Action", value: "action" },
      ],
    };
  },

  components: {
    Edit,
    Detail,
  },

  created() {
    this.loadData();
  },

  mounted: {
    ...mapState("insurance", [
      "registeredInsurance",
      "updatedInsurance",
      "insurances",
    ]),
  },

  methods: {
    ...mapActions("insurance", [
      "registereInsurance",
      "updateInsurance",
      "getInsuranceList",
    ]),

    async loadData() {
      await this.getInsuranceList();
    },

    async save() {
      if (this.$refs.save.validate()) {
        this.insuranceInfo.created_by = "Temesegen";
        await this.registereInsurance(this.insuranceInfo);

        if (this.registeredInsurance === true) {
          this.registerInsuranceDialog = false;
          this.loadData();
        } else
          this.$fire({
            title: "Insurance Registeration",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    async updte() {
      if (this.$refs.update.validate()) {
        this.insuranceInfo.updated_by = "Temesegen";
        await this.updateInsurance(this.insuranceInfo);

        if (this.updatedInsurance === true) {
          this.updateInsuranceDialog = false;
          this.insuranceInfo = {};
          await this.loadData();
        } else
          this.$fire({
            title: "Insurance Info Update",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    async cancelDialog() {
      this.registerInsuranceDialog = false;
      this.updateInsuranceDialog = false;
      this.insuranceInfo = {};
    },

    async editInsurance(item) {
      this.insuranceInfo = item;
      this.updateInsuranceDialog = true;
    },

    async detailInsurance(item) {
      this.$router.push({
        name: "insuranceDetail",
        params: { insuranceId: item.id },
      });
    },
  },
};
</script>

<style scoped>
.main {
  margin: 7%;
  margin-top: 2%;
}

.icon {
  cursor: pointer;
}
</style>
