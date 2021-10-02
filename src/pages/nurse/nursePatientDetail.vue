<template>
  <div class="main">
    <v-card>
      <v-toolbar dense>
        <v-btn
          text
          class="text-capitalize"
          @click="$router.push({ name: 'nurse' })"
        >
          <v-icon class="mx-3">mdi-arrow-left</v-icon>
          Go Back
        </v-btn>
        <v-spacer />

        <h3>Patinet Detail</h3>
        <v-spacer />

        <v-btn
          class="text-capitalize"
          text
          outlined
          @click="registerVitalSignDialog = true"
        >
          Register Vital Sign
        </v-btn>
      </v-toolbar>
      <v-divider />
      <br />

      <v-layout>
        <v-flex xs12 sm1></v-flex>
        <v-flex xs12 sm5>
          <label class="titleHead">Full Name : </label>
          <label class="titleCont"
            >{{ singlePatient[0].first_name }}
            {{ singlePatient[0].fathers_name }} ({{
              singlePatient[0].gender
            }})</label
          >
          <br />

          <label class="titleHead">Card Number : </label>
          <label class="titleCont">{{ singlePatient.card_number }} </label>
          <br />

          <label class="titleHead">BirthDate : </label>
          <label class="titleCont">{{ singlePatient[0].birthdate }} </label>
          <br />

          <label class="titleHead">Card Last Updated Date :</label>
          <label class="titleCont">{{
            singlePatient[0].card_updated_date
          }}</label>
          <br />

          <label class="titleHead">Phone Number : </label>
          <label class="titleCont">{{ singlePatient[0].phone_number }} </label>
          <br />

          <label class="titleHead">Patient Type : </label>
          <label v-if="singlePatient[0].patient_type === 1" class="titleCont"
            >Regular</label
          >
          <label
            v-else-if="singlePatient[0].patient_type === 2"
            class="titleCont"
            >Credit</label
          >
          <label
            v-else-if="singlePatient[0].patient_type === 3"
            class="titleCont"
            >Organization</label
          >
          <label
            v-else-if="singlePatient[0].patient_type === 4"
            class="titleCont"
            >Temporary</label
          >
        </v-flex>

        <v-flex xs12 sm6>
          <label class="titleHead">Guardian Name : </label>
          <label class="titleCont">{{ singlePatient[0].guardian_name }}</label>
          <br />

          <label class="titleHead">Guardian Contact : </label>
          <label class="titleCont">{{
            singlePatient[0].guardian_contact
          }}</label>
          <br />

          <label class="titleHead">Registration Date :</label>
          <label class="titleCont">{{
            singlePatient[0].registration_date
          }}</label>
          <br />

          <label class="titleHead">Nationality :</label>
          <label class="titleCont">{{ singlePatient[0].nationality }}</label>
          <br />

          <label class="titleHead">Address main :</label>
          <label class="titleCont"
            >{{ singlePatient[0].zone }}, {{ singlePatient[0].woreda }}</label
          >
          <br />

          <label class="titleHead">Address Detail</label>
          <label class="titleCont"
            >{{ singlePatient[0].kebele }},
            {{ singlePatient[0].house_number }}</label
          >
        </v-flex>
      </v-layout>

      <v-divider />

      <v-card>
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
      login_user: { id: 4, name: "Temesgen Kefie", role: "Nurse" },

      selectedTab: 1,
      mainInfoTab: [
        { text: "Labratory Order", value: 1 },
        { text: "Imaging Order", value: 2 },
        { text: "Vital Sign", value: 3 },
        { text: "Apponintment", value: 4 },
        { text: "Prescription", value: 5 },
        { text: "Mediacal History", value: 6 },
        { text: "Referal", value: 7 },
        { text: "Medical Certeficate", value: 8 },
        { text: "Material Request", value: 9 },
        { text: "Vital Certeficate", value: 10 },
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
  },

  created() {
    const { patientId, service_id } = this.$route.params;
    this.service_id = service_id;
    this.patientId = patientId;
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
  },
};
</script>

<style scoped>
.main {
  margin-left: 2%;
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
