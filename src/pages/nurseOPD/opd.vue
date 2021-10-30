<template>
  <v-card flat>
    <h3>OPD</h3>
    <br />
    <v-card flat v-if="canAssignOPD">
      <v-card v-if="assignedOPDVisable" class="ma-10 pa-5">
        <v-layout>
          Assigned By : {{ assignedOPD.opd_assigned_by }}
          <br />
          OPD Name : {{ assignedOPD.opd_name }}
          <br />
          Is Emeregency ? : {{ assignedOPD.is_emergency }}

          <v-spacer />

          Start Time : {{ assignedOPD.request_datetime }}
          <br />
          End Time : {{ served_datetime }}
          <br />
          Status : {{ assignedOPD.served_status }}
        </v-layout>
        <br />
        <v-btn small outlined class="green">Re-Assign</v-btn>
      </v-card>

      <v-form @submit.prevent="saveAssignOPD" ref="saveAssignOPD" v-else>
        <v-layout>
          <v-autocomplete
            :items="OPDStaffList"
            v-model="assignOPDInfo.opd_user_id"
            item-text="full_name"
            item-value="id"
            label="OPD"
            dense
            outlined
          />
          <v-spacer />

          <v-text-field
            v-model="assignOPDInfo.note"
            label="Note"
            outlined
            dense
          />
        </v-layout>
        <v-layout>
          <v-btn small class="text-capitalize red" @click="cancelAssignOPD()">
            Cancel
          </v-btn>
          <v-spacer />

          <v-btn small class="text-capitalize green" @click="saveAssignOPD()">
            Assign
          </v-btn>
          <v-spacer />
        </v-layout>
      </v-form>
    </v-card>

    <v-card flat v-else>
      <h1 class="red--text">
        It needs vital sign registeration before assign OPD
      </h1>
    </v-card>
  </v-card>
</template>

<script>
import AccountService from "@/network/accountService";
import { mapActions, mapState } from "vuex";

export default {
  props: ["service_id", "patientId"],
  data() {
    return {
      login_user: AccountService.getProfile(),
      inputRules: [(v) => !!v || "This field is required!!!"],
      assignOPDInfo: {},
      assignedOPDVisable: false,

      canAssignOPD: false,
    };
  },

  created() {
    this.loadData();
  },

  computed: {
    ...mapState("mainPatientInfoManager", [
      "registeredAssignedOPD",
      "assignedOPD",
    ]),
    ...mapState("dashboard", ["OPDStaffList"]),
    ...mapState("nurse", ["patientVitalSigns"]),
  },

  methods: {
    ...mapActions("mainPatientInfoManager", [
      "registerAssignedOPD",
      "getAssignedOPD",
    ]),
    ...mapActions("dashboard", ["getStaffListByRole"]),
    ...mapActions("nurse", ["getPatientVitalSigns"]),

    async loadData() {
      await this.getPatientVitalSigns(this.service_id);
      if (this.patientVitalSigns.length > 0) this.canAssignOPD = true;

      await this.getAssignedOPD(this.service_id);
      if (this.assignedOPD.id != undefined) this.assignedOPDVisable = true;

      await this.getStaffListByRole("opd");
    },

    async saveAssignOPD() {
      if (this.$refs.saveAssignOPD.validate()) {
        this.assignOPDInfo.user_id = this.login_user.id;
        this.assignOPDInfo.service_id = this.service_id;

        await this.registerAssignedOPD(this.assignOPDInfo);

        if (this.registeredAssignedOPD.st === true) {
          this.assignOPDInfo = {};
          this.loadData();
        } else
          this.$fire({
            title: "Assign OPD Registeration",
            text: this.registeredAssignedOPD.msg,
            type: "error",
            timer: 7000,
          });
      }
    },

    async cancelAssignOPD() {
      this.assignOPDInfo = {};
      this.assignedOPDVisable = false;
    },
  },
};
</script>

<style></style>
