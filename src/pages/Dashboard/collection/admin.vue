<template>
  <div>
    <v-layout>
      <v-card class="topHeaderCard" v-for="top in topHeaders" :key="top">
        <div class="title">
          <label class="suTitle">{{ top.name }}</label>
        </div>

        <div class="content">
          <v-layout>
            <div v-if="top.iconName === 'patient'">
              <Patient />
            </div>
            <div v-else-if="top.iconName === 'staff'">
              <Staff />
            </div>
            <div v-else-if="top.iconName === 'doctors'">
              <Doctor />
            </div>
            <div v-else-if="top.iconName === 'appointment'">
              <Appointment />
            </div>

            <v-spacer />

            <h1>{{ top.amount }}</h1>
          </v-layout>
        </div>
      </v-card>
    </v-layout>
    <br />

    <v-layout row class="pa-5">
      <v-card elevation="5" class="mr-5" width="49%">
        <h3 class="blue">OPD Detail</h3>
        <v-toolbar color="green" dense class="pa-3">
          <v-autocomplete
            :items="OPDStaffList"
            dense
            rounded
            item-text="name"
            item-value="id"
          />
          <v-spacer />

          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                rounded
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" scrollable range>
              <v-spacer></v-spacer>
              <v-btn text color="red" @click="modal = false"> Cancel </v-btn>
              <v-btn text color="green" @click="$refs.dialog.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-toolbar>

        <v-card-text>
          <div v-for="opd in opdDoneInfo" :key="opd">
            <v-layout>
              <h3>{{ opd.title }}</h3>
              <v-spacer />
              <h3>{{ opd.value }}</h3>
            </v-layout>
            <v-divider />
          </div>
        </v-card-text>
      </v-card>

      <v-card elevation="5" class="mr-5" width="48%">
        <h3 class="blue">Hospital Patient Information</h3>
        <v-toolbar color="green" dense class="pa-3">
          <v-dialog
            ref="dialog"
            v-model="modalOne"
            :return-value.sync="dateOne"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateOne"
                rounded
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dateOne" scrollable range>
              <v-spacer></v-spacer>
              <v-btn text color="red" @click="modalOne = false"> Cancel </v-btn>
              <v-btn text color="green" @click="$refs.dialog.save(dateOne)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-toolbar>

        <v-card-text>
          <div v-for="patient in hospitalPatientInfo" :key="patient">
            <v-layout>
              <h3>{{ patient.title }}</h3>
              <v-spacer />
              <h3>{{ patient.value }}</h3>
            </v-layout>
            <v-divider />
          </div>
        </v-card-text>
      </v-card>
    </v-layout>

    <v-layout>
      <v-card outlined class="chartDis">
        <p style="color: green">Yearly patient statistical view</p>
        <v-divider />
        <div id="chartPatient"></div>
      </v-card>
      <v-card outlined class="chartDisRight">
        <v-divider />
        <p style="color: green">Today Appointment</p>
        <v-divider />
        <v-data-table
          dense
          :items="appointmentToday"
          :headers="appointmentHeaders"
          :items-per-page="3"
        />
        <br />

        <p style="color: green">Today Patient</p>
        <v-divider />
        <v-data-table
          dense
          :items="paitentToday"
          :headers="paitentHeaders"
          :items-per-page="3"
        />
      </v-card>
      <div></div>
    </v-layout>
  </div>
</template>

<script>
import Patient from "@/assets/icons/patient.svg";
import Appointment from "@/assets/icons/patient.svg";
import Doctor from "@/assets/icons/patient.svg";
import Staff from "@/assets/icons/patient.svg";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export default {
  data() {
    return {
      modal: false,
      date: [
        new Date().toISOString().substr(0, 10),
        new Date().toISOString().substr(0, 10),
      ],

      modalOne: false,
      dateOne: [
        new Date().toISOString().substr(0, 10),
        new Date().toISOString().substr(0, 10),
      ],

      topHeaders: [
        {
          name: "Total Staff",
          amount: 100,
          iconName: "staff",
        },
        {
          name: "Total Doctors",
          amount: 5,
          iconName: "doctors",
        },
        {
          name: "Total Today Appointment",
          amount: 20,
          iconName: "appointment",
        },
        {
          name: "Total Patient",
          amount: 3783,
          iconName: "patient",
        },
        {
          name: "Non cleared patient",
          amount: 55,
          iconName: "patient",
        },
        {
          name: "",
          amount: 0,
          iconName: "others",
        },
      ],

      OPDStaffList: [
        { name: "OPD one", id: 1 },
        { name: "OPD two", id: 2 },
        { name: "OPD three", id: 3 },
        { name: "OPD four", id: 14 },
      ],

      opdDoneInfo: [
        { title: "Total Lab Orders", value: 25 },
        { title: "Money From Lab", value: 2300 },
        { title: "Total Imaging Orders", value: 10 },
        { title: "Money From Imaging", value: 1200 },
        { title: "Patient Served", value: 200 },
      ],

      hospitalPatientInfo: [
        { title: "No Of New Cards", value: 34 },
        { title: "No Of Visitors", value: 8 },
        { title: "No Of Lab Test", value: 56 },
        { title: "No Of Imaging Tests", value: 78 },
        { title: "Total Income Patient", value: 45 },
      ],

      appointmentToday: [
        { card_number: "C-001", fullName: "Patient 1", setted_to: "Doctor 1" },
        { card_number: "C-002", fullName: "Patient 2", setted_to: "Doctor 2" },
        { card_number: "C-003", fullName: "Patient 3", setted_to: "Doctor 3" },
        { card_number: "C-004", fullName: "Patient 4", setted_to: "Doctor 1" },
        { card_number: "C-005", fullName: "Patient 5", setted_to: "Doctor 2" },
        { card_number: "C-006", fullName: "Patient 6", setted_to: "Doctor 3" },
      ],

      appointmentHeaders: [
        { text: "Card Number", value: "card_number" },
        { text: "Full Name", value: "fullName" },
        { text: "With", value: "setted_to" },
      ],

      paitentToday: [
        { card_number: "C-001", fullName: "Patient 1", status: "On progreess" },
        { card_number: "C-002", fullName: "Patient 2", status: "No start yet" },
        { card_number: "C-003", fullName: "Patient 3", status: "Cleared out" },
        { card_number: "C-004", fullName: "Patient 4", status: "Cleared out" },
        { card_number: "C-005", fullName: "Patient 5", status: "On progreess" },
        { card_number: "C-006", fullName: "Patient 6", status: "No start yet" },
      ],

      paitentHeaders: [
        { text: "Card Number", value: "card_number" },
        { text: "Full Name", value: "fullName" },
        { text: "Status", value: "status" },
      ],
    };
  },

  mounted() {
    this.loadData();
  },

  components: {
    Patient,
    Appointment,
    Doctor,
    Staff,
  },

  methods: {
    async loadData() {
      await this.draChartPatient();
    },

    async draChartPatient() {
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
.main {
  margin: 5%;
  margin-top: 0%;
}

.topHeaderCard {
  width: 16.25%;
  margin: 0.2%;
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
  height: 480px;
}
.chartDisRight {
  width: 49%;
  margin: 0.5%;
  height: auto;
}

#chartPatient {
  width: 100%;
  height: 435px;
  margin-left: 0;
  /* height: 100%; */
}
</style>
