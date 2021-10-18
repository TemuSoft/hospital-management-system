<template>
  <v-card flat>
    <h3>OPD</h3>
    <br />

    <v-layout>
      <v-spacer />
      <v-btn small class="text-capitalize green" @click="assignOPD()">
        Assign
      </v-btn>

      <!-- <v-spacer />
      <v-btn small class="text-capitalize green" @click="reAssignOPD()">
        Assign
      </v-btn> -->
    </v-layout>

    <v-data-table :items="assignedOPD" :headers="assignedOPDHeader">
    </v-data-table>
    <br />

    <v-form
      @submit.prevent="saveAssignOPD"
      ref="saveAssignOPD"
      v-show="assignedOPDVisable"
    >
      <v-layout>
        <v-autocomplete
          :items="opdList"
          v-model="assignOPDInfo.opd_id"
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
      assignedOPDVisable: true,

      assignedOPDHeader: [
        { text: "Name", vlaue: "full_name" },
        { text: "Start Time", vlaue: "start_time" },
        { text: "End Time", vlaue: "end_time" },
        { text: "Status", vlaue: "status" },
        { text: "Action", vlaue: "action" },
      ],
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
  },

  methods: {
    ...mapActions(
      "mainPatientInfoManager",
      "registerAssignedOPD",
      "getAssignedOPD"
    ),

    async loadData() {
      await this.getAssignedOPD(this.service_id);
      if (this.getAssignedOPD.length > 0) this.assignedOPDVisable = false;
    },

    async saveAssignOPD() {
      if (this.$refs.saveAssignOPD.validate()) {
        this.assignOPDInfo.user_id = this.login_user.id;

        alert(true);
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
