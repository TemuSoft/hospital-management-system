<template>
  <div>
    <v-layout>
      <v-card class="topHeaderCard" v-for="top in topHeaders" :key="top">
        <div class="title">
          <label class="suTitle">{{ top.name }}</label>
          <v-icon class="icon" color="red">mdi-logout </v-icon>
        </div>

        <div class="content">
          <h2>{{ top.amount }}</h2>

          {{ top.sunName }}
        </div>
      </v-card>
    </v-layout>
    <br />

    <v-layout>
      <v-card outlined class="chartDis">
        <p>Daily Trasnsaction</p>
        <v-divider />

        <div id="chartDisDailyTrans"></div>
      </v-card>
      <v-card outlined class="chartDis">
        <p>
          Monthly Trasnsaction,
          <b>This year Total : {{ yearlyTransactio }} ETB</b>
        </p>
        <v-divider />

        <div id="chartDisMonth"></div>
      </v-card>
      <div></div>
    </v-layout>
  </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export default {
  data() {
    return {
      topHeaders: [
        {
          name: "No. bills today",
          sunName: "Total number of bills today",
          amount: 0,
          iconName: "noBillToday",
        },
        {
          name: "Amount of bills today",
          sunName: "Total amount of bills today",
          amount: 0,
          iconName: "amountBillToday",
        },
        {
          name: "Amount paid today",
          sunName: "Total amount of bills paid today",
          amount: 0,
          iconName: "amountPaidToday",
        },
        {
          name: "No. of bills",
          sunName: "Total number of bills",
          amount: 0,
          iconName: "noBills",
        },
        {
          name: "Bills amount",
          sunName: "Total of all bills amount",
          amount: 0,
          iconName: "billAmount",
        },
        {
          name: "Total paid bills",
          sunName: "Amount paid from bills",
          amount: 0,
          iconName: "totalPaid",
        },
      ],

      yearlyTransactio: 0,
    };
  },

  mounted() {
    this.loadData();
  },

  created() {},

  methods: {
    async loadData() {
      await this.draChartTransaction();
      await this.draChartTransactionMonthly();
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
          month: "June",
          total: 501.9,
        },
        {
          month: "May",
          total: 301.9,
        },
        {
          month: "April",
          total: 201.1,
        },
        {
          month: "March",
          total: 165.8,
        },
        {
          month: "Feburary",
          total: 139.9,
        },
        {
          month: "October",
          total: 128.3,
        },
        {
          month: "September",
          total: 99,
        },
      ];

      for (let i = 0; i < data.length; i++)
        this.yearlyTransactio += data[i].total;
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
  width: 16.25%;
  margin: 0.2%;
  height: 130px;
}

.topHeaderCard .title {
  height: 40px;
  background-color: green;
}

.topHeaderCard .icon {
  float: right;
  margin-top: 10px;
}
.topHeaderCard .suTitle {
  font-size: 15px;
  margin-left: 20px;
  color: wheat;
}

.topHeaderCard .content {
  padding: 20px;
  height: 90px;
  font-size: 14px;
  background-color: lightblue;
}

.chartDis {
  width: 49%;
  margin: 0.5%;
  height: 400px;
}

#chartDisDailyTrans {
  width: 100%;
  height: 380px;
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
