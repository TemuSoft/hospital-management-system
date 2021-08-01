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
        <v-btn small @click="registerAppoDialog = true">Add New</v-btn>
      </v-layout>
      <br />

      <v-data-table
        :search="search"
        :items="dataList"
        :headers="headers"
      ></v-data-table>
    </v-card>

    <v-dialog v-model="registerAppoDialog" persistent width="700px">
      <v-card>
        <v-toolbar color="green" dark>Register New Appointment </v-toolbar>
        <br />
        <v-card-text>
          <v-layout>
            <v-flex xs12 sm6>
              <v-autocomplete
                outlined
                dense
                :items="positionList"
                label="Patient"
                v-model="item.patient"
              ></v-autocomplete>
            </v-flex>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <v-flex xs12 sm6>
              <v-autocomplete
                outlined
                dense
                :items="positionList"
                label="Department"
                v-model="item.department"
              ></v-autocomplete>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm6>
              <v-text-field
                label="Date"
                dense
                outlined
                v-model="item.date"
              ></v-text-field>
            </v-flex>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <v-flex xs12 sm6>
              <v-text-field
                label="Time"
                type="time"
                dense
                outlined
                v-model="item.time"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm6>
              <v-autocomplete
                outlined
                dense
                :items="positionList"
                label="Doctor"
                v-model="item.doctor"
              ></v-autocomplete>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm12>
              <v-text-field
                label="Reason / Description"
                dense
                outlined
                v-model="item.description"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-spacer></v-spacer>
            <v-btn small @click="registerAppoDialog = false">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn small @click="save()">Save</v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({
    registerAppoDialog: false,
    search: "",
    dataList: [],
    item: [],
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
