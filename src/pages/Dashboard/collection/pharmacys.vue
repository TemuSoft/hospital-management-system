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
          <p class="mt-2 green--text">Medicine Request</p>
          <v-spacer />
          <v-spacer />

          <v-btn outlined small color="green" class="mt-2 text-capitalize">
            Detail
          </v-btn>
          <v-spacer />
        </v-layout>
        <v-divider />
        <v-data-table
          :items="medicineToday"
          :headers="medicineHeaders"
          :items-per-page="5"
        />
      </v-card>
      <v-card outlined class="chartDis">
        <v-layout>
          <v-spacer />
          <p class="mt-2 green--text">Medicine will expired this Month</p>
          <v-spacer />
          <v-spacer />

          <v-btn outlined small color="green" class="mt-2 text-capitalize">
            Detail
          </v-btn>
          <v-spacer />
        </v-layout>
        <v-divider />
        <v-data-table
          :items="medicineExpired"
          :headers="medicineExpiredHeaders"
          :items-per-page="5"
        />
      </v-card>
    </v-layout>
  </div>
</template>

<script>
// import Icon from "@/assets/icons/patient.svg";

export default {
  data() {
    return {
      dailyMonthly: false,
      topHeaders: [
        {
          name: "Total History",
          amount: 213,
          datas: [
            { name: "Request", total: 454 },
            { name: "Medicine", total: 84 },
            { name: "Price", total: 9 },
          ],
        },
        {
          name: "Today",
          amount: 313,
          datas: [
            { name: "Request", total: 454 },
            { name: "Medicine", total: 84 },
            { name: "Price", total: 9 },
          ],
        },
        {
          name: "This week",
          amount: 75,
          datas: [
            { name: "Request", total: 454 },
            { name: "Medicine", total: 84 },
            { name: "Price", total: 9 },
          ],
        },
        {
          name: "This Month",
          amount: 675,
          datas: [
            { name: "Request", total: 454 },
            { name: "Medicine", total: 84 },
            { name: "Price", total: 9 },
          ],
        },
        {
          name: "This year",
          amount: 857,
          datas: [
            { name: "Request", total: 54 },
            { name: "Medicine", total: 94 },
            { name: "Price", total: 99 },
          ],
        },
      ],

      medicineToday: [
        {
          card_number: "Card No 01",
          full_name: "Full name 1",
          total: 76,
        },
        {
          card_number: "Card No 02",
          full_name: "Full name 2",
          total: 46,
        },
        {
          card_number: "Card No 03",
          full_name: "Full name 3",
          total: 96,
        },
        {
          card_number: "Card No 04",
          full_name: "Full name 4",
          total: 78,
        },
        {
          card_number: "Card No 05",
          full_name: "Full name 5",
          total: 8,
        },
      ],
      medicineHeaders: [
        { text: "Card NUmber", value: "card_number" },
        { text: "Full Name", value: "full_name" },
        { text: "Total", value: "total" },
        { text: "Action", value: "action" },
      ],

      medicineExpired: [
        {
          name: "Medicine 1",
          category: "Category 1",
          expire_date: "2021-10-01",
        },
        {
          name: "Medicine 2",
          category: "Category 2",
          expire_date: "2021-10-02",
        },
        {
          name: "Medicine 3",
          category: "Category 3",
          expire_date: "2021-10-03",
        },
        {
          name: "Medicine 4",
          category: "Category 4",
          expire_date: "2021-10-04",
        },
        {
          name: "Medicine 5",
          category: "Category 5",
          expire_date: "2021-10-05",
        },
      ],
      medicineExpiredHeaders: [
        { text: "Name", value: "name", align: "left" },
        { text: "Category", value: "category" },
        { text: "Expire Date", value: "expire_date" },
        { text: "Actions", value: "actions" },
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
    async loadData() {},
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
</style>
