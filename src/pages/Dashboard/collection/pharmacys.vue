<template>
  <div>
    <v-layout justify-center row>
      <v-card class="topHeaderCard" v-for="top in topHeaders" :key="top">
        <div class="title">
          <v-layout>
            <label class="suTitle mt-1">{{ top.name }}</label>
            <v-spacer />

            <label class="suTitle mr-5 mt-1">Total: {{ top.amount }} ETB</label>
          </v-layout>
        </div>

        <div class="content">
          <v-layout v-for="d in top.datas" :key="d">
            {{ d.name }}

            <v-spacer />

            <h4>{{ d.total }}</h4>
          </v-layout>
        </div>
      </v-card>
    </v-layout>
    <br />
    <br />

    <v-card elevation="5" outlined>
      <v-toolbar color="green" dense class="pa-3">
        <h3 style="margin-top: -2%">Personal Income</h3>
        <v-spacer />

        <v-dialog
          ref="dialogPharmacy"
          v-model="modalPharmacy"
          :return-value.sync="datePharmacy"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="datePharmacy"
              rounded
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="datePharmacy" scrollable range>
            <v-spacer></v-spacer>
            <v-btn text color="red" @click="modalPharmacy = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="green"
              @click="
                $refs.dialogPharmacy.save(datePharmacy), loadPharmacyInfo()
              "
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
        <v-spacer />

        <v-btn
          small
          class="mb-5 text-capitalize white"
          @click="pharmacyDetailView = !pharmacyDetailView"
        >
          {{ pharmacyDoneInfo.amount }} ETB
        </v-btn>
      </v-toolbar>
      {{ pharmacyDoneInfo }}
      <v-card-text v-if="pharmacyDetailView">
        <v-simple-table dense>
          <thead>
            <tr>
              <th class="blue lighten-5">Full Name</th>
              <th class="blue lighten-5">Card Number</th>
              <th class="blue lighten-5">Medicine Name</th>
              <th class="blue lighten-5">Price</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="item in pharmacyDoneInfo.detail">
              <tr v-for="(subitem, i) in item.cases" :key="i">
                <td v-if="i === 0" :rowspan="item.cases.length">
                  {{ item.patient_name }}
                </td>
                <td v-if="i === 0" :rowspan="item.cases.length">
                  {{ item.card_number }}
                </td>

                <td>{{ subitem.medicine_name }}</td>
                <td>{{ subitem.payed_price }}</td>
              </tr>
            </template>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>
    <br />

    <v-card outlined elevation="5">
      <v-toolbar dense color="green">
        <p class="mt-2">Medicine Request</p>
        <v-spacer />

        <v-btn
          outlined
          small
          class="mt-2 text-capitalize"
          @click="$router.push({ name: 'prescription' })"
        >
          Detail
        </v-btn>
      </v-toolbar>
      <v-divider />
      <v-data-table
        :items="prescriptionList"
        :headers="headers"
        :items-per-page="3"
      >
        <template v-slot:item.dateT="{ item }">
          {{ getDateTimeFormat(item.dateT) }}
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip v-if="item.status === 0" color="yellow">Pendding</v-chip>
          <v-chip v-else color="yellow">Something</v-chip>
        </template>
      </v-data-table>
    </v-card>
    <br />

    <v-card outlined elevation="5">
      <v-toolbar dense color="green">
        <p class="mt-2">Medicine will expired this Month</p>
        <v-spacer />

        <v-btn outlined small class="mt-2 text-capitalize"> Detail </v-btn>
      </v-toolbar>
      <v-divider />
      {{ medicineWillExpired }}
      <v-data-table
        :items="medicineWillExpired"
        :headers="medicineExpiredHeaders"
        :items-per-page="3"
      >
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
// import Icon from "@/assets/icons/patient.svg";
import AccountService from "@/network/accountService";

export default {
  data() {
    return {
      login_user: AccountService.getProfile(),

      dailyMonthly: false,
      topHeaders: [
        {
          name: "Total History",
          amount: 213,
          datas: [
            { name: "Request", total: 454 },
            { name: "Medicine", total: 84 },
            { name: "Price", total: 9 },
          ],
        },
        {
          name: "Today",
          amount: 313,
          datas: [
            { name: "Request", total: 454 },
            { name: "Medicine", total: 84 },
            { name: "Price", total: 9 },
          ],
        },
        {
          name: "This week",
          amount: 75,
          datas: [
            { name: "Request", total: 454 },
            { name: "Medicine", total: 84 },
            { name: "Price", total: 9 },
          ],
        },
        {
          name: "This Month",
          amount: 675,
          datas: [
            { name: "Request", total: 454 },
            { name: "Medicine", total: 84 },
            { name: "Price", total: 9 },
          ],
        },
        {
          name: "This year",
          amount: 857,
          datas: [
            { name: "Request", total: 54 },
            { name: "Medicine", total: 94 },
            { name: "Price", total: 99 },
          ],
        },
      ],

      headers: [
        { text: "Date", value: "dateT" },
        { text: "Full Name", value: "patient_name" },
        { text: "Card Number", value: "card_number" },
        { text: "From", value: "ordered_by" },
        { text: "Status", value: "status" },
      ],

      medicineExpiredHeaders: [
        { text: "Name", value: "medicine_name", align: "left" },
        { text: "Category", value: "category" },
        { text: "QTY Store", value: "balance" },
        { text: "QTY Dispensary", value: "quantity_dispensary" },
        { text: "Unit", value: "unit_of_measurment" },
        { text: "Expire Date", value: "expire_date" },
        { text: "Actions", value: "actions" },
      ],

      medicineTrasnHeaders: [
        { text: "Date", value: "date" },
        { text: "User", value: "user" },
        { text: "Quantity", value: "quantity" },
        { text: "Unit", value: "unit_of_measurment" },
        { text: "Remark", value: "remark" },
      ],

      pharmacyDetailView: false,
      modalPharmacy: false,
      datePharmacy: [
        new Date().toISOString().substr(0, 10),
        new Date().toISOString().substr(0, 10),
      ],
    };
  },

  created() {
    this.loadData();
  },

  computed: {
    ...mapState("prescription", ["prescriptionList"]),
    ...mapState("dashboard", ["pharmacyDoneInfo"]),
    ...mapState("pharmacy", ["medicineWillExpired"]),
  },

  methods: {
    ...mapActions("prescription", ["getPrescriptionList"]),
    ...mapActions("dashboard", ["getPharmacyDoneInfo"]),
    ...mapActions("pharmacy", ["getMedicineWillExpired"]),

    async loadData() {
      await this.getPrescriptionList();
      await this.getMedicineWillExpired();
      this.loadPharmacyInfo();
    },

    async loadPharmacyInfo() {
      if (this.datePharmacy.length === 1)
        this.datePharmacy[1] = this.datePharmacy[0];

      await this.getPharmacyDoneInfo({
        date: this.datePharmacy,
        pharmacy_id: this.login_user.id,
      });
    },

    getDateTimeFormat(input) {
      let date = new Date(input).toDateString();
      let time = new Date(input).toTimeString().substr(0, 5);
      return date + " " + time;
    },
  },
};
</script>

<style scoped>
.topHeaderCard {
  width: 18%;
  margin: 1%;
  height: 130px;
}

.topHeaderCard .title {
  height: 40px;
  background-color: green;
  color: wheat;
  font-size: 15px;
}

.topHeaderCard .suTitle {
  font-size: 15px;
  margin-left: 20px;
}

.topHeaderCard .content {
  background-color: lightblue;
  padding: 10px;
}

.chartDis {
  width: 49%;
  margin: 0.5%;
  height: 400px;
}
</style>
