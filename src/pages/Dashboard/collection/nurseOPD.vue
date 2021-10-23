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
          :items="patientAssignedServing"
          :headers="paitentHeaders"
          :items-per-page="5"
        >
          <template v-slot:item.is_emergency="{ item }">
            <v-chip v-if="item.is_emergency === 0" color="green" small>
              No
            </v-chip>
            <v-chip v-else color="red" small>Yes</v-chip>
          </template>
        </v-data-table>
      </v-card>
      <v-card outlined class="chartDisRight">
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
          :items="patientAssignedPendding"
          :headers="paitentHeaders"
          :items-per-page="5"
        >
          <template v-slot:item.is_emergency="{ item }">
            <v-chip v-if="item.is_emergency === 0" color="green" small>
              No
            </v-chip>
            <v-chip v-else color="red" small>Yes</v-chip>
          </template>
        </v-data-table>
      </v-card>
    </v-layout>
  </div>
</template>

<script>
import Icon from "@/assets/icons/patient.svg";
import { mapActions, mapState } from "vuex";
import AccountService from "@/network/accountService";

export default {
  data() {
    return {
      login_user: AccountService.getProfile(),
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

      paitentHeaders: [
        { text: "Card No", value: "card_number" },
        { text: "Name", value: "full_name" },
        { text: "Gender", value: "gender" },
        { text: "Guardian Name", value: "guardian_name" },
        { text: "Is Emergency?", value: "is_emergency" },
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
    ...mapState("nurse", ["patientAssignedPendding", "patientAssignedServing"]),
  },

  methods: {
    ...mapActions("nurse", [
      "getPenddingPatientNurse",
      "getServingPatientNurse",
    ]),

    async loadData() {
      await this.getPenddingPatientNurse(this.login_user.id);
      await this.getServingPatientNurse(this.login_user.id);
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
