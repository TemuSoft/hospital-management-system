<template>
  <div class="main">
    <h3>Appointment</h3>
    <br />

    <v-card flat>
      <v-layout>
        <v-text-field
          v-model="search"
          label="Enter search text ..."
          dense
          single-line
          hide-details
        />
        <v-spacer />

        <v-autocomplete
          label="Status"
          outlined
          dense
          :items="statusType"
          item-text="text"
          item-value="value"
        />
        <v-spacer />

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

        <template v-slot:item.action="{ item }">
          <Edit class="icon" @click="editAppointment(item)" />
          <v-btn
            style="margin-left: 20px"
            text
            color="red"
            small
            @click="cancelAppointment(item)"
            class="text-capitalize"
          >
            Cancel
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="registerAppoDialog" persistent width="700px">
      <MakeAppointment
        :appointmentInfo="appointmentInfo"
        @registerAppo="dialogControl($event)"
      />
    </v-dialog>

    {{ appointmentUpdateInfo }}
    <v-dialog v-model="updateAppoDialog" persistent width=" 700px">
      <v-card>
        <v-toolbar dense color="green" dark>
          Update Appointment
          <v-spacer />

          <Close class="icon" @click="updateAppoDialog = false" />
        </v-toolbar>
        <br />
        <v-card-text>
          <v-form @submit.prevent="update" ref="update">
            <v-layout>
              <v-flex xs12 sm6>
                <v-autocomplete
                  :items="patients"
                  outlined
                  dense
                  item-text="card_number"
                  item-value="id"
                  label="Patient"
                  v-model="appointmentUpdateInfo.patient_id"
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
                  v-model="appointmentUpdateInfo.department_id"
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
                  v-model="appointmentUpdateInfo.date"
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
                  v-model="appointmentUpdateInfo.time"
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
                  v-model="appointmentUpdateInfo.setted_to_user"
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
                  v-model="appointmentUpdateInfo.description"
                />
              </v-flex>
            </v-layout>

            <v-layout>
              <v-spacer />
              <v-btn color="green" outlined small @click="update()"
                >Update</v-btn
              >
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import MakeAppointment from "./makeAppintment.vue";
import AccountService from "@/network/accountService";
import Edit from "@/assets/icons/edit.svg";
import Close from "@/assets/icons/close.svg";

export default {
  data() {
    return {
      login_user: AccountService.getProfile(),
      registerAppoDialog: false,
      search: "",
      appointmentInfo: {},
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
      statusType: [
        { text: "Today", value: 1 },
        { text: "Done", value: 2 },
        { text: "Future", value: 3 },
      ],

      updateAppoDialog: false,
      appointmentUpdateInfo: {},
    };
  },

  components: {
    MakeAppointment,
    Edit,
    Close,
  },

  created() {
    this.loadData();
  },

  computed: {
    ...mapState("appointment", ["appointmentLists", "singleAppointment"]),
    ...mapState("department", ["departments", "staffInDepartent"]),
  },

  methods: {
    ...mapActions("appointment", [
      "getAppointmentList",
      "getSingleAppointment",
    ]),
    ...mapActions("department", ["getDepartmentList", "getStaffsInDepartment"]),

    async loadData() {
      // await this.getAppointmentList();
      await this.getDepartmentList();
      await this.getSingleAppointment(this.login_user.id);
    },

    async editAppointment(item) {
      this.appointmentUpdateInfo = item;
      this.updateAppoDialog = true;
      this.staffInDepertment(item.department_id);
    },

    async staffInDepertment(id) {
      await this.getStaffsInDepartment(id);
    },

    async cancelAppointment(item) {
      alert(item.id);
    },

    dialogControl(registerAppoDialog) {
      this.registerAppoDialog = registerAppoDialog;
      this.loadData();
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
