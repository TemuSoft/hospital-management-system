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

    <RegularPayment
      :selectedPatinet="selectedPatinet"
      :paymentDialogRegular="paymentDialogRegular"
      @testCasePaymentControl="closeDialog($event)"
    />

    <InsurancePayment
      :selectedPatinet="selectedPatinet"
      :paymentDialogInsurance="paymentDialogInsurance"
      @testCasePaymentControl="closeDialog($event)"
    />

    <CreditPayment
      :selectedPatinet="selectedPatinet"
      :paymentDialogCredit="paymentDialogCredit"
      @testCasePaymentControl="closeDialog($event)"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import CardRelatedPayment from "./paymentDialog/cardRelatedPayment.vue";
import RegularPayment from "./paymentDialog/RegularPayment.vue";
import InsurancePayment from "./paymentDialog/InsurancePayment.vue";
import CreditPayment from "./paymentDialog/CreditPayment.vue";

export default {
  data() {
    return {
      paymentDialogCard: false,
      paymentDialogRegular: false,
      paymentDialogInsurance: false,
      paymentDialogCredit: false,
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
    RegularPayment,
    InsurancePayment,
    CreditPayment,
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
      this.paymentDialogRegular = false;
      this.paymentDialogInsurance = false;
      this.paymentDialogCredit = false;
    },

    async paymentDialogProcess(item) {
      item.reason_id = 2;
      item.patient.patient_type = 3;
      let pt = item.patient.patient_type;

      if (item.reason_id === 0 || item.reason_id === 1)
        this.paymentDialogCard = true;
      else {
        if (pt === 1 || pt === 4) this.paymentDialogRegular = true;
        else if (pt === 3) this.paymentDialogInsurance = true;
        else this.paymentDialogCredit = true;
      }

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
