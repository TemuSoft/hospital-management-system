<template>
  <div class="main">
    <h3>Appointment</h3>
    <v-card flat>
      <v-layout>
        <v-spacer></v-spacer>
        <v-spacer> </v-spacer
        ><v-text-field
          v-model="search"
          label="Enter search text ..."
          dense
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-autocomplete
          label="Assigned Type"
          outlined
          dense
          :items="assignedType"
        ></v-autocomplete>
        <v-spacer></v-spacer>
        <v-autocomplete
          label="Status"
          outlined
          dense
          :items="statusType"
        ></v-autocomplete>
        <v-spacer></v-spacer>
        <v-btn small>Add New</v-btn>
      </v-layout>
      <br />

      <v-data-table
        :search="search"
        :items="dataList"
        :headers="headers"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({
    search: "",
    dataList: [],
    assignedType: ["Assigned", "Not Assigned"],
    statusType: ["Active", "Not Active"],
    headers: [
      { text: "No", value: "no" },
      { text: "Patient Detail", value: "patientDetail" },
      { text: "Date a& Time", value: "dateTime" },
      { text: "Department", value: "department" },
      { text: "Doctor", value: "doctor" },
      { text: "Reason", value: "reason" },
      { text: "Status", value: "status" },
      { text: "Action", value: "action" },
    ],
  }),
  created() {},

  computed: {},
};
</script>

<style scoped>
.main {
  margin: 5%;
  margin-top: 2%;
}
</style>
