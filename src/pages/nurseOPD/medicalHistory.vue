<template>
  <div>
    <v-card flat>
      <h2>Medical History</h2>
      <br />

      <v-form @submit.prevent="save" ref="save">
        <v-textarea
          v-model="mediaclHistoryInfo.chiefComplain"
          label="Chief Complain"
          outlined
          :rules="inputRules"
          rows="2"
        />

        <v-textarea
          v-model="mediaclHistoryInfo.assesment"
          label="Assesment"
          outlined
          :rules="inputRules"
          rows="2"
        />

        <v-textarea
          v-model="mediaclHistoryInfo.treatment"
          label="Treatemnt"
          outlined
          :rules="inputRules"
          rows="2"
        />
      </v-form>
      <br />

      <v-btn small outlined color="green" @click="save">Save</v-btn>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: ["service_id", "patientId"],

  data() {
    return {
      login_user: { id: 4, name: "Temesgen Kefie", role: "Nurse" },

      mediaclHistoryInfo: {},
      inputRules: [(v) => !!v || "This field is required"],
    };
  },

  computed: {
    ...mapState("medicalService", ["registeredMedicalHistory"]),
  },

  methods: {
    ...mapActions("medicalService", ["registerMedicalHistory"]),

    async save() {
      if (this.$refs.save.validate()) {
        this.mediaclHistoryInfo.user_id = this.login_user.id;
        this.mediaclHistoryInfo.service_id = this.service_id;
        this.mediaclHistoryInfo.patient_id = this.patientId;

        await this.registerMedicalHistory(this.mediaclHistoryInfo);

        if (this.registeredMedicalHistory === true) {
          this.mediaclHistoryInfo = {};

          this.$fire({
            title: "Medical History Registeration",
            text: "Something wrong please try again!!!",
            type: "success",
            timer: 7000,
          });
        } else
          this.$fire({
            title: "Medical History Registeration",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },
  },
};
</script>

<style scoped></style>
