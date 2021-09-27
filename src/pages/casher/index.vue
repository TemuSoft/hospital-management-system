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

    <v-dialog
      v-model="paymentDialog"
      width="1000"
      persistent
      v-if="selectedPatinet.patient"
    >
      <v-card>
        <v-toolbar dense color="green">
          Payment Approval
          <v-spacer />

          <Close @click="paymentDialog = false" class="icon" />
        </v-toolbar>
        <br />

        <v-card-text>
          <v-form @submit.prevent="cardRenewal" ref="cardRenewal">
            <v-layout>
              <v-flex xs12 sm1></v-flex>
              <v-flex xs12 sm6>
                <label class="titleHead">Full Name : </label>
                <label class="titleCont">
                  {{ selectedPatinet.patient.name }}
                  ({{ selectedPatinet.patient.gender }})
                </label>
                <br />
                <label class="titleHead">Card Number : </label>
                <label class="titleCont">
                  {{ selectedPatinet.patient.card_number }}
                </label>
                <br />
                <label class="titleHead">Guardian Name : </label>
                <label class="titleCont">
                  {{ selectedPatinet.patient.guardian_name }}
                </label>
                <br />
                <br />
                <br />
              </v-flex>

              <v-flex xs12 sm4>
                <label class="titleHead">Reason : </label>
                <label class="titleCont">
                  {{ selectedPatinet.reason }}
                </label>
                <br />

                <label class="titleHead">Amount : </label>
                <label class="titleCont">
                  {{ selectedPatinet.amount }}
                </label>
                <br />
                <br />

                <v-text-field label="Payed By?" v-model="who_payed" dense />
              </v-flex>
            </v-layout>

            <v-layout>
              <v-autocomplete
                :items="paymentOptionList"
                :rules="inputRules"
                item-text="name"
                item-value="value"
                dense
                outlined
                v-model="paymentOption"
              />
            </v-layout>

            <v-layout>
              <v-checkbox
                v-model="confirmPaymentCheckbox"
                label="Select me to confirm payment"
              />
              <br />
            </v-layout>

            <v-layout>
              <v-btn
                v-show="confirmPaymentCheckbox"
                small
                outlined
                text
                color="green"
                @click="paymentDone()"
                class="text-capitalize"
              >
                Payment Done
              </v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import Close from "@/assets/icons/close.svg";

export default {
  data() {
    return {
      paymentDialog: false,
      selectedPatinet: {},

      headers: [
        { text: "Card No", value: "patient.card_number" },
        { text: "Full Name", value: "patient.name" },
        { text: "Guardian", value: "patient.guardian_name" },
        { text: "Reason", value: "reason" },
        { text: "Price", value: "amount" },
        { text: "Action", value: "action" },
      ],

      confirmPaymentCheckbox: false,
      paymentOptionList: [
        { name: "Pre-payment", value: 1 },
        { name: "Post-payment", value: 2 },
        { name: "Cash", value: 3 },
      ],
    };
  },

  created() {
    this.loadData();
  },

  components: {
    Close,
  },

  computed: {
    ...mapState("cashier", ["paymnetRequest"]),
  },

  methods: {
    ...mapActions("cashier", ["getPaymentRequest"]),

    async loadData() {
      await this.getPaymentRequest();
    },

    async paymentDialogProcess(item) {
      this.paymentDialog = true;
      this.selectedPatinet = item;
    },

    async paymentDone() {
      alert(true);
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
