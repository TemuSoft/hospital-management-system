<template>
  <v-card>
    <h3>Imaging Order</h3>
    <br />

    <v-layout>
      <v-combobox
        label="Imaging Test Case"
        :items="imagingtestcases"
        item-text="title"
        item-value="id"
        outlined
        dense
        multiple
        v-model="selectedImagingCaseToResgister"
        chips
      />
      <v-spacer />

      <v-btn
        v-if="selectedImagingCaseToResgister.length > 0"
        small
        outlined
        class="text-capitalize"
        @click="sendTestCases()"
        color="green"
      >
        Send Imaging Test Request
      </v-btn>
      <v-spacer />
      <v-spacer />
      <v-spacer />
    </v-layout>

    <v-data-table
      :items="patientImagingTestCasesData.data"
      :search="search"
      :headers="headersTestCase"
    >
      <template v-slot:item.number="{ item }">
        {{ patientImagingTestCasesData.data.indexOf(item) + 1 }}
      </template>

      <template v-slot:item.status="{ item }">
        <v-chip v-if="item.status === 0" color="yellow">Pendding</v-chip>
        <v-chip v-else-if="item.status === 1" color="green">Done</v-chip>
        <v-chip v-else color="blue">Outsourced</v-chip>
      </template>

      <template v-slot:item.action="{ item }">
        <Edit
          v-if="item.status === 2"
          class="icon"
          @click="editPatientTestCase(item)"
        />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import Edit from "@/assets/icons/edit.svg";
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
  },

  created() {
    this.loadData();
  },

  computed: {
    ...mapState("medicalService", ["imagingTestList"]),
    ...mapState("mainPatientInfoManager", ["patientImagingTestCasesData"]),
  },

  methods: {
    ...mapActions("medicalService", ["getImagingTestList"]),
    ...mapActions("mainPatientInfoManager", [
      "registerPatientImagingTestCase",
      "getPatientImagingTestCase",
    ]),

    async loadData() {
      await this.getPatientImagingTestCase(this.service_id);
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

      await this.registerPatientImagingTestCase(data);
      await this.getPatientImagingTestCase(this.service_id);
    },

    async editPatientTextCase(item) {
      alert(item.id);
    },

    async deletePatientTextCase(item) {
      alert(item.id);
    },
  },
};
</script>

<style scoped>
.icon {
  cursor: pointer;
}
</style>
