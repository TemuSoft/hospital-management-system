<template>
  <div class="main">
    <h2 style="color: lightgreen">Patient Detail</h2>
    <br />

    <v-card flat>
      <v-layout>
        <v-flex xs12 sm1></v-flex>
        <v-flex xs12 sm5>
          <label class="titleHead">Full Name : </label>
          <label class="titleCont"
            >{{ mainInfo.first_name }} {{ mainInfo.fathers_name }} ({{
              mainInfo.gender
            }})</label
          >
          <br />

          <label class="titleHead">Card Number : </label>
          <label class="titleCont">{{ mainInfo.card_number }} </label>
          <br />

          <label class="titleHead">BirthDate : </label>
          <label class="titleCont">{{ mainInfo.birthdate }} </label>
          <br />

          <label class="titleHead">Card Last Updated Date :</label>
          <label class="titleCont">{{ mainInfo.card_updated_date }}</label>
          <br />

          <label class="titleHead">Phone Number : </label>
          <label class="titleCont">{{ mainInfo.phone_number }} </label>
          <br />

          <label class="titleHead">Patient Type : </label>
          <label v-if="mainInfo.patient_type === 1" class="titleCont"
            >Regular</label
          >
          <label v-else-if="mainInfo.patient_type === 2" class="titleCont"
            >Credit</label
          >
          <label v-else-if="mainInfo.patient_type === 3" class="titleCont"
            >Organization</label
          >
          <label v-else-if="mainInfo.patient_type === 4" class="titleCont"
            >Temporary</label
          >
        </v-flex>

        <v-flex xs12 sm6>
          <label class="titleHead">Guardian Name : </label>
          <label class="titleCont">{{ mainInfo.guardian_name }}</label>
          <br />

          <label class="titleHead">Guardian Contact : </label>
          <label class="titleCont">{{ mainInfo.guardian_contact }}</label>
          <br />

          <label class="titleHead">Registration Date :</label>
          <label class="titleCont">{{ mainInfo.registration_date }}</label>
          <br />

          <label class="titleHead">Nationality :</label>
          <label class="titleCont">{{ mainInfo.nationality }}</label>
          <br />

          <label class="titleHead">Address main :</label>
          <label class="titleCont"
            >{{ mainInfo.zone }}, {{ mainInfo.woreda }}</label
          >
          <br />

          <label class="titleHead">Address Detail</label>
          <label class="titleCont"
            >{{ mainInfo.kebele }}, {{ mainInfo.house_number }}</label
          >
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      patientDetail: [
        {
          id: 5,
          card_number: "Ga003",
          first_name: "Temesgen",
          fathers_name: "Kefie",
          last_name: "Tsega",
          gender: "Male",
          phone_number: "09208374",
          nationality: 1,
          region: "",
          zone: "",
          woreda: "",
          kebele: "",
          house_number: "",
          birthdate: "2021-08-21",
          patient_type: 1,
          status: 0,
          guardian_name: "Guardian ...",
          guardian_contact: "0912056623",
          card_updated_date: "2021-08-21",
          registration_date: "2021-08-21",
        },
      ],
      mainInfo: {},
    };
  },

  created() {
    this.loadData();
  },

  methods: {
    async loadData() {
      this.mainInfo = this.patientDetail[0];
    },
  },
};
</script>

<style scoped>
.main {
  margin: 7%;
  margin-top: 3%;
}

.titleHead {
  font-family: bold;
  font: bold 12px/30px Georgia;
  letter-spacing: 2px;
}
.titleCont {
  font-size: 17px;
}
</style>
