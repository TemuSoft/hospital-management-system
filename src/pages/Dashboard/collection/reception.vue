<template>
  <div>
    <v-layout justify-center row>
      <v-card
        class="topHeaderCard"
        v-for="top in receptionDashboardCard"
        :key="top"
      >
        <div class="title">
          <label v-if="top.by === 'date'" class="suTitle">Today patient</label>
          <label v-if="top.by === 'week'" class="suTitle">
            This week patient
          </label>

          <label v-else-if="top.by === 'month'" class="suTitle">
            This month patient
          </label>

          <label v-else-if="top.by === 'year'" class="suTitle">
            This year patient
          </label>

          <label v-else-if="top.by === 'temporary'" class="suTitle">
            Temporary patient
          </label>
        </div>

        <div class="content">
          <v-layout>
            <Icon />

            <v-spacer />

            <h1>{{ top.count }}</h1>
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
          <p class="mt-2 green--text">New Patient</p>
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
          :items="patientsNewFive"
          :headers="paitentHeaders"
          :items-per-page="5"
        >
          <template v-slot:item.status="{ item }">
            <label v-if="item.status === 1" style="color: gray">
              Room Waiting</label
            >
            <label v-if="item.status === 0" style="color: red">
              Card Expired
            </label>

            <label v-else-if="item.status === -5" style="color: green">
              Card Pendding
            </label>

            <label v-else-if="item.status === 2" style="color: blue">
              Room Assigned
            </label>
          </template>

          <template v-slot:item.first_name="{ item }">
            <label>
              {{ item.first_name }}
              {{ item.fathers_name }}
            </label>
          </template>
        </v-data-table>
      </v-card>
      <div></div>
    </v-layout>
  </div>
</template>

<script>
import Icon from "@/assets/icons/patient.svg";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      dailyMonthly: false,

      paitentHeaders: [
        { text: "Card Number", value: "card_number" },
        { text: "Full Name", value: "first_name" },
        { text: "Status", value: "status" },
      ],
    };
  },

  mounted() {
    this.loadData();
  },

  components: {
    Icon,
  },

  computed: {
    ...mapState("dashboard", [
      "receptionDashboardCard",
      "receptionDashboardLiceChart",
    ]),

    ...mapState("patient", ["patientsNewFive"]),
  },

  methods: {
    ...mapActions("dashboard", [
      "getReceptionDashboardCard",
      "getReceptionDashboardLiceChart",
    ]),
    ...mapActions("patient", ["getPatientListNewFive"]),

    async loadData() {
      await this.getReceptionDashboardCard();
      await this.getReceptionDashboardLiceChart();
      await this.drawChartPatient();
      await this.getPatientListNewFive();
    },

    async drawChartPatient() {
      am4core.useTheme(am4themes_animated);
      // Create chart instance
      let chart = am4core.create("chartPatient", am4charts.XYChart);
      // Add data

      //MM-DD-YYYY format
      chart.data = this.receptionDashboardLiceChart;
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
      chart.scrollbarX = new am4charts.XYChartScrollbar();
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
