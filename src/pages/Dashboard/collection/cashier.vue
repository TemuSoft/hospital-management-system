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

    <v-layout row justify-center>
      <v-card elevation="5" class="chartDis ma-3" width="48%">
        <v-toolbar dense color="green">
          <v-spacer />
          <h3 class="mt-2" v-if="!dailyMonthlyMoney">
            Money Daily statistical view
          </h3>
          <h3 class="mt-2" v-else>Money Monthly statistical view</h3>
          <v-spacer />
          <v-spacer />

          <v-checkbox
            dense
            class="mt-3"
            v-model="dailyMonthlyMoney"
            label="Monthly View"
          />
          <v-spacer />
        </v-toolbar>
        <v-divider />
        <div id="chartMoney"></div>
      </v-card>

      <v-card elevation="5" class="ma-2" width="48%">
        <v-toolbar dense color="green">
          <h3 class="mt-2 ml-15">New Payment</h3>
          <v-spacer />

          <v-btn
            outlined
            small
            class="mt-2 text-capitalize"
            @click="$router.push({ name: 'payment' })"
          >
            Detail
          </v-btn>
        </v-toolbar>
        <v-divider />
        <v-data-table
          :items="paymnetRequest"
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
import { mapActions, mapState } from "vuex";

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

      paymentHeaders: [
        { text: "Card No", value: "patient.card_number" },
        { text: "Full Name", value: "patient.name" },
        { text: "Guardian", value: "patient.guardian_name" },
        { text: "Reason", value: "reason" },
        { text: "Price", value: "amount" },
      ],

      dailyMonthlyMoney: false,
    };
  },

  mounted() {},

  created() {
    this.loadData();
  },

  components: {
    // Icon,
  },

  computed: {
    ...mapState("cashier", ["paymnetRequest"]),
    ...mapState("dashboard", ["cashierDashboardLiceChart"]),
  },

  methods: {
    ...mapActions("cashier", ["getPaymentRequest"]),
    ...mapActions("dashboard", ["getCashierDashboardLiceChart"]),

    async loadData() {
      await this.getPaymentRequest();

      await this.getCashierDashboardLiceChart();
      await this.drawChartMoney();
    },

    async drawChart(val) {
      if (val === false) this.draChartTransaction();
      else this.draChartTransactionMonthly();
    },

    async drawChartMoney() {
      am4core.useTheme(am4themes_animated);
      // Create chart instance
      let chart = am4core.create("chartMoney", am4charts.XYChart);
      // Add data

      //MM-DD-YYYY format
      chart.data = this.cashierDashboardLiceChart;
      // Create axes
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 50;
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.minGridDistance = 35;
      // Create series
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "amount";
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

#chartMoney {
  width: 100%;
  height: 350px;
  margin-left: 0;
  /* height: 100%; */
}
</style>
