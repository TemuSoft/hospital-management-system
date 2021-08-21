<template>
  <div class="main">
    <br />
    <h2>Patinet List</h2>

    <v-card flat>
      <v-data-table :headers="headers" :items="patients" :search="search">
        <template v-slot:item.patient_type="{ item }">
          <label v-if="item.patient_type === 1">Regular</label>
          <label v-else-if="item.patient_type === 2">Credit</label>
          <label v-else-if="item.patient_type === 3">Organization</label>
          <label v-else-if="item.patient_type === 4">Temporary</label>
        </template>

        <template v-slot:item.action="{ item }">
          <Edit @click="item.id;" />
        </template>

        <template v-slot:item.first_name="{ item }">
          <label>
            {{ item.first_name }}
            {{ item.fathers_name }}
            {{ item.last_name }}
          </label>
        </template>

        <template v-slot:top>
          <v-layout>
            <v-text-field
              v-model="search"
              label="Enter search text ..."
              dense
              rounded
              :search="search"
            >
            </v-text-field>

            <v-spacer></v-spacer>
            <v-btn
              small
              outlined
              @click="$router.push({ name: 'regsiterPatinet' })"
            >
              Add New
            </v-btn>
          </v-layout>
        </template>

        <template v-slot:no-data>
          <h3>No Data available ...</h3>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Edit from "@/assets/icons/edit.svg";

export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "Card Number", value: "card_number" },
        { text: "Full Name", value: "first_name" },
        { text: "Gender", value: "gender" },
        { text: "Birthdate", value: "birthdate" },
        { text: "Phone Number", value: "phone_number" },
        { text: "Patient Type", value: "patient_type" },
        { text: "Guardian", value: "guardian_name" },
        { text: "Date", value: "registration_date" },
        { text: "Action", value: "action" },
      ],
    };
  },

  components: {
    Edit,
  },

  created() {
    this.loadData();
  },

  computed: {
    ...mapState("patient", ["patients"]),
  },

  methods: {
    ...mapActions("patient", ["getPatientList", "getPatientFilter"]),

    async loadData() {
      await this.getPatientList();
      // await this.getPatientFilter({
      //   key: "card_number",
      //   value: "Ga001",
      // });
    },
  },
};
</script>

<style scoped>
.main {
  margin: 5%;
  margin-top: 2%;
}
</style>
