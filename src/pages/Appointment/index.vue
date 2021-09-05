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
      {{ singleAppointment }}
      <v-data-table
        :search="search"
        :items="singleAppointment"
        :headers="headers"
      >
        <template v-slot:item.date="{ item }">
          {{ item.date }} , {{ item.time }}
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="registerAppoDialog" persistent width="700px">
      <v-card>
        <v-toolbar dense color="green" dark>
          Register New Appointment
        </v-toolbar>
        <br />
        <v-card-text>
          <v-form @submit.prevent="save" ref="save">
            <v-layout>
              <v-flex xs12 sm6>
                <v-text-field
                  outlined
                  dense
                  label="Patient"
                  v-model="appointmentInfo.patient_id"
                />
              </v-flex>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <v-flex xs12 sm6>
                <v-autocomplete
                  outlined
                  dense
                  item-text="name"
                  item-value="id"
                  :rules="inputRules"
                  :items="departments"
                  label="Department"
                  @change="staffInDepertment($event)"
                />
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs12 sm6>
                <v-text-field
                  label="Date"
                  dense
                  type="date"
                  :rules="inputRules"
                  outlined
                  v-model="appointmentInfo.date"
                />
              </v-flex>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <v-flex xs12 sm6>
                <v-text-field
                  label="Time"
                  type="time"
                  :rules="inputRules"
                  dense
                  outlined
                  v-model="appointmentInfo.time"
                />
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs12 sm6>
                <v-autocomplete
                  outlined
                  dense
                  item-text="first_name"
                  item-value="id"
                  :items="staffInDepartent"
                  label="Staff"
                  v-model="appointmentInfo.setted_to_user"
                />
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs12 sm12>
                <v-text-field
                  label="Reason / Description"
                  dense
                  outlined
                  :rules="inputRules"
                  v-model="appointmentInfo.description"
                />
              </v-flex>
            </v-layout>

            <v-layout>
              <v-spacer></v-spacer>
              <v-btn small @click="registerAppoDialog = false">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn small @click="save()">Save</v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      login_user: { id: 4, name: "Temesgen Kefie", role: "Nurse" },
      inputRules: [(v) => !!v || "This field is required"],

      registerAppoDialog: false,
      search: "",
      appointmentInfo: {},
      assignedType: ["Assigned", "Not Assigned"],
      statusType: ["Active", "Not Active"],
      headers: [
        { text: "Card Number ", value: "card_number" },
        { text: "Patient Detail", value: "patientDetail" },
        { text: "Date a& Time", value: "date" },
        { text: "Seated By", value: "setted_by" },
        { text: "Staff", value: "user" },
        { text: "Reason", value: "reason" },
        { text: "Status", value: "status" },
        { text: "Action", value: "action" },
      ],
    };
  },

  components: {},

  created() {
    this.loadData();
  },

  computed: {
    ...mapState("department", ["departments", "staffInDepartent"]),
    ...mapState("appointment", [
      "appointmentLists",
      "singleAppointment",
      "makedAppointment",
    ]),
  },

  methods: {
    ...mapActions("patient", ["getPatientList"]),
    ...mapActions("department", ["getDepartmentList", "getStaffsInDepartment"]),
    ...mapActions("appointment", [
      "getAppointmentList",
      "getSingleAppointment",
      "makeAppointment",
    ]),

    async loadData() {
      await this.getPatientList();
      await this.getDepartmentList();
      // await this.getAppointmentList();
      await this.getSingleAppointment(1);
    },

    async save() {
      if (this.$refs.save.validate()) {
        this.appointmentInfo.user_id = this.login_user.id;
        await this.makeAppointment(this.appointmentInfo);

        if (this.makedAppointment == true) {
          this.registerAppoDialog = false;
          this.loadData();
        } else
          this.$fire({
            title: "Make Appointment!",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    async staffInDepertment(id) {
      await this.getStaffsInDepartment(id);
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
