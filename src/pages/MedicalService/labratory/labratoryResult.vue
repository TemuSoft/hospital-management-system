<template>
  <div class="main">
    <h3>Labratory Request</h3>

    <v-data-table :items="temp" :headers="labRequestHeaders" :search="search">
      <template v-slot:item.action="{ item }">
        <Edit @click="editLabrtoryResult(item)" class="icon" />
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
                <h3>{{ selectedResult.fullName }}</h3>
              </v-flex>

              <v-flex xs12 sm4>
                Card Number :
                <h3>{{ selectedResult.card_number }}</h3>
              </v-flex>

              <v-flex xs12 sm4>
                Total Lab Test :
                <h3>{{ selectedResult.totalLabTest }}</h3>
              </v-flex>
            </v-layout>
            <br />

            <br />
            <v-layout>
              <table>
                <tr>
                  <th>Need Referal</th>
                  <th>Group</th>
                  <th>Test Case</th>
                  <th>Result</th>
                </tr>

                <tr v-for="(ltr, i) in labtestResult" :key="i">
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
                  <td>{{ labtestResult[i].title }}</td>
                  <td>{{ labtestResult[i].group }}</td>
                  <td>
                    <v-text-field
                      v-if="!checkboxWhole[labtestResult[i].id]"
                      v-model="labtestResult[i].result"
                      :rules="inputRules"
                      dense
                      rounded
                    />
                    <label v-else style="color: red">Needs Referal</label>
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

export default {
  data() {
    return {
      inputRules: [(v) => !!v || "This field is required"],
      labtestResult: [
        { id: 1, title: "Test one", group: "Group one", result: "" },
        { id: 2, title: "Test Two", group: "Group one", result: "" },
        { id: 3, title: "Test Three", group: "Group one", result: "" },
      ],
      selectedResult: {},
      temp: [],
      checkboxWhole: {},
      search: "",
      enterLabResultDialog: false,
      labRequestHeaders: [
        { text: "Card Number", value: "card_number" },
        { text: "Full Name", value: "fullName" },
        { text: "Total Lab Test", value: "totalLabTest" },
        { text: "Status", value: "status" },
        { text: "Action", value: "action" },
      ],
    };
  },

  created() {
    this.loadData();

    this.temp = [
      {
        id: 56,
        card_number: "bdksj",
        fullName: "Temesgn Kefie",
        totalLabTest: "67",
        status: "1",
      },
      {
        id: 57,
        card_number: "bdksj",
        fullName: "Temesgn Kefie",
        totalLabTest: "67",
        status: "1",
      },
    ];
  },

  components: {
    Edit,
    Close,
    Checked,
    Unchecked,
  },

  computed: {
    ...mapState("medicalService", ["labratoryRequests"]),
  },

  methods: {
    ...mapActions("medicalService", ["getLabrtoryRequest"]),

    async loadData() {
      this.getLabrtoryRequest();
    },

    async saveResult() {
      if (this.$refs.saveResult.validate()) {
        alert("All input data id corrct");
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

    async editLabrtoryResult(item) {
      this.enterLabResultDialog = true;
      this.selectedResult = item;
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
</style>
