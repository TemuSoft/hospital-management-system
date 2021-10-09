<template>
  <div>
    <div>
      <h3>Vital Sign</h3>
      <br />
      <v-form @submit.prevent="savePatientVitalSign" ref="savePatientVitalSign">
        <v-layout>
          <v-autocomplete
            label="Vital Signs"
            dense
            outlined
            :items="vitalSigns"
            item-text="name"
            item-value="id"
            :rules="inputRules"
            v-model="patientVitalSignInfo.vital_sign_id"
          />
          <v-spacer />
          <v-text-field
            dense
            :rules="inputRules"
            v-model="patientVitalSignInfo.result"
            outlined
            label="Description / Value"
          />
          <v-spacer />
          <v-btn
            text
            outlined
            color="green"
            class="text-capitalize"
            @click="registerPatientVitalSign()"
            >Register</v-btn
          >
        </v-layout>
      </v-form>

      <v-data-table :items="patientVitalSigns" :headers="patientVSHeaders">
        <template v-slot:item.action="{ item }">
          <Edit class="icon" @click="editPatientVitalSign(item)" />
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Edit from "@/assets/icons/edit.svg";
// import Close from "@/assets/icons/close.svg";


import AccountService from "@/network/accountService";

export default {
  props: ["service_id"],
  data() {
    return {
      login_user: AccountService.getProfile(),

      inputRules: [(v) => !!v || "This field is required"],
      patientVitalSignInfo: {},
      patientVSHeaders: [
        { text: "Vistal Name", value: "vital_sign.name" },
        { text: "Result", value: "result" },
        { text: "Action", value: "action" },
      ],
    };
  },

  components: {
    Edit,
    // Close,
  },

  created() {
    this.loadData();
  },

  computed: {
    ...mapState("nurse", ["vitalSigns", "patientVitalSigns"]),
  },

  methods: {
    ...mapActions("nurse", [
      "getVitalSignsList",
      "getPatientVitalSigns",
      "patientVitalSignsRegisteration",
    ]),

    async loadData() {
      await this.getPatientVitalSigns(this.service_id);
    },

    async registerPatientVitalSign() {
      if (this.$refs.savePatientVitalSign.validate()) {
        this.patientVitalSignInfo.service_id = this.service_id;
        this.patientVitalSignInfo.user_id = this.login_user.id;
        await this.patientVitalSignsRegisteration(this.patientVitalSignInfo);
        await this.loadData();
      }
    },

    async editPatientVitalSign(item) {
      alert(item.id);
    },
  },
};
</script>

<style scoped>
.icon {
  cursor: pointer;
}
</style>
