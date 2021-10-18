<template>
  <div>
    <v-card>
      <v-toolbar dense color="green" dark>
        Register New Appointment
        <v-spacer />

        <Close class="icon" @click="dialogControl()" />
      </v-toolbar>
      <br />
      <v-card-text>
        <v-form @submit.prevent="save" ref="save">
          <v-layout>
            <v-flex xs12 sm6>
              <v-autocomplete
                :items="patients"
                outlined
                dense
                item-text="card_nmber"
                item-value="id"
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
            <v-spacer />
            <v-btn color="green" outlined small @click="save()">Save</v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Close from "@/assets/icons/close.svg";
import AccountService from "@/network/accountService";

export default {
  props: ["appointmentInfo"],
  data() {
    return {
      login_user: AccountService.getProfile(),
      inputRules: [(v) => !!v || "This field is required"],
      statusType: ["Active", "Not Active"],
    };
  },

  components: {
    Close,
  },

  created() {
    this.loadData();
  },

  computed: {
    ...mapState("department", ["departments", "staffInDepartent"]),
    ...mapState("appointment", ["makedAppointment"]),

    ...mapState("patient", ["patients"]),
  },

  methods: {
    ...mapActions("patient", ["getPatientList"]),
    ...mapActions("department", ["getDepartmentList", "getStaffsInDepartment"]),
    ...mapActions("appointment", [
      "getAppointmentList",
      "getSingleAppointment",
      "makeAppointment",
    ]),

    ...mapActions("patient", ["getPatientList"]),

    async loadData() {
      await this.getPatientList();
      await this.getDepartmentList();
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

    dialogControl() {
      this.$emit("registerAppo", false);
    },
  },
};
</script>

<style scoped>
.icon {
  cursor: pointer;
}
</style>
