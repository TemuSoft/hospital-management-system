<template>
  <v-card>
    <h3>Imaging Order</h3>
    <br />

    <v-layout>
      <v-autocomplete
        label="Imgaing Test Case"
        :items="imagingTestCases"
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
        @click="sendimagingTestCases()"
        color="green"
      >
        Send Imaging Test Request
      </v-btn>
      <v-spacer />
      <v-spacer />
      <v-spacer />
    </v-layout>

    <v-data-table
      :items="pateintImagingTestCasesData"
      :search="search"
      :headers="headersTestCase"
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
    ...mapState("mainPatientInfoManager", ["patientImagingTestCaseData"]),
  },

  methods: {
    ...mapActions("mainPatientInfoManager", [
      "registerPatientImagingTestCase",
      "getPatientImagingTestCase",
    ]),

    async sendLabTestCases() {
      alert(this.selectedTestCaseToResgister.length + " Test Case");
    },

    async editPatientTestCase(item) {
      alert(item.id);
    },

    async deletePatientTestCase(item) {
      alert(item.id);
    },
  },
};
</script>

<style scoped></style>
