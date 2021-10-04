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
