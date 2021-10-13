<template>
  <div class="main">
    <v-layout>
      <h2 class="m-5">Annaul Plan</h2>
      <v-spacer />

      <v-btn
        small
        class="text-capitalize green"
        @click="registerAnnualPlanDialog = true"
      >
        Add Annaul Plan
      </v-btn>
    </v-layout>
    <v-divider />

    <v-card class="pb-4" flat v-for="(data, i) in 3" :key="i">
      <v-card elevation="5" outlined class="pa-3">
        <h3>Year and date / Title</h3>
        <v-divider />
        <br />

        <v-layout>
          <p>Description</p>
          <v-spacer />
          <Filedownload class="icon mr-5" />
        </v-layout>
      </v-card>
    </v-card>

    <v-dialog v-model="registerAnnualPlanDialog" persistent width="700px">
      <v-card>
        <v-toolbar dense color="green">
          Register Annual Plan
          <v-spacer />

          <Close class="icon" @click="registerAnnualPlanDialog = false" />
        </v-toolbar>
        <br />

        <v-card-text>
          <v-form @submit.prevent="sendAnnualPlan" ref="sendAnnualPlan">
            <v-textarea
              v-model="annaulPlanInfo.description"
              outlined
              rows="3"
              label="Annual Plan Description"
              :rules="inputRules"
            />

            <v-text-field
              rounded
              type="file"
              @change="onFileSelected"
              label="Attachment files"
            />

            <v-layout>
              <v-spacer />
              <v-btn
                small
                class="text-capitalize green"
                @click="sendAnnualPlan()"
              >
                Send
              </v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Close from "@/assets/icons/close.svg";
import Filedownload from "@/assets/icons/filedownload.svg";
import { mapActions, mapState } from "vuex";
import AccountService from "@/network/accountService";

export default {
  data() {
    return {
      login_user: AccountService.getProfile(),
      registerAnnualPlanDialog: false,
      annaulPlanInfo: {},

      inputRules: [(v) => !!v || "This field is required!!"],

      selectedFile: "",
      fileSelected: false,
    };
  },

  created() {
    this.loadData();
  },

  components: {
    Close,
    Filedownload,
  },

  computed: {
    ...mapState("workPermission", ["registeredAnnualReport", "annualPlans"]),
  },

  methods: {
    ...mapActions("workPermission", [
      "registerAnnualReport",
      "getAnnualReports",
    ]),

    async loadData() {
      await this.getAnnualReports(this.login_user.id);
    },

    async sendAnnualPlan() {
      if (this.$refs.sendAnnualPlan.validate()) {
        this.uploadPicture(this.selectedFile);

        alert(true);
      }
    },

    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.fileSelected = true;
    },

    async uploadPicture(file) {
      const formData = new FormData();
      let name = new Date().toISOString().substr(0, 10) + this.login_user.id;

      this.annaulPlanInfo.filename = name;
      formData.append("Image", file, name);
      //   await api.upload("folder", formData, "path");
    },
  },
};
</script>

<style scoped>
.main {
  margin: 7%;
  margin-top: 1%;
}

.icon {
  cursor: pointer;
}
</style>
