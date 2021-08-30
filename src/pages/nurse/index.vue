<template>
  <div class="main">
    <v-layout>
      <v-flex xs12 sm2><h2>Nurse and Patinet</h2></v-flex>

      <v-flex xs12 sm6>
        <v-tabs v-model="tab" right>
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab @click="loadPenddingPatient()">
            <label class="text-capitalize">Pendding</label>
            <v-badge
              :content="patientAssignedPendding.length"
              value="9"
              color="blue"
              overlap
            />
          </v-tab>
          <v-tab @click="loadServingPatient()">
            <label class="text-capitalize">Serving</label>
            <v-badge
              :content="patientAssignedServing.length"
              value="2"
              color="green"
              overlap
            />
          </v-tab>
        </v-tabs>
      </v-flex>

      <v-flex xs12 sm1></v-flex>

      <v-flex xs12 sm3>
        <v-btn
          color="red"
          @click="viewNotification()"
          outlined
          class="text-capitalize"
        >
          Notification
          <v-badge content="17" value="20" color="red" overlap />
        </v-btn>
      </v-flex>
    </v-layout>

    <v-tabs-items v-model="tab">
      <v-card flat>
        <v-data-table
          :items="nursePatientList"
          :headers="headers"
          :search="search"
        >
          <template v-slot:item.action="{ item }">
            <Detail @click="nursePatientDetail(item)" class="icon" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <v-btn
              v-if="item.served_status === 0"
              text
              color="green"
              class="text-capitalize"
              @click="acceptPatientRequaest(item)"
            >
              Accept
            </v-btn>
          </template>

          <template v-slot:top>
            <br />
            <v-layout>
              <v-text-field
                v-model="search"
                label="Enter search text ..."
                dense
                rounded
                :search="search"
              />
              <v-spacer />
            </v-layout>
          </template>
        </v-data-table>
      </v-card>
    </v-tabs-items>

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
          <LabratoryOrder v-if="selectedTab === 1" />
          <ImagingOrder v-if="selectedTab === 2" />
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Detail from "@/assets/icons/eye.svg";

//Main infromation about patient controler
import LabratoryOrder from "../nurseOPD/labratoryOrder.vue";
import ImagingOrder from "../nurseOPD/imagingOrder.vue";

export default {
  data() {
    return {
      selectedTab: 1,
      search: "",
      tab: null,
      tabPatient: null,
      login_user: { id: 4, name: "Temesgen Kefie", role: "Nurse" },
      nursePatientList: [],
      headers: [
        { text: "Card No", value: "card_number" },
        { text: "Name", value: "full_name" },
        { text: "Gender", value: "gender" },
        { text: "Guardian Name", value: "guardian_name" },
        { text: "Type", value: "patient_type" },
        { text: "Status", value: "status" },
        { text: "Is Emergency?", value: "is_emergency" },
        { text: "Action", value: "action" },
      ],
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
  created() {
    this.loadData();
  },

  components: {
    Detail,
    LabratoryOrder,
    ImagingOrder,
  },

  computed: {
    ...mapState("nurse", [
      "patientAssignedPendding",
      "patientAssignedServing",
      "notificationPatient",
    ]),
  },

  methods: {
    ...mapActions("nurse", [
      "getPenddingPatientNurse",
      "getServingPatientNurse",
      "getNotificationPatient",
      "acceptPatientRequaestProcess",
    ]),

    async loadData() {
      await this.loadPenddingPatient();
    },

    async loadPenddingPatient() {
      await this.getPenddingPatientNurse(this.login_user.id);
      this.nursePatientList = this.patientAssignedPendding;
    },

    async loadServingPatient() {
      await this.getServingPatientNurse(this.login_user.id);
      this.nursePatientList = this.patientAssignedServing;
    },

    async viewNotification() {
      await this.getNotificationPatientNurse(this.login_user.id);
    },

    async nursePatientDetail(item) {
      this.$router.push({
        name: "nursePatientDetail",
        params: { patientId: item.patient_id, service_id: item.service_id },
      });
    },

    async acceptPatientRequaest(item) {
      await this.acceptPatientRequaestProcess({
        nurse_user_id: this.login_user.id,
        served_status: 2,
        service_id: item.service_id,
      });
      await this.loadData();
    },

    async loadTab(i) {
      this.selectedTab = i;
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
