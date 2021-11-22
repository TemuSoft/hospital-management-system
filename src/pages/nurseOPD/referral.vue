<template>
  <v-card>
    <h3>Refferal</h3>
    <br />

    <h3 v-if="haveRefferal" class="green--text">
      Date : {{ new Date(this.refferalData.datetime).toDateString() }}
    </h3>
    <br />
    <v-form @submit.prevent="save" ref="save">
      <v-textarea
        outlined
        rows="1"
        v-model="refferalInfo.history_physical_finding"
        label="History Physical Finding"
        :rules="inputRules"
        :readonly="haveRefferal"
      />
      <v-textarea
        outlined
        rows="1"
        v-model="refferalInfo.working_diagnosis"
        label="Working Diagnosis"
        :rules="inputRules"
        :readonly="haveRefferal"
      />
      <v-textarea
        outlined
        rows="1"
        v-model="refferalInfo.investigation_done"
        label="Investigation Done"
        :rules="inputRules"
        :readonly="haveRefferal"
      />
      <v-textarea
        outlined
        rows="1"
        v-model="refferalInfo.referal_differential_diagnosis"
        label="Differntial Diagnosis"
        :rules="inputRules"
        :readonly="haveRefferal"
      />
      <v-textarea
        outlined
        rows="1"
        v-model="refferalInfo.reason_for_referal"
        label="Reason"
        :rules="inputRules"
        :readonly="haveRefferal"
      />
      <v-textarea
        outlined
        rows="1"
        v-model="refferalInfo.feedback"
        label="Feedback"
        :rules="inputRules"
        :readonly="haveRefferal"
      />

      <v-layout v-show="!haveRefferal">
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
import PrintPdf from "@/print";

export default {
  props: ["service_id", "patient_id"],

  data() {
    return {
      login_user: AccountService.getProfile(),
      inputRules: [(v) => !!v || "This field is required!!!"],

      refferalInfo: {},
      haveRefferal: false,
    };
  },

  computed: {
    ...mapState("mainPatientInfoManager", [
      "registeredRefferal",
      "refferalData",
    ]),
    ...mapState("patient", ["singlePatient"]),
  },

  created() {
    this.loadData();
  },

  methods: {
    ...mapActions("mainPatientInfoManager", [
      "registerRefferal",
      "getRefferalData",
    ]),
    ...mapActions("patient", ["singlePatientInfo"]),

    async loadData() {
      await this.singlePatientInfo(this.patient_id);
      await this.getRefferalData(this.service_id);
      if (this.refferalData.id != undefined) {
        this.refferalInfo = this.refferalData;
        this.haveRefferal = true;
      }
    },

    async save() {
      if (this.$refs.save.validate()) {
        this.refferalInfo.user_id = this.login_user.id;
        this.refferalInfo.service_id = this.service_id;
        await this.registerRefferal(this.refferalInfo);

        if (this.registeredRefferal.st === true) {
          let data = {
            singlePatient: this.singlePatient[0],
            refferalInfo: this.refferalInfo,
          };
          PrintPdf.refferalPrinting(data);
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
