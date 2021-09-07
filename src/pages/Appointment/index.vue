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
        <v-btn small @click="registerAppoDialog = true" outlined color="green">
          Add New
        </v-btn>
      </v-layout>
      <br />

      <v-data-table
        :search="search"
        :items="singleAppointment"
        :headers="headers"
      >
        <template v-slot:item.date="{ item }">
          {{ item.date }} - {{ item.time }}
        </template>

        <template v-slot:item.action="{}">
          <Edit class="icon" @click="editAppointment(item)" />
          <v-btn
            style="margin-left: 20px"
            text
            color="red"
            small
            @click="cancelAppointment(item)"
            class="text-capitalize"
            >Cancel</v-btn
          >
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="registerAppoDialog" persistent width="700px">
      <MakeAppointment
        :appointmentInfo="appointmentInfo"
        :registerAppoDialog="registerAppoDialog"
      />
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import MakeAppointment from "./makeAppintment.vue";
import Edit from "@/assets/icons/edit.svg";

export default {
  data() {
    return {
      registerAppoDialog: false,
      search: "",
      appointmentInfo: {},
      assignedType: ["Assigned", "Not Assigned"],
      headers: [
        { text: "Card Number ", value: "card_number" },
        { text: "Patient Detail", value: "patient_full_name" },
        { text: "Date a& Time", value: "date" },
        { text: "Seated By", value: "setted_by" },
        { text: "Staff", value: "user" },
        { text: "Reason", value: "description" },
        { text: "Status", value: "status" },
        { text: "Action", value: "action" },
      ],
    };
  },

  components: {
    MakeAppointment,
    Edit,
  },

  created() {
    this.loadData();
  },

  computed: {
    ...mapState("appointment", ["appointmentLists", "singleAppointment"]),
  },

  methods: {
    ...mapActions("appointment", [
      "getAppointmentList",
      "getSingleAppointment",
    ]),

    async loadData() {
      // await this.getAppointmentList();
      await this.getSingleAppointment(2);
    },

    async editAppointment(item) {
      this.appointmentInfo = item;
      this.registerAppoDialog = true;
    },

    async cancelAppointment(item) {
      alert(item.id);
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
</style>
