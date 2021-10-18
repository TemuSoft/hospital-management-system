<template>
  <v-card flat>
    <h3 class="red--text">Clear Patient</h3>
    <br />

    <template v-if="clearedPatientInfo.length === 0">
      <v-form @submit.prevent="clearPatient" ref="clearPatient">
        <v-textarea
          v-model="clearPatientInfo.summary"
          :rules="inputRules"
          outlined
          label="Summary to clear patient"
        />

        <v-checkbox
          v-model="checkbox"
          label="Checked me to confirm please!"
          dense
        />

        <v-layout>
          <v-btn class="text-capitalize red" small @click="cancelCearPatient()">
            Cancel
          </v-btn>
          <v-spacer />

          <v-btn
            v-if="checkbox"
            class="text-capitalize green"
            small
            @click="clearPatient()"
          >
            Clear Patient
          </v-btn>
          <v-spacer />
        </v-layout>
      </v-form>
    </template>

    <template v-else>
      <v-textarea
        v-model="clearedPatientInfo[0].summary"
        :rules="inputRules"
        outlined
        :readonly="true"
        label="Summary to clear patient"
      />
    </template>
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
      clearPatientInfo: {},
      checkbox: false,
    };
  },

  created() {
    this.loadData();
  },

  computed: {
    ...mapState("mainPatientInfoManager", [
      "registeredClearPatient",
      "clearedPatientInfo",
    ]),
  },

  methods: {
    ...mapActions("mainPatientInfoManager", [
      "registerClearPatient",
      "getClearPatientInfo",
    ]),

    async loadData() {
      await this.getClearPatientInfo(this.service_id);
    },

    async cancelCearPatient() {
      this.clearPatientInfo = {};
    },

    async clearPatient() {
      if (this.$refs.clearPatient.validate()) {
        this.clearPatientInfo.user_id = this.login_user.id;
        this.clearPatientInfo.service_id = this.service_id;
        this.clearPatientInfo.patient_id = this.patientId;

        await this.registerClearPatient(this.clearPatientInfo);

        if (this.registerClearPatient.st === true) {
          this.clearPatientInfo = {};
          this.loadData();
        } else
          this.$fire({
            title: "Register Cleared Patient",
            text: this.registeredClearPatient.msg,
            type: "error",
            timer: 7000,
          });
      }
    },
  },
};
</script>

<style></style>
