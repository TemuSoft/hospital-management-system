<template>
  <v-card>
    <h3>Labratory Order</h3>
    <br />

    <v-layout>
      <v-autocomplete
        label="Labratory Group"
        :items="labratoryGroup"
        item-text="title"
        item-value="id"
        outlined
        dense
        @change="loadTestCaseByGroup($event)"
        chips
      />
      <v-spacer />

      <v-combobox
        label="Lab Test Case"
        :items="labtestcases"
        item-text="title"
        item-value="id"
        outlined
        dense
        multiple
        v-model="selectedTestCaseToResgister"
        chips
      />
      <v-spacer />

      <v-btn
        v-if="selectedTestCaseToResgister.length > 0"
        small
        outlined
        class="text-capitalize"
        @click="sendTestCases()"
        color="green"
      >
        Send Lab Test Request
      </v-btn>
      <v-spacer />
      <v-spacer />
      <v-spacer />
    </v-layout>

    <v-data-table
      :items="patientLabTestCasesData.data"
      :search="search"
      :headers="headersTestCase"
    >
      <template v-slot:item.number="{ item }">
        {{ patientLabTestCasesData.data.indexOf(item) + 1 }}
      </template>

      <template v-slot:item.status="{ item }">
        <v-chip v-if="item.status === 0" color="yellow">Pendding</v-chip>
        <v-chip v-else-if="item.status === 1" color="green">Done</v-chip>
        <v-chip v-else color="blue">Outsourced</v-chip>
      </template>

      <template v-slot:item.action="{ item }">
        <Edit class="icon" @click="editPatientTestCase(item)" />
        <Delete
          style="margin-left: 20px"
          class="icon"
          @click="deletePatientTestCase(item)"
        />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import Edit from "@/assets/icons/edit.svg";
import Delete from "@/assets/icons/delete.svg";
import { mapActions, mapState } from "vuex";

export default {
  props: ["service_id"],
  data() {
    return {
      login_user: { id: 4, name: "Temesgen Kefie", role: "Nurse" },

      headersTestCase: [
        { text: "Number", value: "number" },
        { text: "Test Case", value: "test_case_name" },
        { text: "Result", value: "result" },
        { text: "Status", value: "status" },
        { text: "Action", value: "action" },
      ],
      selectedTestCaseToResgister: [],
    };
  },

  components: {
    Edit,
    Delete,
  },

  created() {
    this.loadData();
  },

  computed: {
    ...mapState("medicalService", ["labratoryGroup", "labtestcases", ""]),
    ...mapState("mainPatientInfoManager", ["patientLabTestCasesData"]),
  },

  methods: {
    ...mapActions("medicalService", [
      "getLabratoryGroup",
      "getTestCaseByGroup",
    ]),
    ...mapActions("mainPatientInfoManager", [
      "registerPatientLabTestCase",
      "getPatientLabTestCase",
    ]),

    async loadData() {
      await this.getLabratoryGroup();
      await this.getPatientLabTestCase(this.service_id);
    },

    async sendTestCases() {
      let cases = [];
      for (let i = 0; i < this.selectedTestCaseToResgister.length; i++)
        cases.push(this.selectedTestCaseToResgister[i].id);
      let data = {
        data: {
          service_id: this.service_id,
          user_id: this.login_user.id,
        },
        cases: cases,
      };

      await this.registerPatientLabTestCase(data);
      await this.getPatientLabTestCase(this.service_id);
    },

    async editPatientTextCase(item) {
      alert(item.id);
    },

    async deletePatientTextCase(item) {
      alert(item.id);
    },

    async loadTestCaseByGroup(id) {
      await this.getTestCaseByGroup(id);
    },
  },
};
</script>

<style scoped>
.icon {
  cursor: pointer;
}
</style>
