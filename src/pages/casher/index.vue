<template>
  <div class="main">
    <h2>Payment Request</h2>
    {{ paymnetRequest }}
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
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      headers: [
        { text: "Card No", value: "card_number" },
        { text: "Full Name", value: "name" },
        { text: "Reason", value: "reason" },
        { text: "Price", value: "amount" },
        { text: "Action", value: "action" },
      ],
    };
  },

  created() {
    this.loadData();
  },

  computed: {
    ...mapState("cashier", ["paymnetRequest"]),
  },

  methods: {
    ...mapActions("cashier", ["getPaymentRequest"]),

    async loadData() {
      await this.getPaymentRequest();
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
