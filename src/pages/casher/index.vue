<template>
  <div class="main">
    {{ paymnetRequest }}
    <h2>Payment Request</h2>
    <v-data-table :items="paymnetRequest" :headers="headers">
      <template v-slot:top>
        <br />
        <v-layout>
          <v-text-field
            v-model="search"
            label="Enter search text ..."
            dense
            single-line
            hide-details
          ></v-text-field>
          <v-spacer />
          <v-spacer />

          <v-btn
            small
            outlined
            class="text-capitalize"
            @click="$router.push({ name: 'registerPrepayment' })"
          >
            Register Prepayment
          </v-btn>
          <v-spacer />

          <v-btn
            small
            outlined
            class="text-capitalize"
            @click="$router.push({ name: 'paymentHistory' })"
          >
            Payment History
          </v-btn>
        </v-layout>

        <br />
      </template>

      <template v-slot:item.action="{ item }">
        <v-btn
          text
          color="green"
          class="text-capitalize"
          @click="paymentDialogProcess(item)"
        >
          Approve
        </v-btn>
      </template>
    </v-data-table>

    <CardRelatedPayment
      :selectedPatinet="selectedPatinet"
      :paymentDialogCard="paymentDialogCard"
      @cardPaymentControl="closeDialog($event)"
    />

    <TestCaseRelatedPayment
      :selectedPatinet="selectedPatinet"
      :paymentDialogOthers="paymentDialogOthers"
      @testCasePaymentControl="closeDialog($event)"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import CardRelatedPayment from "./cardRelatedPayment.vue";
import TestCaseRelatedPayment from "./testCaseRelatedPayment.vue";

export default {
  data() {
    return {
      paymentDialogCard: false,
      paymentDialogOthers: false,
      selectedPatinet: {},

      search: "",
      headers: [
        { text: "Card No", value: "patient.card_number" },
        { text: "Full Name", value: "patient.name" },
        { text: "Guardian", value: "patient.guardian_name" },
        { text: "Reason", value: "reason" },
        { text: "Price", value: "amount" },
        { text: "Action", value: "action" },
      ],
    };
  },

  created() {
    this.loadData();
  },

  components: {
    CardRelatedPayment,
    TestCaseRelatedPayment,
  },

  computed: {
    ...mapState("cashier", ["paymnetRequest"]),
  },

  methods: {
    ...mapActions("cashier", ["getPaymentRequest"]),

    async loadData() {
      await this.getPaymentRequest();
    },

    async closeDialog() {
      this.paymentDialogCard = false;
      this.paymentDialogOthers = false;
    },

    async paymentDialogProcess(item) {
      item.reason_id = 2;

      if (item.reason_id === 0 || item.reason_id === 1)
        this.paymentDialogCard = true;
      else this.paymentDialogOthers = true;

      this.selectedPatinet = item;
    },
  },
};
</script>

<style scoped>
.main {
  margin: 7%;
  margin-top: 2%;
}
</style>
