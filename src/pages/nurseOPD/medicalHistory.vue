<template>
  <div>
    <v-card flat>
      <h2>Medical History</h2>
      <br />

      <v-card flat v-if="!currentMedicalHistoryRegister">
        <v-form @submit.prevent="save" ref="save">
          <v-textarea
            v-model="mediaclHistoryInfo.chief_complain"
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

      <v-tabs v-if="medicalHistorys.length > 0">
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab
          v-for="info in medicalHistorys"
          :key="info"
          @click.stop="loadMedicalHistory(info)"
          class="text-capitalize"
        >
          {{ new Date(info.date_time).toISOString().substr(0, 10) }}
        </v-tab>
        <v-tabs-items style="margin-left: 3%">
          <h2 class="text green mb-3">
            Served Physician : {{ selectedMedicalHistory.served_physician }}
          </h2>
          <v-card class="pa-5 mb-5" elevation="5" outlined>
            <h3>Chief Complain</h3>
            {{ selectedMedicalHistory.chief_complain }}
          </v-card>

          <v-card class="pa-5 mb-5" elevation="5" outlined>
            <h3>Assesment</h3>
            {{ selectedMedicalHistory.assesment }}
          </v-card>

          <v-card class="pa-5 mb-5" elevation="" outlined>
            <h3>Treatment</h3>
            {{ selectedMedicalHistory.treatment }}
          </v-card>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AccountService from "@/network/accountService";

export default {
  props: ["service_id", "patientId"],

  data() {
    return {
      login_user: AccountService.getProfile(),

      selectedMedicalHistory: {},
      mediaclHistoryInfo: {},
      inputRules: [(v) => !!v || "This field is required"],
      currentMedicalHistoryRegister: false,
    };
  },

  created() {
    this.patient_id = parseInt(this.patientId);
    this.loadData();
  },

  computed: {
    ...mapState("medicalService", [
      "registeredMedicalHistory",
      "medicalHistorys",
    ]),
  },

  methods: {
    ...mapActions("medicalService", [
      "registerMedicalHistory",
      "getMedicalHistory",
    ]),

    async loadData() {
      await this.getMedicalHistory(this.patient_id);
      if (this.medicalHistorys.length > 0)
        this.selectedMedicalHistory = this.medicalHistorys[0];

      for (let i = 0; i < this.medicalHistorys.length; i++)
        if (this.service_id === this.medicalHistorys[i].service_id)
          this.currentMedicalHistoryRegister = true;
    },

    async save() {
      if (this.$refs.save.validate()) {
        this.mediaclHistoryInfo.user_id = this.login_user.id;
        this.mediaclHistoryInfo.service_id = this.service_id;
        this.mediaclHistoryInfo.patient_id = this.patient_id;

        await this.registerMedicalHistory(this.mediaclHistoryInfo);

        if (this.registeredMedicalHistory.st === true) {
          this.mediaclHistoryInfo = {};

          this.loadData();
        } else
          this.$fire({
            title: "Medical History Registeration",
            text: this.registeredMedicalHistory.msg,
            type: "error",
            timer: 7000,
          });
      }
    },

    async loadMedicalHistory(data) {
      this.selectedMedicalHistory = data;
    },
  },
};
</script>

<style scoped></style>
