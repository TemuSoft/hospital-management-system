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

    <v-layout row class="pa-5" justify-center>
      <v-card elevation="5" class="ma-3" width="48%">
        <h3 class="blue">OPD Detail</h3>
        <v-toolbar color="green" dense class="pa-3">
          <v-autocomplete
            :items="OPDStaffList"
            dense
            rounded
            item-text="full_name"
            item-value="id"
            v-model="OPDStaffSelected"
            @change="loadOPDInfo()"
          />
          <v-spacer />

          <v-dialog
            ref="dialogOPD"
            v-model="modalOPD"
            :return-value.sync="dateOPD"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateOPD"
                rounded
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dateOPD" scrollable range>
              <v-spacer></v-spacer>
              <v-btn text color="red" @click="modalOPD = false"> Cancel </v-btn>
              <v-btn
                text
                color="green"
                @click="$refs.dialogOPD.save(dateOPD), loadOPDInfo()"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-toolbar>

        <v-card-text>
          <v-layout>
            <h3>Lab Orders</h3>
            <v-spacer />
            <h3>{{ nurseDoneInfo.lab_orders }}</h3>
          </v-layout>
          <v-divider />

          <v-layout>
            <h3>Money From Lab</h3>
            <v-spacer />
            <h3>{{ nurseDoneInfo.money_from_lab }}</h3>
          </v-layout>
          <v-divider />

          <v-layout>
            <h3>Imaging Orders</h3>
            <v-spacer />
            <h3>{{ nurseDoneInfo.imaging_orders }}</h3>
          </v-layout>
          <v-divider />

          <v-layout>
            <h3>Patient Served</h3>
            <v-spacer />
            <h3>{{ nurseDoneInfo.patients_served }}</h3>
          </v-layout>
          <v-divider />
        </v-card-text>
      </v-card>

      <v-card elevation="5" class="ma-3" width="48%">
        <h3 class="blue">Nurse Detail</h3>
        <v-toolbar color="green" dense class="pa-3">
          <v-autocomplete
            :items="nurseStaffList"
            dense
            rounded
            item-text="full_name"
            item-value="id"
            v-model="nurseStaffSelected"
            @change="loadNurseInfo()"
          />
          <v-spacer />

          <v-dialog
            ref="dialogNurse"
            v-model="modalNurse"
            :return-value.sync="dateNurse"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateNurse"
                rounded
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dateNurse" scrollable range>
              <v-spacer></v-spacer>
              <v-btn text color="red" @click="modalNurse = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="green"
                @click="$refs.dialogNurse.save(dateNurse), loadNurseInfo()"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-toolbar>

        <v-card-text>
          <v-layout>
            <h3>Lab Orders</h3>
            <v-spacer />
            <h3>{{ nurseDoneInfo.lab_orders }}</h3>
          </v-layout>
          <v-divider />

          <v-layout>
            <h3>Money From Lab</h3>
            <v-spacer />
            <h3>{{ nurseDoneInfo.money_from_lab }}</h3>
          </v-layout>
          <v-divider />

          <v-layout>
            <h3>Imaging Orders</h3>
            <v-spacer />
            <h3>{{ nurseDoneInfo.imaging_orders }}</h3>
          </v-layout>
          <v-divider />

          <v-layout>
            <h3>Patient Served</h3>
            <v-spacer />
            <h3>{{ nurseDoneInfo.patients_served }}</h3>
          </v-layout>
          <v-divider />
        </v-card-text>
      </v-card>

      <v-card elevation="5" class="ma-3" width="48%">
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
              <v-btn
                text
                color="green"
                @click="$refs.dialog.save(dateOne), loadGeneralInfo()"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-toolbar>

        <v-card-text>
          <v-layout>
            <h3>New Patients</h3>
            <v-spacer />
            <h3>{{ hospitalPatientInfo.new_patinets }}</h3>
          </v-layout>
          <v-divider />

          <v-layout>
            <h3>Vistors</h3>
            <v-spacer />
            <h3>{{ hospitalPatientInfo.total_visitors }}</h3>
          </v-layout>
          <v-divider />

          <v-layout>
            <h3>Lab Orders</h3>
            <v-spacer />
            <h3>{{ hospitalPatientInfo.total_lab_orders }}</h3>
          </v-layout>
          <v-divider />

          <v-layout>
            <h3>Imaging Orders</h3>
            <v-spacer />
            <h3>{{ hospitalPatientInfo.total_imaging_orders }}</h3>
          </v-layout>
          <v-divider />

          <v-layout>
            <h3>Incomes</h3>
            <v-spacer />
            <h3>{{ hospitalPatientInfo.total_income }}</h3>
          </v-layout>
          <v-divider />
        </v-card-text>
      </v-card>

      <v-card elevation="5" class="ma-3" width="48%">
        <v-layout class="blue">
          <h3>Cashier Detail</h3>
          <v-spacer />
          <v-spacer />
          <h5 class="mt-2">Cash : {{ cashierDoneInfo.amount }} ETB</h5>
          <v-spacer />

          <v-btn
            small
            class="text-capitalize white"
            @click="cashierDetailView = !cashierDetailView"
          >
            Detail
          </v-btn>
        </v-layout>

        <v-toolbar color="green" dense class="pa-3">
          <v-autocomplete
            :items="cashierStaffList"
            dense
            rounded
            item-text="full_name"
            item-value="id"
            v-model="cashierStaffSelected"
            @change="loadCashierInfo()"
          />
          <v-spacer />

          <v-dialog
            ref="dialogCashier"
            v-model="modalCashier"
            :return-value.sync="dateCashier"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateCashier"
                rounded
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dateCashier" scrollable range>
              <v-spacer></v-spacer>
              <v-btn text color="red" @click="modalCashier = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="green"
                @click="
                  $refs.dialogCashier.save(dateCashier), loadCashierInfo()
                "
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-toolbar>

        <v-card-text>
          {{ cashierDoneInfo.detail }}
          <v-data-table
            v-if="cashierDetailView"
            :items="cashierDoneInfo.detail"
            :headers="cashierHeaders"
            dense
            :items-per-page="3"
          >
            <template v-slot:item.number="{ item }">
              {{ cashierDoneInfo.indexOf(item) + 1 }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>

      <v-card elevation="5" class="chartDis ma-3" width="48%">
        <v-toolbar dense color="green">
          <v-spacer />
          <p class="mt-3" v-if="!dailyMonthlyPatient">
            Patient Daily statistical view
          </p>
          <p class="mt-3" v-else>Patient Monthly statistical view</p>
          <v-spacer />
          <v-spacer />

          <v-checkbox
            dense
            class="mt-3"
            v-model="dailyMonthlyPatient"
            label="Monthly View"
          />
          <v-spacer />
        </v-toolbar>
        <v-divider />
        <div id="chartPatient"></div>
      </v-card>

      <v-card elevation="5" class="chartDis ma-3" width="48%">
        <v-toolbar dense color="green">
          <v-spacer />
          <p class="mt-3" v-if="!dailyMonthlyMoney">
            Money Daily statistical view
          </p>
          <p class="mt-3" v-else>Money Monthly statistical view</p>
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

      <v-card elevation="5" class="mt-3" width="98%">
        <v-toolbar color="green" dense class="pa-3">
          <h3 class="piechartHeading">Laboratory Ratio</h3>
          <v-spacer />
          <v-dialog
            ref="dialogPie"
            v-model="modalPie"
            :return-value.sync="datePie"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="datePie"
                rounded
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="datePie" scrollable range>
              <v-spacer></v-spacer>
              <v-btn text color="red" @click="modalPie = false"> Cancel </v-btn>
              <v-btn
                text
                color="green"
                @click="$refs.dialogPie.save(datePie), loadPicechartData()"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
          <v-spacer />
          <h3 class="piechartHeading">Laboratory Vs Vistors</h3>
        </v-toolbar>

        <v-divider />
        <v-card-text>
          <v-layout height="300px">
            <div id="piehartLaboratory"></div>
            <v-spacer />
            <div id="piehartLaboratoryVistors"></div>
          </v-layout>
        </v-card-text>
        <v-divider />

        <v-layout>
          <v-spacer />
          <h4 class="green--text">Total No Of Vistors : 56</h4>
          <v-spacer />
          <h4 class="green--text">Money Generated : 35667</h4>
          <v-spacer />
        </v-layout>
      </v-card>

      <!-- <v-card elevation="5" class="mt-3" width="98%">
        {{ piechartLaboratoryVistors }}
        <v-toolbar color="green" dense class="pa-3">
          <h3 class="piechartHeading">Laboratory Vs Vistors</h3>
          <v-spacer />
          <v-dialog
            ref="dialogPie"
            v-model="modalPie"
            :return-value.sync="datePie"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="datePie"
                rounded
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="datePie" scrollable range>
              <v-spacer></v-spacer>
              <v-btn text color="red" @click="modalPie = false"> Cancel </v-btn>
              <v-btn
                text
                color="green"
                @click="$refs.dialogPie.save(datePie), loadPicechartData()"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
          <v-spacer />
          <h3 class="piechartHeading">Imaging Vs Vistors</h3>
        </v-toolbar>

        <v-divider />
        <v-card-text>
          <v-layout height="300px">
            <div id="piehartLaboratory"></div>
            <v-spacer />
            <div id="piehartImaging"></div>
          </v-layout>
        </v-card-text>
        <v-divider />

        <v-layout>
          <v-spacer />
          <h4 class="green--text">Total No Of Vistors : 56</h4>
          <v-spacer />
          <h4 class="green--text">Money Generated : 35667</h4>
          <v-spacer />
        </v-layout>
      </v-card> -->
    </v-layout>
  </div>
</template>

<script>
import Patient from "@/assets/icons/patient.svg";
import Appointment from "@/assets/icons/patient.svg";
import Doctor from "@/assets/icons/patient.svg";
import Staff from "@/assets/icons/patient.svg";

import AccountService from "@/network/accountService";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      login_user: AccountService.getProfile(),
      modalPie: false,
      datePie: [
        new Date().toISOString().substr(0, 10),
        new Date().toISOString().substr(0, 10),
      ],

      dailyMonthlyPatient: false,
      dailyMonthlyMoney: false,

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

      modalOPD: false,
      dateOPD: [
        new Date().toISOString().substr(0, 10),
        new Date().toISOString().substr(0, 10),
      ],
      OPDStaffSelected: "",

      modalNurse: false,
      dateNurse: [
        new Date().toISOString().substr(0, 10),
        new Date().toISOString().substr(0, 10),
      ],
      nurseStaffSelected: 0,

      modalCashier: false,
      dateCashier: [
        new Date().toISOString().substr(0, 10),
        new Date().toISOString().substr(0, 10),
      ],
      cashierStaffSelected: "",

      cashierDetailView: false,
      cashierHeaders: [
        { text: "No", value: "number" },
        { text: "Patient / Company", value: "name" },
        { text: "Amount", value: "amount" },
        { text: "Reason", value: "reason" },
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

  computed: {
    ...mapState("dashboard", [
      "receptionDashboardLiceChart",
      "nurseStaffList",
      "OPDStaffList",
      "cashierStaffList",
      "piechartLaboratory",
      "piechartLaboratoryVistors",
      "hospitalPatientInfo",
      "nurseDoneInfo",
      "OPDDoneInfo",
      "cashierDoneInfo",
    ]),
  },

  methods: {
    ...mapActions("dashboard", [
      "getReceptionDashboardLiceChart",
      "getStaffListByRole",
      "getPiechartLaboratory",
      "getPiechartLaboratoryVistors",
      "getHospitalPatientInfo",
      "getNurseDoneInfo",
      "getOPDDoneInfo",
      "getCashierDoneInfo",
    ]),

    async loadData() {
      await this.getStaffListByRole("nurse");
      await this.getStaffListByRole("opd");
      await this.getStaffListByRole("cashier");

      this.OPDStaffSelected = this.OPDStaffList[0].id;
      this.nurseStaffSelected = this.nurseStaffList[0].id;
      this.cashierStaffSelected = this.cashierStaffList[0].id;
      await this.getReceptionDashboardLiceChart();
      await this.drawChartPatient();
      await this.drawChartMoney();

      this.loadOPDInfo();
      this.loadNurseInfo();
      this.loadGeneralInfo();
      this.loadCashierInfo();
      this.loadPicechartData();
    },

    async loadOPDInfo() {
      if (this.dateOPD.length === 1) this.dateOPD[1] = this.dateOPD[0];
      await this.getOPDDoneInfo({
        date: this.dateOPD,
        opd_id: this.OPDStaffSelected,
      });
    },

    async loadNurseInfo() {
      if (this.dateNurse.length === 1) this.dateNurse[1] = this.dateNurse[0];
      await this.getNurseDoneInfo({
        date: this.dateNurse,
        nurse_id: this.nurseStaffSelected,
      });
    },

    async loadGeneralInfo() {
      if (this.dateOne.length === 1) this.dateOne[1] = this.dateOne[0];
      await this.getHospitalPatientInfo(this.dateOne);
    },

    async loadCashierInfo() {
      if (this.dateCashier.length === 1)
        this.dateCashier[1] = this.dateCashier[0];
      await this.getCashierDoneInfo({
        date: this.dateCashier,
        cashier_id: this.cashierStaffSelected,
      });
    },

    async loadPicechartData() {
      if (this.datePie.length === 1) this.datePie[1] = this.datePie[0];
      await this.getPiechartLaboratory(this.datePie);
      await this.getPiechartLaboratoryVistors(this.datePie);
      await this.drawPiechartLaboratory();
      await this.drawPiechartLaboratoryVistors();

      await this.drawPiechartImaging();
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

    async drawChartMoney() {
      am4core.useTheme(am4themes_animated);
      // Create chart instance
      let chart = am4core.create("chartMoney", am4charts.XYChart);
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

    async drawPiechartLaboratory() {
      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create chart instance
      let chart = am4core.create("piehartLaboratory", am4charts.PieChart);

      // Add data
      chart.data = this.piechartLaboratory;

      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "count";
      pieSeries.dataFields.category = "case_name";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeOpacity = 1;

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;

      chart.hiddenState.properties.radius = am4core.percent(0);
    },

    async drawPiechartLaboratoryVistors() {
      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create chart instance
      let chart = am4core.create(
        "piehartLaboratoryVistors",
        am4charts.PieChart
      );

      // Add data
      let d = this.piechartLaboratoryVistors;
      chart.data = [
        { title: "Have Laboratory", count: d.done },
        { title: "No Laboratory", count: d.totalVisitor - d.done },
      ];

      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "count";
      pieSeries.dataFields.category = "title";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeOpacity = 1;

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;

      chart.hiddenState.properties.radius = am4core.percent(0);
    },

    async drawPiechartImaging() {
      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create chart instance
      let chart = am4core.create("piehartImaging", am4charts.PieChart);

      // Add data
      chart.data = [
        {
          imaging: "Imaging 1",
          patient: 501.9,
        },
        {
          imaging: "Imaging 2",
          patient: 301.9,
        },
        {
          imaging: "Imaging 3",
          patient: 201.1,
        },
        {
          imaging: "Imaging 3",
          patient: 165.8,
        },
        {
          imaging: "Imaging 4",
          patient: 139.9,
        },
        {
          imaging: "Imaging 5",
          patient: 128.3,
        },
        {
          imaging: "Imaging 6",
          patient: 99,
        },
      ];

      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "patient";
      pieSeries.dataFields.category = "imaging";
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

.chartDis,
.chartDisRight {
  height: 350px;
}

#chartPatient,
#chartMoney {
  width: 100%;
  height: 300px;
  margin-left: 0;
  /* height: 100%; */
}

.piechartHeading {
  margin-top: -2%;
}

#piehartLaboratory,
#piehartLaboratoryVistors,
#piehartImaging {
  width: 48%;
  height: 250px;
  margin-left: 0.5%;
}
</style>
