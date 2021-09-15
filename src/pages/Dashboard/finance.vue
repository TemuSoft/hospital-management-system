<template>
  <div>
    <v-layout>
      <v-card class="topHeaderCard" v-for="top in topHeaders" :key="top">
        <div class="title">
          <label class="suTitle">{{ top.name }}</label>
          <v-icon class="icon" color="red">mdi-logout </v-icon>
        </div>

        <div class="content">
          {{ top.amount }}
          <br />
          {{ top.sunName }}
        </div>
      </v-card>
    </v-layout>

    <v-layout>
      <v-card outlined color="green" class="chartDis"></v-card>
      <v-card outlined color="green" class="chartDis"></v-card>
      <div></div>
    </v-layout>
  </div>
</template>

<script>
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
    };
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
  background-color: cadetblue;
}

.topHeaderCard .icon {
  float: right;
  margin-top: 10px;
}
.topHeaderCard .suTitle {
  font-size: 15px;
  margin-left: 20px;
}

.topHeaderCard .content {
  margin-top: 20px;
  margin-left: 30px;
}

.chartDis {
  width: 49%;
  margin: 0.5%;
  height: 400px;
}
</style>
