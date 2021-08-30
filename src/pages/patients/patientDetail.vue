<template>
  <div class="main">
    <v-card>
      <v-toolbar dense>
        <v-btn
          text
          class="text-capitalize"
          @click="$router.push({ name: 'patinets' })"
        >
          <v-icon class="mx-3">mdi-arrow-left</v-icon>
          Go Back
        </v-btn>
        <v-spacer />
        <h2 style="color: lightgreen">Patient Detail</h2>
        <v-spacer />
        <v-spacer />
      </v-toolbar>
      <v-divider />

      <v-layout>
        <v-flex xs12 sm1></v-flex>
        <v-flex xs12 sm5>
          <label class="titleHead">Full Name : </label>
          <label class="titleCont"
            >{{ singlePatient[0].first_name }}
            {{ singlePatient[0].fathers_name }} ({{
              singlePatient[0].gender
            }})</label
          >
          <br />

          <label class="titleHead">Card Number : </label>
          <label class="titleCont">{{ singlePatient.card_number }} </label>
          <br />

          <label class="titleHead">BirthDate : </label>
          <label class="titleCont">{{ singlePatient[0].birthdate }} </label>
          <br />

          <label class="titleHead">Card Last Updated Date :</label>
          <label class="titleCont">{{
            singlePatient[0].card_updated_date
          }}</label>
          <br />

          <label class="titleHead">Phone Number : </label>
          <label class="titleCont">{{ singlePatient[0].phone_number }} </label>
          <br />

          <label class="titleHead">Patient Type : </label>
          <label v-if="singlePatient[0].patient_type === 1" class="titleCont"
            >Regular</label
          >
          <label
            v-else-if="singlePatient[0].patient_type === 2"
            class="titleCont"
            >Credit</label
          >
          <label
            v-else-if="singlePatient[0].patient_type === 3"
            class="titleCont"
            >Organization</label
          >
          <label
            v-else-if="singlePatient[0].patient_type === 4"
            class="titleCont"
            >Temporary</label
          >
        </v-flex>

        <v-flex xs12 sm6>
          <label class="titleHead">Guardian Name : </label>
          <label class="titleCont">{{ singlePatient[0].guardian_name }}</label>
          <br />

          <label class="titleHead">Guardian Contact : </label>
          <label class="titleCont">{{
            singlePatient[0].guardian_contact
          }}</label>
          <br />

          <label class="titleHead">Registration Date :</label>
          <label class="titleCont">{{
            singlePatient[0].registration_date
          }}</label>
          <br />

          <label class="titleHead">Nationality :</label>
          <label class="titleCont">{{ singlePatient[0].nationality }}</label>
          <br />

          <label class="titleHead">Address main :</label>
          <label class="titleCont"
            >{{ singlePatient[0].zone }}, {{ singlePatient[0].woreda }}</label
          >
          <br />

          <label class="titleHead">Address Detail</label>
          <label class="titleCont"
            >{{ singlePatient[0].kebele }},
            {{ singlePatient[0].house_number }}</label
          >
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      patientId: "",
    };
  },

  created() {
    const { patientId } = this.$route.params;
    this.patientId = patientId;
    this.loadData();
  },

  computed: {
    ...mapState("patient", ["singlePatient"]),
  },

  methods: {
    ...mapActions("patient", ["singlePatientInfo"]),

    async loadData() {
      await this.singlePatientInfo(this.patientId);
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
