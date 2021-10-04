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

            <h4>{{ d.total }} ETB</h4>
          </v-layout>
        </div>
      </v-card>
    </v-layout>
    <br />
    <br />

    <v-layout>
      <v-card outlined class="chartDis">
        <v-layout>
          <v-spacer />
          <p class="mt-2 green--text" v-if="!dailyMonthly">
            Daily Trasnsaction view
          </p>

          <p class="mt-2 green--text" v-else>Monthly Trasnsaction view</p>
          <v-spacer />
          <v-spacer />

          <v-checkbox
            dense
            color="green"
            v-model="dailyMonthly"
            label="Monthly View"
            @change="drawChart"
          />
          <v-spacer />
        </v-layout>
        <v-divider />

        <div id="chartDisDailyTrans" v-show="!dailyMonthly"></div>
        <div id="chartDisMonth" v-show="dailyMonthly"></div>
      </v-card>
      <v-card outlined class="chartDis">
        <v-layout>
          <v-spacer />
          <p class="mt-2 green--text">New Payment</p>
          <v-spacer />
          <v-spacer />

          <v-btn
            outlined
            small
            color="green"
            class="mt-2 text-capitalize"
            @click="$router.push({ name: 'payment' })"
          >
            Detail
          </v-btn>
          <v-spacer />
        </v-layout>
        <v-divider />
        <v-data-table
          :items="paymentToday"
          :headers="paymentHeaders"
          :items-per-page="5"
        />
      </v-card>
    </v-layout>
  </div>
</template>

<script>
// import Icon from "@/assets/icons/patient.svg";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export default {
  data() {
    return {
      dailyMonthly: false,
      topHeaders: [
        {
          name: "Today income",
          amount: 100,
          datas: [
            { name: "Cash", total: 454 },
            { name: "Prepayament", total: 84 },
            { name: "Insurance", total: 9 },
            { name: "Credit", total: 0 },
          ],
        },
        {
          name: "This week income ",
          amount: 5,
          datas: [
            { name: "Cash", total: 454 },
            { name: "Prepayament", total: 84 },
            { name: "Insurance", total: 9 },
            { name: "Credit", total: 0 },
          ],
        },
        {
          name: "This month income",
          amount: 20,
          datas: [
            { name: "Cash", total: 454 },
            { name: "Prepayament", total: 84 },
            { name: "Insurance", total: 9 },
            { name: "Credit", total: 0 },
          ],
        },
        {
          name: "This year income",
          amount: 3783,
          datas: [
            { name: "Cash", total: 454 },
            { name: "Prepayament", total: 84 },
            { name: "Insurance", total: 9 },
            { name: "Credit", total: 0 },
          ],
        },
      ],

      paymentToday: [
        {
          card_number: "C-001",
          fullName: "Patient 1",
          reason: "Card Renewal",
          amount: 100,
        },
        {
          card_number: "C-002",
          fullName: "Patient 2",
          reason: "Imaging",
          amount: 200,
        },
        {
          card_number: "C-003",
          fullName: "Patient 3",
          reason: "Laboratory",
          amount: 300,
        },
        {
          card_number: "C-004",
          fullName: "Patient 4",
          reason: "New Card",
          amount: 400,
        },
        {
          card_number: "C-005",
          fullName: "Patient 5",
          reason: "Imaging",
          amount: 500,
        },
      ],

      paymentHeaders: [
        { text: "Card Number", value: "card_number" },
        { text: "Full Name", value: "fullName" },
        { text: "Reason", value: "reason" },
        { text: "Amount", value: "amount" },
      ],
    };
  },

  mounted() {},

  created() {
    this.loadData();
  },

  components: {
    // Icon,
  },

  methods: {
    async loadData() {
      this.drawChart(this.dailyMonthly);
    },

    async drawChart(val) {
      if (val === false) this.draChartTransaction();
      else this.draChartTransactionMonthly();
    },

    async draChartTransaction() {
      am4core.useTheme(am4themes_animated);
      // Create chart instance
      let chart = am4core.create("chartDisDailyTrans", am4charts.XYChart);
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
      chart.scrollbarX = new am4charts.XYChartScrollbar();
      chart.scrollbarX.series.push(series);
      // Add cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;
      chart.cursor.snapToSeries = series;
    },

    async draChartTransactionMonthly() {
      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create chart instance
      let chart = am4core.create("chartDisMonth", am4charts.PieChart);

      // Add data
      let data = [
        {
          month: "Jaunary",
          total: 150.8,
        },
        {
          month: "Feburary",
          total: 239.9,
        },
        {
          month: "March",
          total: 165.8,
        },
        {
          month: "Apiril",
          total: 265.8,
        },
        {
          month: "May",
          total: 371.9,
        },
        {
          month: "June",
          total: 301.9,
        },
        {
          month: "Julay",
          total: 401.9,
        },
        {
          month: "August",
          total: 101.9,
        },
        {
          month: "September",
          total: 199,
        },
        {
          month: "October",
          total: 128.3,
        },
        {
          month: "November",
          total: 201.1,
        },
        {
          month: "December",
          total: 99,
        },
      ];
      chart.data = data;

      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "total";
      pieSeries.dataFields.category = "month";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeOpacity = 1;

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;

      chart.hiddenState.properties.radius = am4core.percent(0);
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
  padding: 10px;
}

.chartDis {
  width: 49%;
  margin: 0.5%;
  height: 400px;
}

#chartDisDailyTrans {
  width: 100%;
  height: 360px;
  margin-left: 0;
  /* height: 100%; */
}

#chartDisMonth {
  width: 100%;
  height: 380px;
  margin-left: 0;
  /* height: 100%; */
}
</style>
