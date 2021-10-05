<template>
  <div>
    <v-layout justify-center row>
      <v-card class="topHeaderCard">
        <div class="title">
          <label class="suTitle">Done by Me</label>
        </div>

        <div class="content">
          <v-layout>
            Onprogress :
            <v-spacer />
            <h4>23</h4>
          </v-layout>

          <v-layout>
            Served :
            <v-spacer />
            <h4>5</h4>
          </v-layout>
        </div>
      </v-card>

      <v-card class="topHeaderCard" v-for="top in topHeaders" :key="top">
        <div class="title">
          <label class="suTitle">{{ top.name }}</label>
        </div>

        <div class="content">
          <v-layout>
            <Icon />

            <v-spacer />

            <h1>{{ top.amount }}</h1>
          </v-layout>
        </div>
      </v-card>
    </v-layout>
    <br />

    <v-layout>
      <v-card outlined class="chartDis">
        Action : Detail view related with OPD and nurse communicatio
        <v-layout>
          <v-spacer />
          <p class="mt-2 green--text">Onprogress patient</p>
          <v-spacer />
          <v-spacer />

          <v-btn outlined small color="green" class="mt-2 text-capitalize">
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
      <v-card outlined class="chartDisRight">
        Action : Detail view related with approval dialod

        <v-layout>
          <v-spacer />
          <p class="mt-2 green--text">Need Approval</p>
          <v-spacer />
          <v-spacer />

          <v-btn outlined small color="green" class="mt-2 text-capitalize">
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
    </v-layout>
  </div>
</template>

<script>
import Icon from "@/assets/icons/patient.svg";

export default {
  data() {
    return {
      dailyMonthly: false,
      topHeaders: [
        {
          name: "Total Served",
          amount: 100,
          iconName: "staff",
        },
        {
          name: "Onprogress",
          amount: 5,
          iconName: "doctors",
        },
        {
          name: "Need Approval",
          amount: 20,
          iconName: "appointment",
        },
      ],

      paitentToday: [
        { card_number: "C-001", fullName: "Patient 1", status: "Onprogress" },
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
        { text: "Action", value: "action" },
      ],
    };
  },

  mounted() {
    this.loadData();
  },

  components: {
    Icon,
  },

  methods: {
    async loadData() {},
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
</style>
