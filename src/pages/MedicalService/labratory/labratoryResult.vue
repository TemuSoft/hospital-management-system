<template>
  <div class="main">
    <h3>Labratory Request</h3>

    <v-data-table
      :items="labratoryRequests"
      :headers="labRequestHeaders"
      :search="search"
    >
      <template v-slot:item.action="{ item }">
        <Edit
          @click="editLabrtoryResult(item.service_id, item.id, item.patient)"
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

    <v-dialog v-model="enterLabResultDialog" persistent width="900px">
      <v-card>
        <v-toolbar dense color="green">
          Enter Labratory Request Results
          <v-spacer />
          <Close @click="enterLabResultDialog = false" class="icon" />
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
                Total Lab Test :
                <h3>{{ labtestResult.length }}</h3>
              </v-flex>
            </v-layout>
            <br />

            <br />
            <v-layout>
              <table>
                <tr>
                  <th>Confiramtion</th>
                  <th>Test Case</th>
                  <th>Result</th>
                </tr>

                <tr v-for="(ltr, i) in labtestResult" :key="i">
                  <template
                    v-if="
                      labtestResult[i].status === 2 ||
                      labtestResult[i].verified === true
                    "
                  >
                    <td></td>
                    <td>{{ labtestResult[i].test_case_name }}</td>
                    <td>
                      <v-text-field
                        v-if="labtestResult[i].payment_status == 1"
                        class="tdCell"
                        v-model="labtestResult[i].result"
                        :rules="inputRules"
                        dense
                        outlined
                      />

                      <label
                        v-if="
                          labtestResult[i].payment_status == 0 &&
                          labtestResult[i].verified === true
                        "
                        style="color: red"
                      >
                        Payment No done yet
                      </label>

                      <label
                        v-if="labtestResult[i].status === 2"
                        style="color: red"
                      >
                        Outsourced
                      </label>
                    </td>
                  </template>

                  <template v-else-if="labtestResult[i].status === 1">
                    <td></td>
                    <td>{{ labtestResult[i].test_case_name }}</td>
                    <td>
                      <label>{{ labtestResult[i].result }}</label>
                    </td>
                  </template>

                  <template
                    v-else-if="
                      labtestResult[i].verified === false &&
                      labtestResult[i].status === 0
                    "
                  >
                    <td>
                      <checked
                        class="icon"
                        v-if="checkboxWhole[labtestResult[i].id] === true"
                        @click="checkboxWholeProcess(labtestResult[i].id, i)"
                      />
                      <unchecked
                        class="icon"
                        v-else
                        @click="checkboxWholeProcess(labtestResult[i].id, i)"
                      />
                    </td>
                    <td>{{ labtestResult[i].test_case_name }}</td>
                    <td>
                      <label v-if="!checkboxWhole[labtestResult[i].id]">
                      </label>
                      <label v-else style="color: Green">Verified</label>
                    </td>
                  </template>
                </tr>
              </table>
            </v-layout>

            <br />
            <v-layout>
              <v-btn
                :disabled="save_result_btn"
                small
                outlined
                color="green"
                @click="saveResult()"
                class="text-capitalize"
              >
                Save Results
              </v-btn>
              <v-spacer />

              <v-btn
                :disabled="verified_btn"
                small
                outlined
                color="blue"
                @click="saveVerified()"
                class="text-capitalize"
              >
                Verified
              </v-btn>
              <v-spacer />
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
      labtestResult: [],
      selectedResult: {},
      selectedId: "",

      save_result_btn: true,
      verified_btn: false,

      checkboxWhole: {},
      search: "",
      enterLabResultDialog: false,
      labRequestHeaders: [
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
      "labratoryRequests",
      "singleLabratoryRequests",
      "insertedLabRequestResult",
      "verifiedTestCase",
    ]),
  },

  methods: {
    ...mapActions("medicalService", [
      "getLabrtoryRequest",
      "getSingleLabrtoryRequest",
      "insertLabRequestResult",
      "insertLabRequestResultOutsource",
      "verificationTestCase",
    ]),

    async loadData() {
      await this.getLabrtoryRequest();
    },

    async saveResult() {
      if (this.$refs.saveResult.validate()) {
        let haveR = [];
        let haveNR = [];

        for (let i = 0; i < this.labtestResult.length; i++) {
          delete this.labtestResult[i].datetime;
          if (this.labtestResult[i].result === "")
            haveNR.push({ id: this.labtestResult[i].id, reason: "" });
          else haveR.push(this.labtestResult[i]);
        }
        for (let i = 0; i < haveR.length; i++) {
          haveR[i].examined_by = this.login_user.id;
          await this.insertLabRequestResult(haveR[i]);
        }

        if (this.insertedLabRequestResult === true) {
          await this.insertLabRequestResultOutsource({
            user_id: this.login_user.id,
            id: this.selectedId,
            cases: haveNR,
          });
          this.enterLabResultDialog = false;
          this.loadData();
        } else
          this.$fire({
            title: "Inseert Lab Test Case",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    async saveVerified() {
      let data = { user_id: this.login_user.id };
      let datamini = [];

      for (let i = 0; i < this.labtestResult.length; i++) {
        let id = this.labtestResult[i].id;

        if (this.checkboxWhole[id] === true)
          datamini.push({ id: id, verified: true, type: 1 });
        else datamini.push({ id: id, status: 2, type: 2 });
      }

      data.data = datamini;

      await this.verificationTestCase(data);

      if (this.verifiedTestCase == true) {
        this.enterLabResultDialog = false;
      } else
        this.$fire({
          title: "Verfication Lab Test Case",
          text: "Something wrong please try again!!!",
          type: "error",
          timer: 7000,
        });
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
      this.enterLabResultDialog = true;
      await this.getSingleLabrtoryRequest(service_id);
      this.labtestResult = this.singleLabratoryRequests.data;

      for (let i = 0; i < this.labtestResult.length; i++) {
        if (this.labtestResult[i].payment_status === 1) {
          this.save_result_btn = true;
          this.verified_btn = true;
          break;
        } else if (
          this.labtestResult[i].status === 2 ||
          this.labtestResult[i].verified === true
        ) {
          this.verified_btn = true;
        }
      }
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
  text-align: center;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.tdCell {
  height: 50px;
}
</style>
