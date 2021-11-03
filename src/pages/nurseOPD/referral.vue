<template>
  <v-card>
    <h3>Refferal</h3>
    <br />

    {{ registeredRefferal }}

    {{ refferalData }}
    <v-form @submit.prevent="save" ref="save">
      <v-textarea
        outlined
        rows="1"
        v-model="refferalInfo.history_physical_finding"
        label="History Physical Finding"
        :rules="inputRules"
      />
      <v-textarea
        outlined
        rows="1"
        v-model="refferalInfo.working_diagnosis"
        label="Working Diagnosis"
        :rules="inputRules"
      />
      <v-textarea
        outlined
        rows="1"
        v-model="refferalInfo.investigation_done"
        label="Investigation Done"
        :rules="inputRules"
      />
      <v-textarea
        outlined
        rows="1"
        v-model="refferalInfo.referal_differential_diagnosis"
        label="Differntial Diagnosis"
        :rules="inputRules"
      />
      <v-textarea
        outlined
        rows="1"
        v-model="refferalInfo.reason_for_referal"
        label="Reason"
        :rules="inputRules"
      />
      <v-textarea
        outlined
        rows="1"
        v-model="refferalInfo.feedback"
        label="Feedback"
        :rules="inputRules"
      />

      <v-layout v-if="refferalData.id === undefined">
        <v-btn small class="green text-capitalize" @click="save()">
          Save
        </v-btn>
        <v-spacer />

        <v-btn small class="red text-capitalize" @click="refferalInfo = {}">
          Cancel
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
  props: ["service_id", "patient_id"],

  data() {
    return {
      login_user: AccountService.getProfile(),
      inputRules: [(v) => !!v || "This field is required!!!"],

      refferalInfo: {},
    };
  },

  computed: {
    ...mapState("mainPatientInfoManager", [
      "registeredRefferal",
      "refferalData",
    ]),
  },

  created() {
    this.loadData();
  },

  methods: {
    ...mapActions("mainPatientInfoManager", [
      "registerRefferal",
      "getRefferalData",
    ]),

    async loadData() {
      await this.getRefferalData(this.service_id);
    },

    async save() {
      if (this.$refs.save.validate()) {
        this.refferalInfo.user_id = this.login_user.idl;
        this.refferalInfo.service_id = this.service_id;
        await this.registerRefferal(this.refferalInfo);

        if (this.registeredRefferal.st === true) {
          this.refferalInfo = {};
          this.loadData();
        } else
          this.$fire({
            title: "Assign OPD Registeration",
            text: this.registeredRefferal.msg,
            type: "error",
            timer: 7000,
          });
      }
    },
  },
};
</script>

<style scoped></style>
