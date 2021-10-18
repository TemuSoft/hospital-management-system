<template>
  <div class="main">
    <h2 class="m-5">Annaul Plan</h2>
    <v-spacer />

    <v-tabs v-model="tab" align-with-title>
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab v-for="item in tabData" :key="item" class="text-capitalize">
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabData" :key="item">
        <div v-if="item.id === 1">
          <v-layout>
            <v-spacer />
            <v-btn
              small
              class="text-capitalize green"
              @click="registerAnnualPlanDialog = true"
            >
              Add New
            </v-btn>
          </v-layout>

          <v-card
            class="pb-4"
            flat
            v-for="(data, i) in annualPlanSingle"
            :key="i"
          >
            <v-card
              elevation="5"
              outlined
              class="pa-3"
              :style="getBackgroundColor(data.seen_status)"
            >
              <h3>{{ data.datetime.substr(0, 10) }}</h3>
              <v-divider />
              <br />

              <v-layout>
                <p>{{ data.description }}</p>
                <v-spacer />
                <v-btn
                  color="green"
                  text
                  class="text-capitalize"
                  @click="downloadAttachment(data, 'persenal')"
                >
                  Download
                </v-btn>

                <v-btn
                  color="green"
                  text
                  class="text-capitalize"
                  @click="openAttachment(data, 'persenal')"
                >
                  View
                </v-btn>
              </v-layout>
            </v-card>
          </v-card>
        </div>

        <div v-if="item.id === 2">
          <v-card class="pb-4" flat v-for="(data, i) in annualPlans" :key="i">
            <v-card
              elevation="5"
              outlined
              class="pa-3"
              :style="getBackgroundColor(data.seen_status)"
            >
              <h3>{{ data.datetime.substr(0, 10) }}</h3>
              <v-divider />
              <br />

              <v-layout>
                <p>{{ data.description }}</p>
                <v-spacer />
                <v-btn
                  color="green"
                  text
                  class="text-capitalize"
                  @click="downloadAttachment(data, 'admin')"
                >
                  Download
                </v-btn>

                <v-btn
                  color="green"
                  text
                  class="text-capitalize"
                  @click="openAttachment(data, 'admin')"
                >
                  View
                </v-btn>
                <v-btn color="green" text class="text-capitalize mr-3">
                  Action
                </v-btn>
              </v-layout>
            </v-card>
          </v-card>
        </div>
      </v-tab-item>
    </v-tabs-items>

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

            <input
              type="file"
              @change="onFileUpload"
              :rules="inputRules"
              accept="application/pdf"
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
import { API_ROOT_DOWNLOAD } from "@/network/root";

import Close from "@/assets/icons/close.svg";
import { mapActions, mapState } from "vuex";
import AccountService from "@/network/accountService";

export default {
  data() {
    return {
      role: AccountService.getRole(),
      login_user: AccountService.getProfile(),
      registerAnnualPlanDialog: false,
      annaulPlanInfo: {},

      inputRules: [(v) => !!v || "This field is required!!"],

      selectedFile: null,
      fileSelected: false,

      domain: API_ROOT_DOWNLOAD,

      tab: null,
      tabData: [],
    };
  },

  created() {
    this.loadData();

    this.tabData.push({ id: 1, tab: "Personal" });
    if (this.role === "admin") this.tabData.push({ id: 2, tab: "Requests" });
  },

  components: {
    Close,
  },

  computed: {
    ...mapState("workPermission", [
      "registeredAnnualPlan",
      "annualPlanSingle",
      "annualPlans",
    ]),
  },

  methods: {
    ...mapActions("workPermission", [
      "registerAnnualPlan",
      "getAnnualPlans",
      "getAnnualPlanSingle",
      "makeSeenAnnualPlan",
    ]),

    async loadData() {
      if (this.role === "admin") await this.getAnnualPlans();
      await this.getAnnualPlanSingle(this.login_user.id);
    },

    async sendAnnualPlan() {
      if (this.$refs.sendAnnualPlan.validate() && this.fileSelected) {
        let id = this.login_user.id;
        this.annaulPlanInfo.user_id = id;

        const formData = new FormData();
        let name = new Date().toISOString().substr(0, 16) + "-ID-" + id;
        formData.append("attachment", this.selectedFile, name + ".pdf");
        formData.append("data", JSON.stringify(this.annaulPlanInfo));

        await this.registerAnnualPlan(formData);
        if (this.registeredAnnualPlan.st === true) {
          this.registerAnnualPlanDialog = false;
          this.loadData();
        } else
          this.$fire({
            title: "Annual Plan",
            text: this.registeredAnnualPlan.msg,
            type: "error",
            timer: 7000,
          });
      }
    },

    onFileUpload(event) {
      this.selectedFile = event.target.files[0];
      this.fileSelected = true;
    },

    async downloadAttachment(item, who) {
      if (who === "admin") await this.makeSeenAnnualPlan(item.id);

      var link = document.createElement("a");
      link.setAttribute("download", "Attachment.pdf");
      link.href = this.domain + item.attachment;
      document.body.appendChild(link);
      link.click();
      link.remove();

      this.loadData();
    },

    async openAttachment(item, who) {
      if (who === "admin") await this.makeSeenAnnualPlan(item.id);
      window.open(this.domain + item.attachment, "_blank").focus();

      this.loadData();
    },

    getBackgroundColor(seen) {
      if (seen === 0)
        return {
          backgroundColor: "lightblue",
        };
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
