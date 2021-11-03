<template>
  <div class="main">
    <v-card>
      <v-toolbar dense>
        <v-btn text class="text-capitalize" @click="back()">
          <v-icon class="mx-3">mdi-arrow-left</v-icon>
          Go Back
        </v-btn>
        <v-spacer />

        <h3>
          Patinet : {{ singlePatient[0].first_name }}
          {{ singlePatient[0].fathers_name }} ({{ singlePatient[0].gender }}) ,
          Card Number : {{ singlePatient[0].card_number }} , Guardian :
          {{ singlePatient[0].guardian_name }}
        </h3>
        <v-spacer />

        <v-btn
          small
          class="text-capitalize green"
          @click="registerVitalSignDialog = true"
        >
          Register Vital Sign
        </v-btn>
      </v-toolbar>
      <v-divider />

      <v-card height="85vh">
        <v-tabs vertical>
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <div v-for="(info, i) in mainInfoTab" :key="i">
            <v-tab
              @click.stop="loadTab(mainInfoTab[i].value)"
              class="text-capitalize"
            >
              {{ mainInfoTab[i].text }}
            </v-tab>
          </div>
          <v-tabs-items style="margin-left: 3%">
            <br />
            <LabratoryOrder v-if="selectedTab === 1" :service_id="service_id" />
            <ImagingOrder
              v-else-if="selectedTab === 2"
              :service_id="service_id"
            />
            <VitalSign v-else-if="selectedTab === 3" :service_id="service_id" />
            <Appointment
              v-else-if="selectedTab === 4"
              :service_id="service_id"
            />
            <Prescription
              v-else-if="selectedTab === 5"
              :service_id="service_id"
            />

            <MaterialRequest
              v-else-if="selectedTab === 6"
              :service_id="service_id"
              :patientId="patientId"
            />

            <MedicalHistory
              v-else-if="selectedTab === 7"
              :service_id="service_id"
              :patientId="patientId"
            />

            <Referral
              v-else-if="selectedTab === 8"
              :service_id="service_id"
              :patient_id="patientId"
            />

            <OPD
              v-else-if="selectedTab === 11"
              :service_id="service_id"
              :patientId="patientId"
            />

            <SurgicalOrder
              v-else-if="selectedTab === 12"
              :service_id="service_id"
              :patient_id="patientId"
            />

            <ClearPatient
              v-else-if="selectedTab === 13"
              :service_id="service_id"
              :patient_id="patientId"
            />
          </v-tabs-items>
        </v-tabs>
      </v-card>

      <v-dialog persistent width="700px" v-model="registerVitalSignDialog">
        <v-card flat>
          <v-toolbar color="green" dense>
            Vital Sign
            <v-spacer></v-spacer>
            <v-btn
              small
              class="text-capitalize"
              text
              outlined
              @click="(register = true), (update = false), (vitalSignInfo = {})"
            >
              Add New
            </v-btn>
            <v-spacer></v-spacer>
            <Close class="icon" @click="registerVitalSignDialog = false" />
          </v-toolbar>
          <br />
          <v-card-text>
            <div v-if="register || update">
              <v-form @submit.prevent="save" ref="save" lazy-validation>
                <v-layout>
                  <v-flex xs12 sm3><h3>Vital Sign Name</h3></v-flex>
                  <v-text-field
                    :rules="inputRules"
                    outlined
                    dense
                    v-model="vitalSignInfo.name"
                  />
                </v-layout>

                <v-layout>
                  <v-flex xs12 sm3><h3>Description</h3></v-flex>
                  <v-textarea
                    rows="2"
                    :rules="inputRules"
                    outlined
                    dense
                    v-model="vitalSignInfo.description"
                  />
                </v-layout>
              </v-form>

              <v-layout>
                <v-spacer></v-spacer>
                <v-btn
                  v-if="register"
                  small
                  class="text-capitalize"
                  text
                  outlined
                  @click="save()"
                >
                  Save
                </v-btn>
                <v-spacer />

                <v-btn
                  v-if="update"
                  small
                  class="text-capitalize"
                  text
                  outlined
                  @click="save()"
                >
                  Update
                </v-btn>
              </v-layout>
            </div>
            <br />

            <v-data-table
              :items="vitalSigns"
              :headers="vitalSignHeaders"
              :items-per-page="10"
            >
              <template v-slot:item.action="{ item }">
                <Edit
                  class="icon"
                  @click="
                    (vitalSignInfo = item), (update = true), (register = false)
                  "
                />
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog width="500px" v-model="editPatientVitalSignDialog">
        <v-card>
          <v-toolbar dense color="gree"> Update Vital Sign </v-toolbar>
          <br />

          <v-card-text>
            <v-layout>
              <v-flex xs12 sm3>Vital Sign Name</v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Edit from "@/assets/icons/edit.svg";
import Close from "@/assets/icons/close.svg";

//Main infromation about patient controler
import LabratoryOrder from "../nurseOPD/labratoryOrder.vue";
import ImagingOrder from "../nurseOPD/imagingOrder.vue";
import Appointment from "../nurseOPD/appointement.vue";
import VitalSign from "../nurseOPD/vitalSign.vue";
import Prescription from "../nurseOPD/prescription.vue";
import MaterialRequest from "../nurseOPD/materialRequest.vue";
import MedicalHistory from "../nurseOPD/medicalHistory.vue";
import Referral from "../nurseOPD/referral.vue";

import OPD from "../nurseOPD/opd.vue";
import SurgicalOrder from "../nurseOPD/surgicalOrder.vue";
import ClearPatient from "../nurseOPD/clearPatient.vue";

import AccountService from "@/network/accountService";

export default {
  data() {
    return {
      patientId: "",
      service_id: "",
      vitalSignInfo: {},
      update: false,
      register: false,
      registerVitalSignDialog: false,
      editPatientVitalSignDialog: false,
      vitalSignHeaders: [
        { text: "Vital Sign Name", value: "name" },
        { text: "Description", value: "description" },
        { text: "Action", value: "action" },
      ],
      inputRules: [(v) => !!v || "This field is required"],
      login_user: AccountService.getProfile(),

      selectedTab: 1,
      mainInfoTab: [
        { text: "Labratory Order", value: 1 },
        { text: "Imaging Order", value: 2 },
        { text: "Vital Sign", value: 3 },
        // { text: "Apponintment", value: 4 },
        { text: "Prescription", value: 5 },
        { text: "Material Request", value: 6 },
        { text: "Mediacal History", value: 7 },
        { text: "Referal", value: 8 },
        { text: "Medical Certeficate", value: 9 },
        { text: "Vital Certeficate", value: 10 },
        { text: "OPD", value: 11 },
        { text: "Surgical Order", value: 12 },
        { text: "Clear Patient", value: 13 },
      ],
    };
  },
  components: {
    Edit,
    Close,
    LabratoryOrder,
    ImagingOrder,
    VitalSign,
    Appointment,
    Prescription,
    MaterialRequest,
    MedicalHistory,
    Referral,
    OPD,
    SurgicalOrder,
    ClearPatient,
  },

  created() {
    const { patientId, service_id } = this.$route.params;
    this.service_id = service_id;
    this.patientId = patientId;

    if (service_id === undefined) this.back();

    this.loadData();
  },

  computed: {
    ...mapState("nurse", ["vitalSigns", "registeredVitalSign"]),
    ...mapState("patient", ["singlePatient"]),
  },

  methods: {
    ...mapActions("nurse", [
      "getVitalSignsList",
      "registerVitalSign",
      "updateVitalSign",
    ]),
    ...mapActions("patient", ["singlePatientInfo"]),

    async loadData() {
      await this.getVitalSignsList();
      await this.singlePatientInfo(this.patientId);
    },

    async loadTab(i) {
      this.selectedTab = i;
    },

    async save() {
      if (this.$refs.save.validate()) {
        this.vitalSignInfo.user_id = this.login_user.id;
        if (this.register) await this.registerVitalSign(this.vitalSignInfo);
        else await this.updateVitalSign(this.vitalSignInfo);

        if (this.registeredVitalSign === true) {
          this.register = false;
          this.update = false;
          this.vitalSignInfo = {};
          this.$fire({
            title: "Vital Sign Registeration",
            text: "Vital Sign Registered Successfull!!!",
            type: "success",
            timer: 7000,
          });
          await this.loadData();
        } else
          this.$fire({
            title: "Vital Sign Registeration",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    back() {
      this.$router.push({ name: "nurse" });
    },
  },
};
</script>

<style scoped>
.main {
  margin-left: 5%;
  margin-top: 1%;
}

.titleHead {
  font-family: bold;
  font: bold 12px/30px Georgia;
  letter-spacing: 2px;
}
.titleCont {
  font-size: 17px;
}

.icon {
  cursor: pointer;
}
</style>
