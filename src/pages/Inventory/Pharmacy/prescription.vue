<template>
  <div class="main">
    <v-btn small outlined @click="printPrescription()">Print</v-btn>
    <v-card>
      <v-data-table
        :items="prescriptionList"
        :headers="headers"
        :search="search"
        :items-per-page="10"
      >
        <template v-slot:item.action>
          <Detail class="icon" @click="detailPrescription(item.id)" />
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
        { text: "Full Name", value: "fullName" },
        { text: "Card Number", value: "card_number" },
        { text: "From", value: "ordered_by" },
        { text: "Status", value: "status" },
        { text: "Action", value: "action" },
      ],
      medicineList: [
        {
          medicine: "Parastmonl",
          dosage: "2",
          totalQTY: "30",
          duration: "4hrs",
          route: "Mouth",
          frequency: "3 in a day",
        },
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

    async detailPrescription(id) {
      this.$router.push({
        name: "prescriptionDetail",
        params: { prescriptionId: id },
      });
    },

    async printPrescription() {
      let profile = { name: "Temesgen Kefie", birthdate: "04-06-1998" };
      PrintPdf.prescriptionPdfMaker(this.medicineList, profile);
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
