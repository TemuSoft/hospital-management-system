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
          :item-class="rowBackgroundColor"
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
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Detail from "@/assets/icons/eye.svg";
import AccountService from "@/network/accountService";

export default {
  data() {
    return {
      search: "",
      tab: null,
      tabPatient: null,
      login_user: AccountService.getProfile(),
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
    };
  },
  created() {
    this.loadData();
  },

  components: {
    Detail,
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

    rowBackgroundColor(item) {
      if (item.is_emergency === 1) return "red";
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
