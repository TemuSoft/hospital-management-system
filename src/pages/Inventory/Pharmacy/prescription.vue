<template>
  <div class="main">
    <v-btn small outlined @click="printReferral()">Print referral</v-btn>
    <v-card>
      <v-data-table
        :items="prescriptionList"
        :headers="headers"
        :search="search"
        :items-per-page="10"
      >
        <template v-slot:item.dateT="{ item }">
          {{ getDateTimeFormat(item.dateT) }}
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip v-if="item.status === 0" color="yellow">Pendding</v-chip>
          <v-chip v-else color="yellow">Something</v-chip>
        </template>

        <template v-slot:item.action="{ item }">
          <Detail class="icon" @click="detailPrescription(item.service_id)" />
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import Detail from "@/assets/icons/eye.svg";
import { mapActions, mapState } from "vuex";
import PrintPdf from "@/print";

export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "Date", value: "dateT" },
        { text: "Full Name", value: "patient_name" },
        { text: "Card Number", value: "card_number" },
        { text: "From", value: "ordered_by" },
        { text: "Status", value: "status" },
        { text: "Action", value: "action" },
      ],
    };
  },

  components: {
    Detail,
  },

  created() {
    this.loadData();
  },

  computed: {
    ...mapState("prescription", ["prescriptionList"]),
  },

  methods: {
    ...mapActions("prescription", ["getPrescriptionList"]),

    async loadData() {
      await this.getPrescriptionList();
    },

    async detailPrescription(service_id) {
      this.$router.push({
        name: "prescriptionDetail",
        params: { service_id: service_id },
      });
    },

    async printReferral() {
      let profile = {
        name: "Temesgen Kefie",
        gender: "Male",
        mobile_number: "0987654321",
        birthdate: "04-06-1998",
      };

      let data = [
        "To continue /start anti-TB treatment ",
        "Default from treatment (TB /ARVs) ",
        "Nutritional support ",
        "Complications",
        "Psycho-social support ",
        "TB suspect(Screening)",
        "ARVs",
      ];

      PrintPdf.referalPdfMaker(data, profile);
    },

    getDateTimeFormat(input) {
      let date = new Date(input).toDateString();
      let time = new Date(input).toTimeString().substr(0, 5);
      return date + " " + time;
    },
  },
};
</script>

<style scoped>
.main {
  margin: 5%;
  margin-top: 2%;
}

.icon {
  cursor: pointer;
}
</style>
