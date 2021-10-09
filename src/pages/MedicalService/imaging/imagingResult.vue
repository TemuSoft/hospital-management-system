<template>
  <div class="main">
    <h3>Imaging Request</h3>

    <v-data-table
      :items="imagingRequests"
      :headers="imagingRequestHeaders"
      :search="search"
    >
      <template v-slot:item.action="{ item }">
        <Edit
          @click="editImagingResult(item.service_id, item.id, item.patient)"
          class="icon"
        />
      </template>

      <template v-slot:item.patient="{ item }">
        {{ item.patient.first_name }} {{ item.patient.fathers_name }}
      </template>

      <template v-slot:top>
        <br />
        <v-layout>
          <v-text-field
            v-model="search"
            label="Enter search text ..."
            dense
            rounded
            :search="search"
          />
          <v-spacer />
        </v-layout>
      </template>
    </v-data-table>

    <v-dialog v-model="enterImagingResultDialog" persistent width="900px">
      <v-card>
        <v-toolbar dense color="green">
          Enter Imaging Request Results
          <v-spacer />
          <Close @click="enterImagingResultDialog = false" class="icon" />
        </v-toolbar>
        <br />
        <v-card-text>
          <v-form @submit.prevent="saveResult" ref="saveResult">
            <v-layout>
              <v-flex xs12 sm4>
                Full Name :
                <h3>
                  {{ selectedResult.first_name }}
                  {{ selectedResult.fathers_name }}
                </h3>
              </v-flex>

              <v-flex xs12 sm4>
                Card Number :
                <h3>{{ selectedResult.card_number }}</h3>
              </v-flex>

              <v-flex xs12 sm4>
                Total Imaging Test :
                <h3>{{ imagingTestResult.length }}</h3>
              </v-flex>
            </v-layout>
            <br />

            <br />
            <v-layout>
              <table>
                <tr>
                  <th>Need Outsourced</th>
                  <th>Test Case</th>
                  <th>Result</th>
                </tr>

                <tr v-for="(ltr, i) in imagingTestResult" :key="i">
                  <td>
                    <checked
                      class="icon"
                      v-if="checkboxWhole[imagingTestResult[i].id] === true"
                      @click="checkboxWholeProcess(imagingTestResult[i].id, i)"
                    />
                    <unchecked
                      class="icon"
                      v-else
                      @click="checkboxWholeProcess(imagingTestResult[i].id, i)"
                    />
                  </td>
                  <td>{{ imagingTestResult[i].test_case_name }}</td>
                  <td>
                    <v-text-field
                      class="tdCell"
                      v-if="!checkboxWhole[imagingTestResult[i].id]"
                      v-model="imagingTestResult[i].result"
                      :rules="inputRules"
                      dense
                      outlined
                    />
                    <label v-else style="color: red">Outsourced</label>
                  </td>
                </tr>
              </table>
            </v-layout>

            <br />
            <v-layout>
              <v-btn small outlined text color="green" @click="saveResult()">
                Save Results
              </v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Edit from "@/assets/icons/edit.svg";
import Close from "@/assets/icons/close.svg";
import Checked from "@/assets/icons/checked.svg";
import Unchecked from "@/assets/icons/unchecked.svg";
import { mapActions, mapState } from "vuex";
import AccountService from "@/network/accountService";

export default {
  data() {
    return {
      login_user: AccountService.getProfile(),

      inputRules: [(v) => !!v || "This field is required"],
      imagingTestResult: [],
      selectedResult: {},
      selectedId: "",

      checkboxWhole: {},
      search: "",
      enterImagingResultDialog: false,
      imagingRequestHeaders: [
        { text: "Card Number", value: ".patient.card_number" },
        { text: "Full Name", value: "patient" },
        { text: "Who Sent Request", value: "opd_user" },
        { text: "Action", value: "action" },
      ],
    };
  },

  created() {
    this.loadData();
  },

  components: {
    Edit,
    Close,
    Checked,
    Unchecked,
  },

  computed: {
    ...mapState("medicalService", [
      "imagingRequests",
      "singleImagingRequests",
      "insertedImagingRequestResult",
    ]),
  },

  methods: {
    ...mapActions("medicalService", [
      "getImagingRequest",
      "getSingleImagingRequest",
      "insertImagingRequestResult",
      "insertImagingRequestResultOutsource",
    ]),

    async loadData() {
      await this.getImagingRequest();
    },

    async saveResult() {
      if (this.$refs.saveResult.validate()) {
        let haveR = [];
        let haveNR = [];

        for (let i = 0; i < this.imagingResult.length; i++) {
          delete this.imagingResult[i].datetime;
          if (this.imagingResult[i].result === "")
            haveNR.push({ id: this.imagingResult[i].id, reason: "" });
          else haveR.push(this.imagingResult[i]);
        }
        for (let i = 0; i < haveR.length; i++) {
          haveR[i].examined_by = this.login_user.id;
          await this.insertImagingRequestResult(haveR[i]);
        }

        if (this.insertedImagingRequestResult === true) {
          await this.insertImagingRequestResultOutsource({
            user_id: this.login_user.id,
            id: this.selectedId,
            cases: haveNR,
          });
          this.enterIimagingResultDialog = false;
          this.loadData();
        } else
          this.$fire({
            title: "Inseert Imaging Case",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    async checkboxWholeProcess(id, i) {
      this.checkboxWhole[id] = !this.checkboxWhole[id];
      if (this.checkboxWhole[id] === false) delete this.checkboxWhole[id];
      else this.labtestResult[i].result = "";

      let temp = this.checkboxWhole;
      this.checkboxWhole = {};
      this.checkboxWhole = temp;
    },

    async editLabrtoryResult(service_id, id, selectedResult) {
      this.selectedId = id;
      this.selectedResult = selectedResult;
      this.enterImagingResultDialog = true;
      await this.getSingleImagingRequest(service_id);
      this.imagingTestResult = this.singleImagingRequests.data;
    },
  },
};
</script>

<style scoped>
.main {
  margin: 5%;
  margin-top: 2%;
}

.icon {
  cursor: pointer;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}
td {
  justify-content: center;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.tdCell {
  height: 50px;
}
</style>
