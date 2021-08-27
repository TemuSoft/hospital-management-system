<template>
  <div class="main">
    <v-card>
      <v-toolbar dense>
        <v-btn
          text
          class="text-capitalize"
          @click="$router.push({ name: 'staff' })"
        >
          <v-icon class="mx-3">mdi-arrow-left</v-icon>
          Go Back
        </v-btn>
        <v-spacer />
        <h2>Insurance Details</h2>
        <v-spacer />
        <v-spacer />
      </v-toolbar>
      <v-divider></v-divider>
      <br />
      <br />

      Insurance Name : {{ singleInsurance.name }}
      <br />
      Status : {{ singleInsurance.status }}
      <br />
      Description : {{ singleInsurance.description }}

      <h2>List of staff in the insurance / organization</h2>
      <v-data-taable
        :headers="headers"
        :search="search"
        :items="insuranceStaffList"
      >
      </v-data-taable>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      insuranceId: "",
      search: "",
      headers: [
        { text: "Full Name", value: "fullName" },
        { text: "Total Access", value: "totalAcsess" },
        { text: "Total Money", value: "totalMoney" },
        { text: "Action", value: "action" },
      ],
    };
  },

  created() {
    const { insuranceId } = this.$route.params;
    this.insuranceId = insuranceId;

    this.loadData();
  },

  computed: {
    ...mapState("insurance", ["singleInsurance", "insuranceStaffList"]),
  },

  methods: {
    ...mapActions("insurance", ["getSingleInsurance", "getInsuranceStaffList"]),

    async loadData() {
      await this.getSingleInsurance(this.insuranceId);
      await this.getInsuranceStaffList(this.insuranceId);
    },
  },
};
</script>

<style scoped>
.main {
  margin: 7%;
  margin-top: 3%;
}
</style>
