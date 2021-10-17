<template>
  <div class="main">
    <h2>Insurance</h2>
    <br />

    <v-data-table :headers="headers" :items="insuranes" :search="search">
      <template v-slot:item.action="{ item }">
        <Edit @click="editInsurance(item)" class="icon" />
        &nbsp;&nbsp;&nbsp;
        <Detail @click="detailInsurance(item)" class="icon" />
      </template>

      <template v-slot:item.attachment="{ item }">
        <v-btn
          color="green"
          text
          class="text-capitalize"
          @click="openAttachment(item)"
        >
          Download
        </v-btn>
      </template>

      <template v-slot:top>
        <br />
        <v-layout>
          <v-text-field
            v-model="search"
            label="Enter search text ..."
            dense
            single-line
            hide-details
          />
          <v-spacer />

          <v-btn
            @click="registerInsuranceDialog = true"
            class="text-capitalize green"
            small
          >
            Add New
          </v-btn>
        </v-layout>
        <br />
      </template>
    </v-data-table>

    <v-dialog v-model="registerInsuranceDialog" persistent width="700px">
      <v-card>
        <v-toolbar dense color="green" dark>
          Add New Insurane
          <v-spacer />

          <Close class="icon" @click="cancelDialog()" />
        </v-toolbar>
        <br />
        <v-card-text>
          <v-form @submit.prevent="save" ref="save">
            <v-layout>
              <v-flex xs12 sm1> </v-flex>
              <v-flex xs12 sm3> Name</v-flex>
              <v-flex xs12 sm8>
                <v-text-field
                  dense
                  outlined
                  v-model="insuranceInfo.name"
                  :rules="inputRules"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs12 sm1> </v-flex>
              <v-flex xs12 sm3> Status</v-flex>
              <v-flex xs12 sm8>
                <v-autocomplete
                  dense
                  :items="statusList"
                  outlined
                  item-text="name"
                  item-value="value"
                  :rules="inputRules"
                  v-model="insuranceInfo.status"
                ></v-autocomplete>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs12 sm1> </v-flex>
              <v-flex xs12 sm3> Description</v-flex>
              <v-flex xs12 sm8>
                <v-text-field
                  dense
                  outlined
                  v-model="insuranceInfo.description"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs12 sm1> </v-flex>
              <v-flex xs12 sm3> Attachment</v-flex>
              <v-flex xs12 sm8>
                <input
                  type="file"
                  @change="onFileUpload"
                  :rules="inputRules"
                  accept="application/pdf"
                />
              </v-flex>
            </v-layout>

            <v-layout>
              <v-spacer />
              <v-btn small class="text-capitalize green" @click="save()">
                Save
              </v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="updateInsuranceDialog" persistent width="700px">
      <v-card>
        <v-toolbar dense color="green" dark>
          Update Insurane
          <v-spacer />

          <Close class="icon" @click="cancelDialog()" />
        </v-toolbar>
        <br />
        <v-card-text>
          <v-form @submit.prevent="update" ref="update">
            <v-layout>
              <v-flex xs12 sm1> </v-flex>
              <v-flex xs12 sm3> Name</v-flex>
              <v-flex xs12 sm8>
                <v-text-field
                  dense
                  outlined
                  :rules="inputRules"
                  v-model="insuranceInfo.name"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs12 sm1> </v-flex>
              <v-flex xs12 sm3> Status</v-flex>
              <v-flex xs12 sm8>
                <v-autocomplete
                  dense
                  :items="statusList"
                  outlined
                  :rules="inputRules"
                  item-text="name"
                  item-value="value"
                  v-model="insuranceInfo.status"
                ></v-autocomplete>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs12 sm1> </v-flex>
              <v-flex xs12 sm3> Description</v-flex>
              <v-flex xs12 sm8>
                <v-text-field
                  dense
                  outlined
                  v-model="insuranceInfo.description"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs12 sm1> </v-flex>
              <v-flex xs12 sm3> Attachment</v-flex>
              <v-flex xs12 sm8>
                <input
                  type="file"
                  @change="onFileUpload"
                  :rules="inputRules"
                  accept="application/pdf"
                />
              </v-flex>
            </v-layout>

            <v-layout>
              <v-spacer />
              <v-btn small outlined color="green" @click="update()">
                Update
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

import { mapActions, mapState } from "vuex";
import Edit from "@/assets/icons/edit.svg";
import Close from "@/assets/icons/close.svg";
import Detail from "@/assets/icons/eye.svg";

import AccountService from "@/network/accountService";

export default {
  data() {
    return {
      login_user: AccountService.getProfile(),

      registerInsuranceDialog: false,
      updateInsuranceDialog: false,
      insuranceInfo: {},
      inputRules: [(v) => !!v || "This field is required"],
      statusList: [
        { name: "Active", value: 1 },
        { name: "Not Active", value: 0 },
      ],
      headers: [
        { text: "Partner Name", value: "name" },
        { text: "Description", value: "description" },
        { text: "Status", value: "status" },
        { text: "Start Date", value: "startDate" },
        { text: "Attachment", value: " attachment" },
        { text: "Action", value: "action" },
      ],

      domain: API_ROOT_DOWNLOAD,

      selectedFile: null,
      fileSelected: false,
    };
  },

  components: {
    Edit,
    Close,
    Detail,
  },

  created() {
    this.loadData();
  },

  mounted: {
    ...mapState("insurance", [
      "registeredInsurance",
      "updatedInsurance",
      "insurances",
    ]),
  },

  methods: {
    ...mapActions("insurance", [
      "registereInsurance",
      "updateInsurance",
      "getInsuranceList",
    ]),

    async loadData() {
      await this.getInsuranceList();
    },

    async save() {
      if (this.$refs.save.validate() && this.fileSelected) {
        let id = this.login_user.id;
        this.insuranceInfo.user_id = id;

        const formData = new FormData();
        let name = new Date().toISOString().substr(0, 16) + "-ID-" + id;
        formData.append("attachment", this.selectedFile, name + ".pdf");
        formData.append("data", JSON.stringify(this.insuranceInfo));
        /* eslint-disable no-console */

        await this.registereInsurance(formData);

        if (this.registeredInsurance === true) {
          this.registerInsuranceDialog = false;
          this.loadData();
        } else
          this.$fire({
            title: "Insurance Registeration",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    onFileUpload(event) {
      this.selectedFile = event.target.files[0];
      this.fileSelected = true;
    },

    openAttachment(item) {
      window.open(this.domain + item.attachment, "_blank").focus();
    },

    async updte() {
      if (this.$refs.update.validate()) {
        this.insuranceInfo.updated_by = "Temesegen";
        await this.updateInsurance(this.insuranceInfo);

        if (this.updatedInsurance === true) {
          this.updateInsuranceDialog = false;
          this.insuranceInfo = {};
          await this.loadData();
        } else
          this.$fire({
            title: "Insurance Info Update",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    async cancelDialog() {
      this.registerInsuranceDialog = false;
      this.updateInsuranceDialog = false;
      this.insuranceInfo = {};
    },

    async editInsurance(item) {
      this.insuranceInfo = item;
      this.updateInsuranceDialog = true;
    },

    async detailInsurance(item) {
      this.$router.push({
        name: "insuranceDetail",
        params: { insurance_id: item.id },
      });
    },
  },
};
</script>

<style scoped>
.main {
  margin: 7%;
  margin-top: 2%;
}

.icon {
  cursor: pointer;
}
</style>
