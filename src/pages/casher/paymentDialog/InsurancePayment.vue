<template>
  <div>
    <v-dialog
      v-model="paymentDialogInsurance"
      width="1000"
      persistent
      v-if="selectedPatinet.patient"
    >
      <v-card>
        <v-toolbar dense color="green">
          Payment Approval Laboratory and Imaging
          <v-spacer />

          <Close @click="closeDialog()" class="icon" />
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
                  {{ this.totalPriceInService }}
                </label>
                <br />
                <br />

                <v-text-field label="Payed By?" v-model="who_payed" dense />
              </v-flex>
            </v-layout>

            <v-layout>
              <v-autocomplete
                label="Payment Type"
                :items="paymentOptionList3"
                :rules="inputRules"
                item-text="name"
                item-value="value"
                dense
                outlined
                chips
                multiple
                @change="validatePayment"
                v-model="payment_option"
              />
            </v-layout>

            <h3 style="color: green">
              Imaging and Laboratory Test Payment Requests
            </h3>

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
                      @click="checkboxWholeProcess(testListPayment[i].id)"
                    />
                    <unchecked
                      class="icon"
                      v-else
                      @click="checkboxWholeProcess(testListPayment[i].id)"
                    />
                  </td>
                  <td>{{ testListPayment[i].name }}</td>
                  <td>{{ testListPayment[i].price }}</td>
                </tr>
              </table>
            </v-layout>

            <h5 style="color: red">To Be Payed (Cash) : {{ totalCash }}</h5>
            <h5>Payment from Insurance : {{ totalPrepayment }}</h5>

            <v-layout>
              <v-checkbox
                v-model="confirmPaymentCheckbox"
                label="Select me to confirm payment"
              />
              <br />
            </v-layout>

            <v-layout>
              <v-btn
                v-show="everyThingIsFine"
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
import Close from "@/assets/icons/close.svg";
import Checked from "@/assets/icons/checked.svg";
import Unchecked from "@/assets/icons/unchecked.svg";

import { mapActions, mapState } from "vuex";

export default {
  props: ["paymentDialogInsurance", "selectedPatinet"],

  data() {
    return {
      inputRules: [(v) => !!v || "This field is required"],

      who_payed: "",
      payment_option: [],
      totalPriceInService: 0,
      totalCash: 0,
      totalPrepayment: 0,
      confirmPaymentCheckbox: false,
      everyThingIsFine: false,

      paymentOptionList3: [
        { name: "Cash", value: 3 },
        { name: "Insurance", value: 4 },
      ],

      testListPayment: [
        { name: "Test Case 1", price: 50, id: 1 },
        { name: "Test Case 2", price: 150, id: 2 },
        { name: "Test Case 3", price: 40, id: 3 },
        { name: "Test Case 4", price: 79, id: 4 },
        { name: "Test Case 5", price: 79, id: 5 },
        { name: "Test Case 6", price: 4, id: 6 },
        { name: "Test Case 7", price: 43, id: 7 },
      ],
      checkboxWhole: {},
    };
  },

  created() {
    this.loadData();
  },

  components: {
    Close,
    Checked,
    Unchecked,
  },

  computed: {
    ...mapState("cashier", [
      "paymnetRequest",
      "prepaymentAmount",
      "testCaseList",
    ]),
  },

  mounted() {
    this.loadData();
  },

  methods: {
    ...mapActions("cashier", [
      "getPaymentRequest",
      "getPrepaymentAmount",
      "getTestCaseList",
    ]),

    async loadData() {
      // await this.getPrepaymentAmount(this.selectedPatinet.patinet_id);
      // await this.getTestCaseList(this.selectedPatinet.service_id);

      this.totalPriceInService = 0;
      for (let i = 0; i < this.testListPayment.length; i++)
        this.totalPriceInService += this.testListPayment[i].price;

      this.calculatePayment();
    },

    async paymentDoneCard() {
      if (this.$refs.paymentDoneCard.validate()) {
        alert("All Input is valid");
      }
    },

    async valiDateEveryThingIsFine() {
      this.everyThingIsFine = false;
      if (this.totalPrepayment <= this.prepaymentAmount)
        if (this.confirmPaymentCheckbox) this.everyThingIsFine = true;
    },

    async calculatePayment() {
      this.totalPrepayment = 0;
      this.totalCash = 0;
      for (let i = 0; i < this.testListPayment.length; i++) {
        let cu = this.checkboxWhole[this.testListPayment[i].id];
        if (cu === false || cu === undefined)
          this.totalPrepayment += this.testListPayment[i].price;
        else this.totalCash += this.testListPayment[i].price;
      }

      this.valiDateEveryThingIsFine();
    },

    async validatePayment() {
      if (this.payment_option.indexOf(3) === -1) {
        this.checkboxWhole = {};
        this.$notify({
          type: "danger",
          title: "Can't checked the box!!!",
          text: "In the payment option cash is nmot enabled!!!",
        });
      }

      this.calculatePayment();
    },

    async checkboxWholeProcess(id) {
      this.checkboxWhole[id] = !this.checkboxWhole[id];
      if (this.checkboxWhole[id] === false) delete this.checkboxWhole[id];

      let temp = this.checkboxWhole;
      this.checkboxWhole = {};
      this.checkboxWhole = temp;

      this.validatePayment();
    },

    async closeDialog() {
      this.$emit("testCasePaymentControl", false);
    },
  },
};
</script>

<style scoped>
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
  text-align: center;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.tdCell {
  height: 50px;
}
</style>
