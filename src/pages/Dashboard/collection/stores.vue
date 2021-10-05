<template>
  <div>
    <v-layout justify-center row>
      <v-card class="topHeaderCard" v-for="top in topHeaders" :key="top">
        <div class="title">
          <v-layout>
            <label class="suTitle mt-1">{{ top.name }}</label>
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

        <div id="chartDisDaily" v-show="!dailyMonthly"></div>
        <div id="chartDisMonth" v-show="dailyMonthly"></div>
      </v-card>
      <v-card outlined class="chartDis">
        <v-layout>
          <v-spacer />
          <p class="mt-2 green--text">Issue request</p>
          <v-spacer />
          <v-spacer />

          <v-btn outlined small color="green" class="mt-2 text-capitalize">
            Detail
          </v-btn>
          <v-spacer />
        </v-layout>
        <v-divider />
        <v-data-table
          :items="issueToday"
          :headers="issueHeaders"
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
          name: "Total History",
          datas: [
            { name: "Issued", total: 454 },
            { name: "Return", total: 84 },
            { name: "Register", total: 9 },
          ],
        },
        {
          name: "Today",
          datas: [
            { name: "Issued", total: 454 },
            { name: "Return", total: 84 },
            { name: "Register", total: 9 },
          ],
        },
        {
          name: "This week",
          datas: [
            { name: "Issued", total: 454 },
            { name: "Return", total: 84 },
            { name: "Register", total: 9 },
          ],
        },
        {
          name: "This Month",
          datas: [
            { name: "Issued", total: 454 },
            { name: "Return", total: 84 },
            { name: "Register", total: 9 },
          ],
        },
        {
          name: "This year",
          datas: [
            { name: "Issued", total: 54 },
            { name: "Return", total: 94 },
            { name: "Register", total: 99 },
          ],
        },
      ],

      issueToday: [
        {
          department: "Depa 1",
          full_name: "Full name 1",
          total: 76,
        },
        {
          department: "Depa 3",
          full_name: "Full name 2",
          total: 46,
        },
        {
          department: "Depa 3",
          full_name: "Full name 3",
          total: 96,
        },
        {
          department: "Depa 4",
          full_name: "Full name 4",
          total: 78,
        },
        {
          department: "Depa 5",
          full_name: "Full name 5",
          total: 8,
        },
      ],

      issueHeaders: [
        { text: "Department", value: "department" },
        { text: "Full Name", value: "full_name" },
        { text: "Total", value: "total" },
        { text: "Action", value: "action" },
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
      else this.draChartTransaction();
    },

    async draChartTransaction() {
      /* Chart code */
      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create chart instance
      let chart = am4core.create("chartDisDaily", am4charts.XYChart);

      //

      // Increase contrast by taking evey second color
      chart.colors.step = 2;

      // Add data
      chart.data = generateChartData();

      // Create axes
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 50;

      // Create series
      function createAxisAndSeries(field, name, opposite, bullet) {
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        if (chart.yAxes.indexOf(valueAxis) != 0) {
          valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
        }

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = field;
        series.dataFields.dateX = "date";
        series.strokeWidth = 2;
        series.yAxis = valueAxis;
        series.name = name;
        series.tooltipText = "{name}: [bold]{valueY}[/]";
        series.tensionX = 0.8;
        series.showOnInit = true;

        let interfaceColors = new am4core.InterfaceColorSet();
        let triangle = "";
        let rectangle = "";

        switch (bullet) {
          case "triangle":
            bullet = series.bullets.push(new am4charts.Bullet());
            bullet.width = 12;
            bullet.height = 12;
            bullet.horizontalCenter = "middle";
            bullet.verticalCenter = "middle";

            triangle = bullet.createChild(am4core.Triangle);
            triangle.stroke = interfaceColors.getFor("background");
            triangle.strokeWidth = 2;
            triangle.direction = "top";
            triangle.width = 12;
            triangle.height = 12;
            break;
          case "rectangle":
            bullet = series.bullets.push(new am4charts.Bullet());
            bullet.width = 10;
            bullet.height = 10;
            bullet.horizontalCenter = "middle";
            bullet.verticalCenter = "middle";

            rectangle = bullet.createChild(am4core.Rectangle);
            rectangle.stroke = interfaceColors.getFor("background");
            rectangle.strokeWidth = 2;
            rectangle.width = 10;
            rectangle.height = 10;
            break;
          default:
            bullet = series.bullets.push(new am4charts.CircleBullet());
            bullet.circle.stroke = interfaceColors.getFor("background");
            bullet.circle.strokeWidth = 2;
            break;
        }

        valueAxis.renderer.line.strokeOpacity = 1;
        valueAxis.renderer.line.strokeWidth = 2;
        valueAxis.renderer.line.stroke = series.stroke;
        valueAxis.renderer.labels.template.fill = series.stroke;
        valueAxis.renderer.opposite = opposite;
      }

      createAxisAndSeries("returnItem", "ReturnItem", false, "circle");
      createAxisAndSeries("register", "Register", true, "triangle");
      createAxisAndSeries("issued", "Issued", true, "rectangle");

      // Add legend
      chart.legend = new am4charts.Legend();

      // Add cursor
      chart.cursor = new am4charts.XYCursor();

      // generate some random data, quite different range
      function generateChartData() {
        let chartData = [];
        let firstDate = new Date();
        firstDate.setDate(firstDate.getDate() - 100);
        firstDate.setHours(0, 0, 0, 0);

        let returnItem = 100;
        let issued = 75;
        let register = 200;

        for (var i = 0; i < 15; i++) {
          // we create date objects here. In your data, you can have date strings
          // and then set format of your dates using chart.dataDateFormat property,
          // however when possible, use date objects, as this will speed up chart rendering.
          let newDate = new Date(firstDate);
          newDate.setDate(newDate.getDate() + i);

          returnItem += Math.round(
            (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10
          );
          issued += Math.round(
            (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10
          );
          register += Math.round(
            (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10
          );

          chartData.push({
            date: newDate,
            returnItem: returnItem,
            issued: issued,
            register: register,
          });
        }
        return chartData;
      }
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

#chartDisDaily {
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
