<template>
  <v-card>
    <h3>Labratory Order</h3>
    <br />

    <v-layout>
      <v-autocomplete
        label="Labratory Group"
        :items="labTestCasesGroup"
        item-text="title"
        item-value="id"
        outlined
        dense
        @click="loadTestCaseByGroup($event)"
        chips
      />
      <v-spacer />

      <v-autocomplete
        label="Lab Test Case"
        :items="labTestCases"
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
      :items="patientLabTestCasesData"
      :search="search"
      :headers="headersLabTestCase"
    >
      <template v-slot:item.action="{ item }">
        <Edit class="icon" @click="editPatientTestCase(item)" />
        <Delete class="icon" @click="deletePatientTestCase(item)" />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import Edit from "@/assets/icons/edit.svg";
import Delete from "@/assets/icons/delete.svg";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      headersTestCase: [
        { text: "Number", value: "no" },
        { text: "Group", value: "group" },
        { text: "Test Case", value: "title" },
        { text: "Result", value: "result" },
        { text: "Status", value: "status" },
        { text: "Result From", value: "result_from" },
        { text: "Action", value: "action" },
      ],
      selectedTestCaseToResgister: [],
    };
  },

  components: {
    Edit,
    Delete,
  },

  computed: {
    ...mapState("mainPatientInfoManager", ["patientLabTestCasesData"]),
  },

  methods: {
    ...mapActions("mainPatientInfoManager", [
      "registerPatientLabTestCase",
      "getPatientLabTestCase",
    ]),

    async sendTestCases() {
      alert(this.selectedTestCaseToResgister.length + " Test Case");
    },

    async editPatientTextCase(item) {
      alert(item.id);
    },

    async deletePatientTextCase(item) {
      alert(item.id);
    },

    async loadTestCaseByGroup(id) {
      alert("Lab group id " + id);
    },
  },
};
</script>

<style scoped></style>
