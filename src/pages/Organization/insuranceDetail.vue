<template>
  <div class="main">
    <v-card flat>
      <v-toolbar dense>
        <v-btn text class="text-capitalize" @click="back()">
          <v-icon class="mx-3">mdi-arrow-left</v-icon>
          Go Back
        </v-btn>
        <v-spacer />
        <h2>Insurance Details</h2>
        <v-spacer />
        <v-btn
          small
          color="green"
          class="text-capitalize"
          @click="registerMemberDialog = true"
        >
          Add Member
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <br />
      <br />

      Insurance Name : {{ singleInsurance.name }}
      <br />
      Date : {{ singleInsurance.date }}
      <br />
      Status :
      <v-chip color="green" v-if="singleInsurance.status === 1">Active</v-chip>
      <v-chip color="yellow" v-else>Not-Active</v-chip>
      <br />
      Description : {{ singleInsurance.description }}
      <br />
      Attachment :
      <v-btn
        color="green"
        text
        class="text-capitalize"
        @click="downloadAttachment(singleInsurance.attachment)"
      >
        Download
      </v-btn>
      <br />

      Registered BY : {{ singleInsurance.registered_by_name }}
      <br />
      <br />

      <h3 class="green--text">List of staff in the insurance / organization</h3>
      <v-data-table
        :headers="headers"
        :search="search"
        :items="singleInsurance.members"
      >
        <template v-slot:item.date_joined="{ item }">
          {{ new Date(item.date_joined).toDateString(0, 10) }}
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip v-if="item.status === 'active'" color="green">Active</v-chip>
          <v-chip v-else-if="item.status === 'not-active'" color="red"
            >Not-Active</v-chip
          >
        </template>

        <template v-slot:item.attachment="{ item }">
          <v-btn
            color="green"
            text
            class="text-capitalize"
            @click="downloadAttachment(item)"
          >
            Download
          </v-btn>
          <v-btn
            text
            class="green--text ml-5 text-capitalize"
            @click="openAttachment(item)"
          >
            View
          </v-btn>
        </template>

        <template v-slot:item.action="{ item }">
          <Detial class="icon mt-3" @click="insuranceMemeberDetail(item.id)" />
          <v-btn
            v-if="item.status === 'active'"
            class="icon ml-5 mb-2 text-capitalize blue--text"
            @click="insuranceMemebeSuspend(item.id)"
            small
            text
          >
            Suspend
          </v-btn>

          <v-btn
            v-else-if="item.status === 'not-active'"
            class="icon ml-5 mb-2 text-capitalize green--text"
            @click="insuranceMemebeActivate(item.id)"
            small
            text
          >
            Activate
          </v-btn>

          <v-btn
            class="icon ml-5 mb-2 text-capitalize red--text"
            @click="insuranceMemeberRemove(item.id)"
            small
            text
          >
            Remove
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog persistent v-model="registerMemberDialog" width="600px">
      <v-card>
        <v-toolbar dense color="green">
          Register Insurance Member
          <v-spacer />

          <Close class="icon" @click="registerMemberDialog = false" />
        </v-toolbar>
        <br />

        <v-card-text>
          <v-form @submit.prevent="registerMember" ref="registerMember">
            <v-layout>
              Patient List
              <v-spacer />
              <v-autocomplete
                outlined
                item-text="full_name"
                item-value="id"
                v-model="selected_patient_id"
                :rules="inputRules"
                :items="patientsInsurance"
                dense
              />
              <v-spacer />
            </v-layout>

            <v-layout>
              Attachment
              <v-spacer />

              <input
                type="file"
                @change="onFileUpload"
                :rules="inputRules"
                accept="application/pdf"
              />
              <v-spacer />
            </v-layout>
            <br />

            <v-layout>
              <v-btn small outlined color="green" @click="registerMember()">
                Register
              </v-btn>
              <v-spacer />
              <v-btn
                small
                outlined
                color="red"
                @click="registerMemberDialog = false"
              >
                Cancel
              </v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AccountService from "@/network/accountService";
import { API_ROOT_DOWNLOAD } from "@/network/root";

import { mapActions, mapState } from "vuex";

import Close from "@/assets/icons/close.svg";
import Detial from "@/assets/icons/eye.svg";

export default {
  data() {
    return {
      login_user: AccountService.getProfile(),
      inputRules: [(v) => !!v || "This field is required"],

      registerMemberDialog: false,
      patientInfo: {},
      insurance_id: "",
      search: "",
      headers: [
        { text: "Date Join", value: "date_joined" },
        { text: "Full Name", value: "patient_name" },
        { text: "Card Number", value: "card_number" },
        { text: "Registered By?", value: "registered_by_name" },
        { text: "Attachment", value: "attachment" },
        { text: "Status", value: "status" },
        { text: "Action", value: "action", align: "center" },
      ],

      domain: API_ROOT_DOWNLOAD,
      insurance_memmber: {},
      selected_patient_id: 0,
      selectedFile: null,
      fileSelected: false,
    };
  },

  components: {
    Close,
    Detial,
  },

  created() {
    const { insurance_id } = this.$route.params;
    this.insurance_id = insurance_id;
    if (this.insurance_id == undefined) this.back();
    this.loadData();
  },

  computed: {
    ...mapState("insurance", ["singleInsurance", "registeredInsuranceMember"]),
    ...mapState("patient", ["patientsInsurance"]),
  },

  methods: {
    ...mapActions("insurance", [
      "getSingleInsurance",
      "registereInsuranceMember",
      "suspendInsuranceMember",
      "removeInsuranceMember",
    ]),
    ...mapActions("patient", ["getPatientListInsurance"]),

    async loadData() {
      await this.getSingleInsurance(this.insurance_id);
      await this.getPatientListInsurance();
    },

    async openAttachment(item) {
      window.open(this.domain + item.attachment, "_blank").focus();
    },

    async registerMember() {
      if (this.$refs.registerMember.validate() && this.fileSelected) {
        let pid = this.selected_patient_id;
        this.insurance_memmber.user_id = this.login_user.id;
        this.insurance_memmber.insurance_id = this.insurance_id;
        this.insurance_memmber.patient_id = pid;

        const formData = new FormData();
        let name = new Date().toISOString().substr(0, 16) + "-ID-" + pid;
        formData.append("attachment", this.selectedFile, name + ".pdf");
        formData.append("data", JSON.stringify(this.insurance_memmber));
        /* eslint-disable no-console */

        await this.registereInsuranceMember(formData);

        if (this.registeredInsuranceMember.st === true) {
          this.registerMemberDialog = false;
          this.loadData();
        } else
          this.$fire({
            title: "Insurance Member Registeration",
            text: this.registeredInsuranceMember.msg,
            type: "error",
            timer: 7000,
          });
      }
    },

    downloadAttachment(item) {
      // window.open(this.domain + item.attachment, "_blank").focus();
      var link = document.createElement("a");
      link.setAttribute("download", "Attachment.pdf");
      link.href = this.domain + item.attachment;
      document.body.appendChild(link);
      link.click();
      link.remove();

      this.loadData();
    },

    onFileUpload(event) {
      this.selectedFile = event.target.files[0];
      this.fileSelected = true;
    },

    back() {
      this.$router.push({ name: "insurance" });
    },

    async insuranceMemebeSuspend(id) {
      await this.suspendInsuranceMember({ id: id, status: "not-active" });
      this.loadData();
    },

    async insuranceMemebeActivate(id) {
      await this.suspendInsuranceMember({ id: id, status: "active" });
      this.loadData();
    },

    async insuranceMemeberRemove(id) {
      await this.removeInsuranceMember(id);
      this.loadData();
    },
  },
};
</script>

<style scoped>
.main {
  margin: 7%;
  margin-top: 3%;
}

.icon {
  cursor: pointer;
}
</style>
