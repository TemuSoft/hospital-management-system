<template>
  <div>
    <v-layout justify-center row>
      <v-card class="topHeaderCard" v-for="top in topHeaders" :key="top">
        <div class="title">
          <v-layout>
            <label class="suTitle mt-1">{{ top.name }}</label>
            <v-spacer />

            <label class="suTitle mr-5 mt-1">Total: {{ top.amount }} </label>
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

    <v-layout>
      <v-card outlined class="chartDis">
        <v-layout>
          <v-spacer />
          <p class="mt-2 green--text" v-if="!dailyMonthly">
            Daily statistical view
          </p>
          <p class="mt-2 green--text" v-else>Monthly statistical view</p>
          <v-spacer />
          <v-spacer />

          <v-checkbox
            dense
            color="green"
            v-model="dailyMonthly"
            label="Monthly View"
          />
          <v-spacer />
        </v-layout>
        <v-divider />
        <div id="chartPatient"></div>
      </v-card>
      <v-card outlined class="chartDisRight">
        <v-layout>
          <v-spacer />
          <p class="mt-2 green--text">New Laboratory and Imaging Request</p>
          <v-spacer />
          <v-spacer />

          <v-btn
            outlined
            small
            color="green"
            class="mt-2 text-capitalize"
            @click="$router.push({ name: 'patinets' })"
          >
            Detail
          </v-btn>
          <v-spacer />
        </v-layout>
        <v-divider />
        <v-data-table
          :items="paitentToday"
          :headers="paitentHeaders"
          :items-per-page="5"
        />
      </v-card>
      <div></div>
    </v-layout>

    <v-card elevation="5" class="ma-3">
      <h3 class="blue">Laboratory Technician Detail</h3>
      <v-toolbar color="green" dense class="pa-3">
        <v-autocomplete
          :items="laboratoryTechStaffList"
          dense
          rounded
          item-text="full_name"
          item-value="id"
          v-model="laboratoryTechStaffSelected"
          @change="loadlaboratoryTechInfo()"
        />
        <v-spacer />

        <v-dialog
          ref="dialoglaboratoryTech"
          v-model="modallaboratoryTech"
          :return-value.sync="datelaboratoryTech"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="datelaboratoryTech"
              rounded
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="datelaboratoryTech" scrollable range>
            <v-spacer></v-spacer>
            <v-btn text color="red" @click="modallaboratoryTech = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="green"
              @click="
                $refs.dialoglaboratoryTech.save(datelaboratoryTech),
                  loadlaboratoryTechInfo()
              "
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-toolbar>

      <v-card-text>
        <v-data-table
          :items="generalViewLaboratoryHead"
          :headers="labHeadHeader"
          dense
        >
          <template v-slot:item.details="{ item }">
            {{ item.details.length }}
          </template>

          <template v-slot:item.action="{ item }">
            <Detail class="icon" @click="labHeDetail = item" />
          </template>
        </v-data-table>

        <v-card
          flat
          v-if="labHeDetail.details != undefined"
          class="green--text"
        >
          <h3>Date Selected : {{ labHeDetail.date }}</h3>
          <v-simple-table dense>
            <thead>
              <tr>
                <th class="blue lighten-5">Full Name</th>
                <th class="blue lighten-5">Card Number</th>
                <th class="blue lighten-5">Test Cases</th>
                <th class="blue lighten-5">Price</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="item in labHeDetail.details">
                <tr v-for="(subitem, i) in item.cases" :key="i">
                  <td v-if="i === 0" :rowspan="item.cases.length">
                    {{ item.patient_name }}
                  </td>
                  <td v-if="i === 0" :rowspan="item.cases.length">
                    {{ item.card_number }}
                  </td>

                  <td>{{ subitem.case_name }}</td>
                  <td>{{ subitem.payed_price }}</td>
                </tr>
              </template>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
// import Icon from "@/assets/icons/patient.svg";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { mapActions, mapState } from "vuex";
import AccountService from "@/network/accountService";

import Detail from "@/assets/icons/eye.svg";

export default {
  data() {
    return {
      login_user: AccountService.getProfile(),

      modallaboratoryTech: false,
      datelaboratoryTech: [
        new Date().toISOString().substr(0, 10),
        new Date().toISOString().substr(0, 10),
      ],
      laboratoryTechStaffSelected: "",

      dailyMonthly: false,
      topHeaders: [
        {
          name: "Done By me",
          amount: 100,
          datas: [
            { name: "Laboratory", total: 54 },
            { name: "Imaging", total: 84 },
          ],
        },
        {
          name: "Served",
          amount: 100,
          datas: [
            { name: "Laboratory", total: 454 },
            { name: "Imaging", total: 84 },
          ],
        },
        {
          name: "Onprogress ",
          amount: 5,
          datas: [
            { name: "Laboratory", total: 454 },
            { name: "Imaging", total: 84 },
          ],
        },
        {
          name: "New request",
          amount: 20,
          datas: [
            { name: "Laboratory", total: 454 },
            { name: "Imaging", total: 84 },
          ],
        },
      ],

      paitentToday: [
        {
          card_number: "C-001",
          fullName: "Patient 1",
          test_case_type: "Test Case 1",
        },
        {
          card_number: "C-002",
          fullName: "Patient 2",
          test_case_type: "Test Case 2",
        },
        {
          card_number: "C-003",
          fullName: "Patient 3",
          test_case_type: "Test Case 3",
        },
        {
          card_number: "C-004",
          fullName: "Patient 4",
          test_case_type: "Test Case 4",
        },
        {
          card_number: "C-005",
          fullName: "Patient 5",
          test_case_type: "Test Case 5",
        },
        {
          card_number: "C-006",
          fullName: "Patient 6",
          test_case_type: "Test Case 6",
        },
      ],

      paitentHeaders: [
        { text: "Card Number", value: "card_number" },
        { text: "Full Name", value: "fullName" },
        { text: "Test Case Type", value: "test_case_type" },
        { text: "Action", value: "action" },
      ],

      labHeDetail: {},
      labHeadHeader: [
        { text: "Date", value: "date" },
        { text: "No Patient", value: "details" },
        { text: "No Test Case", value: "total_test_cases" },
        { text: "Total Price", value: "total_price" },
        { text: "Action", value: "action" },
      ],

      labHeDetailHeader: [
        { text: "Full Name", value: "patient_name" },
        { text: "Card Number", value: "card_number" },
        { text: "Test Cases", value: "case_name" },
        { text: "Price", value: "payed_price" },
      ],
    };
  },

  created() {
    this.loadData();
  },

  components: {
    // Icon,
    Detail,
  },

  computed: {
    ...mapState("dashboard", [
      "generalViewLaboratoryHead",
      "laboratoryTechStaffList",
    ]),
  },

  methods: {
    ...mapActions("dashboard", [
      "getGeneralViewLaboratoryHead",
      "getStaffListByRole",
    ]),

    async loadData() {
      await this.getStaffListByRole("laboratory");
      this.loadlaboratoryTechInfo();

      await this.drawChartPatient();
    },

    async loadlaboratoryTechInfo() {
      if (this.datelaboratoryTech.length === 1)
        this.datelaboratoryTech[1] = this.datelaboratoryTech[0];

      this.laboratoryTechStaffSelected = this.laboratoryTechStaffList[0].id;
      await this.getGeneralViewLaboratoryHead({
        who: this.laboratoryTechStaffSelected,
        date: this.datelaboratoryTech,
      });
    },

    async drawChartPatient() {
      am4core.useTheme(am4themes_animated);
      // Create chart instance
      let chart = am4core.create("chartPatient", am4charts.XYChart);
      // Add data

      //MM-DD-YYYY format
      chart.data = [
        { totalPatient: 15, date: "04-25-2021" },
        { totalPatient: 22, date: "05-20-2021" },
        { totalPatient: 45, date: "06-15-2021" },
        { totalPatient: 35, date: "07-10-2021" },
        { totalPatient: 25, date: "08-05-2021" },
        { totalPatient: 50, date: "09-29-2021" },
      ];
      // Create axes
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 50;
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.minGridDistance = 35;
      // Create series
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "totalPatient";
      series.dataFields.dateX = "date";
      series.strokeWidth = 2;
      series.minBulletDistance = 10;
      series.tooltipText = "{valueY}";
      series.tooltip.pointerOrientation = "vertical";
      series.tooltip.background.cornerRadius = 20;
      series.tooltip.background.fillOpacity = 0.5;
      series.tooltip.label.padding(12, 12, 12, 12);
      // Add scrollbar
      // chart.scrollbarX = new am4charts.XYChartScrollbar();
      chart.scrollbarX.series.push(series);
      // Add cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;
      chart.cursor.snapToSeries = series;
    },
  },
};
</script>

<style scoped>
.topHeaderCard {
  width: 23%;
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
  padding: 20px;
}

.chartDis {
  width: 49%;
  margin: 0.5%;
  height: 400px;
}
.chartDisRight {
  width: 49%;
  margin: 0.5%;
  height: auto;
}

#chartPatient {
  width: 100%;
  height: 350px;
  margin-left: 0;
  /* height: 100%; */
}

.icon {
  cursor: pointer;
}
</style>
