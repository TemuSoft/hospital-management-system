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

    <v-dialog
      v-model="paymentDialogOthers"
      width="1000"
      persistent
      v-if="selectedPatinet.patient"
    >
      <v-card>
        <v-toolbar dense color="green">
          Payment Approval Laboratory and Imaging
          <v-spacer />

          <Close @click="paymentDialogOthers = false" class="icon" />
        </v-toolbar>
        <br />

        <v-card-text>
          <v-form @submit.prevent="paymentDone" ref="paymentDone">
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

                <label class="titleHead">Prepayment Info : </label>
                <label class="titleCont">
                  {{ prepaymentAmount }}
                </label>
                <br />

                <br />
                <br />
              </v-flex>

              <v-flex xs12 sm4>
                <label class="titleHead">Patient Type : </label>
                <label
                  v-if="selectedPatinet.patient.patient_type === 1"
                  class="titleCont"
                >
                  Regular
                </label>
                <label
                  v-else-if="selectedPatinet.patient.patient_type === 2"
                  class="titleCont"
                >
                  Credit
                </label>
                <label
                  v-else-if="selectedPatinet.patient.patient_type === 3"
                  class="titleCont"
                >
                  Organization
                </label>
                <label
                  v-else-if="selectedPatinet.patient.patient_type === 4"
                  class="titleCont"
                >
                  Temporary
                </label>
                <br />

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

                <v-text-field
                  v-if="selectedPatinet.patient.patient_type != 3"
                  label="Payed By?"
                  v-model="paymentInfo.who_payed"
                  dense
                />
              </v-flex>
            </v-layout>

            <!-- Used to remove payment option whrn patient have insrance -->
            <v-layout v-if="selectedPatinet.patient.patient_type != 3">
              <!-- Used to denied permission for non-credit patient credit option-->
              <v-autocomplete
                v-if="selectedPatinet.patient.patient_type != 2"
                :items="paymentOptionList2"
                :rules="inputRules"
                item-text="name"
                item-value="value"
                dense
                outlined
                @change="validatePayment"
                chips
                multiple
                v-model="paymentInfo.payment_option"
              />
              <v-autocomplete
                v-else
                :items="paymentOptionList1"
                :rules="inputRules"
                item-text="name"
                item-value="value"
                dense
                outlined
                chips
                multiple
                @change="validatePayment"
                v-model="paymentInfo.payment_option"
              />
            </v-layout>

            <h3 style="color: green">
              Imaging and Laboratory Test Payment Requests
            </h3>
            <br />

            <v-layout>
              <table>
                <tr>
                  <th>Cash</th>
                  <th>Test Case</th>
                  <th>Price</th>
                </tr>

                <tr v-for="(ltr, i) in testListPayment" :key="i">
                  <td>
                    <checked
                      class="icon"
                      v-if="checkboxWhole[testListPayment[i].id] === true"
                      @click="checkboxWholeProcess(testListPayment[i].id, i)"
                    />
                    <unchecked
                      class="icon"
                      v-else
                      @click="checkboxWholeProcess(testListPayment[i].id, i)"
                    />
                  </td>
                  <td>{{ testListPayment[i].test_case_name }}</td>
                  <td>{{ testListPayment[i].price }}</td>
                </tr>
              </table>
            </v-layout>
            <label>Total : 150</label><br />
            <label>To Be Payed (Cash) : 20</label><br />
            <label>Payment from Prepayment : 130</label>

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
import Checked from "@/assets/icons/checked.svg";
import Unchecked from "@/assets/icons/unchecked.svg";

import CardRelatedPayment from "./cardRelatedPayment.vue";

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

      prepaymentAmountHave: 0,
      testListPayment: [],

      checkboxWhole: {},
      paymentInfo: {},
      confirmPaymentCardCheckbox: false,
      confirmPaymentCheckbox: false,
      paymentOptionList1: [
        { name: "Pre-payment", value: 1 },
        { name: "Post-payment", value: 2 },
        { name: "Cash", value: 3 },
      ],
      paymentOptionList2: [
        { name: "Pre-payment", value: 1 },
        { name: "Cash", value: 3 },
      ],
    };
  },

  created() {
    this.loadData();
  },

  components: {
    Close,
    Checked,
    Unchecked,
    CardRelatedPayment,
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
    },

    async paymentDialogProcess(item) {
      // item.reason_id = 2;
      alert(item.reason_id);
      if (item.reason_id === 0 || item.reason_id === 1)
        this.paymentDialogCard = true;
      else this.paymentDialogOthers = true;

      this.selectedPatinet = item;
    },

    async paymentDoneCard() {
      if (this.$refs.paymentDoneCard.validate()) {
        this.confirmPaymentCardCheckbox = false;
      }
    },

    async validatePayment() {
      if (this.paymentInfo.payment_option === 1) {
        if (this.prepaymentAmountHave < this.selectedPatinet.amount) {
          this.confirmPaymentCardCheckbox = false;
          this.confirmPaymentCheckbox = false;
        }
      }
    },

    async checkboxWholeProcess(id, i) {
      this.checkboxWhole[id] = !this.checkboxWhole[id];
      if (this.checkboxWhole[id] === false) delete this.checkboxWhole[id];
      else this.testListPayment[i].amount = "";

      let temp = this.checkboxWhole;
      this.checkboxWhole = {};
      this.checkboxWhole = temp;
    },
  },
};
</script>

<style scoped>
.main {
  margin: 7%;
  margin-top: 2%;
}

.icon {
  cursor: pointer;
}

.titleHead {
  font-family: bold;
  font: bold 12px/30px Georgia;
  letter-spacing: 2px;
}
.titleCont {
  font-size: 17px;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}
td {
  justify-content: center;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.tdCell {
  height: 50px;
}
</style>
