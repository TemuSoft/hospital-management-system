<template>
  <div class="main">
    <v-card flat>
      <h2>Work Permission</h2>
      <br />

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
                @click="sendRequestDialog = true"
              >
                Add New
              </v-btn>
            </v-layout>

            <v-data-table
              :items="workPermissionSingle"
              :headers="requestHeadersSingle"
              :items-per-page="10"
            >
            </v-data-table>
          </div>

          <div v-if="item.id === 2">
            <v-data-table
              :items="workPermissions"
              :headers="requestHeaders"
              :items-per-page="10"
            >
              <v-template v-slot:item.request_date="{ item }">
                {{ new Date(item.request_date).toISOString().substr(0, 10) }}
              </v-template>

              <v-template v-slot:item.start_datetime="{ item }">
                {{ new Date(item.start_date).toISOString().substr(0, 22) }}
              </v-template>

              <v-template v-slot:item.finish_datetime="{ item }">
                {{ new Date(item.finish_datetime).toISOString().substr(0, 22) }}
              </v-template>
            </v-data-table>
          </div>
        </v-tab-item>
      </v-tabs-items>

      <v-dialog v-model="sendRequestDialog" width="900px" persistent>
        <v-card>
          <v-toolbar dense color="green">
            Send Work Permission
            <v-spacer />

            <Close @click="sendRequestDialog = false" class="icon" />
          </v-toolbar>

          <br />
          <v-card-text>
            <v-form @submit.prevent="sendRequest" ref="sendRequest">
              <v-layout>
                <v-text-field
                  label="Start Date"
                  type="date"
                  dense
                  v-model="requestPermission.start_date"
                  outlined
                  :rules="inputRules"
                />
                <v-text-field
                  label="Start Time"
                  type="time"
                  dense
                  v-model="start_time"
                  outlined
                  :rules="inputRules"
                />
                <v-spacer></v-spacer>
                <v-text-field
                  label="End Date"
                  type="date"
                  dense
                  v-model="requestPermission.end_date"
                  :rules="inputRules"
                  outlined
                />
                <v-text-field
                  label="End Time"
                  type="time"
                  dense
                  v-model="end_time"
                  outlined
                  :rules="inputRules"
                />
              </v-layout>

              <v-textarea
                label="Reason"
                counter="300"
                outlined
                v-model="requestPermission.reason"
                :rules="inputRules"
              />

              <input
                type="file"
                @change="onFileUpload"
                :rules="inputRules"
                accept="application/pdf"
              />

              <br />
              <v-layout>
                <v-spacer />
                <v-btn
                  small
                  class="text-capitalize green"
                  @click="sendRequest()"
                >
                  Send
                </v-btn>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import { API_ROOT } from "@/network/root";

import { mapActions, mapState } from "vuex";
import Close from "@/assets/icons/close.svg";
import AccountService from "@/network/accountService";

export default {
  data() {
    return {
      role: AccountService.getRole(),
      login_user: AccountService.getProfile(),

      requestPermission: {},
      sendRequestDialog: false,
      inputRules: [(v) => !!v || "This field is required"],

      requestHeaders: [
        { text: "Date", value: "request_date" },
        { text: "Full Name", value: "fullname" },
        { text: "Department", value: "department" },
        { text: "Start Date", value: "start_datetime" },
        { text: "End Date", value: "finish_datetime" },
        { text: "Reason", value: "reason" },
        { text: "Status", value: "status" },
        { text: "Attachment", value: "attachment" },
        { text: "Action", value: "action" },
      ],

      requestHeadersSingle: [
        { text: "Date", value: "request_date" },
        { text: "Start Date", value: "start_datetime" },
        { text: "End Date", value: "finish_datetime" },
        { text: "Reason", value: "reason" },
        { text: "Status", value: "status" },
        { text: "Attachment", value: "attachment" },
        { text: "Action", value: "action" },
      ],

      start_time: "",
      end_time: "",
      selectedFile: null,
      fileSelected: false,

      domain: API_ROOT,

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
      "requestedPermission",
      "workPermissions",
      "workPermissionSingle",
    ]),
  },

  methods: {
    ...mapActions("workPermission", [
      "sendReuqestPermission",
      "getWorkPermission",
      "getWorkPermissionSingle",
    ]),

    async loadData() {
      if (this.role === "admin") await this.getWorkPermission();

      await this.getWorkPermissionSingle(this.login_user.id);
    },

    async sendRequest() {
      if (this.$refs.sendRequest.validate()) {
        let sd = this.requestPermission.start_date;
        sd = sd + "T" + this.start_time + ":00.000Z";

        let ed = this.requestPermission.end_date;
        ed = ed + "T" + this.end_time + ":00.000Z";

        this.requestPermission.start_date = sd;
        this.requestPermission.end_date = ed;

        let id = this.login_user.id;
        this.requestPermission.user_id = id;

        const formData = new FormData();
        let name = new Date().toISOString().substr(0, 16) + "-ID-" + id;
        formData.append("attachment", this.selectedFile, name + ".pdf");
        formData.append("data", JSON.stringify(this.requestPermission));

        await this.sendReuqestPermission(formData);
        if (this.requestedPermission.st === true) {
          this.sendRequestDialog = false;
          this.loadData();
        } else
          this.$fire({
            title: "Work Permission",
            text: this.requestPermission.msg,
            type: "error",
            timer: 7000,
          });
      }
    },

    onFileUpload(event) {
      this.selectedFile = event.target.files[0];
      this.fileSelected = true;
    },
  },
};
</script>

<style scoped>
.main {
  margin: 5%;
  margin-top: 3%;
}
.icon {
  cursor: pointer;
}
</style>
