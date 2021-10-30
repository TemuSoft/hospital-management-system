<template>
  <div>
    <v-dialog
      v-model="paymentDialogRegular"
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

            <h3 style="color: green">
              Imaging and Laboratory Test Payment Requests
            </h3>
            <v-layout>
              <table>
                <tr>
                  <th>Is it payable ?</th>
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

            <v-layout>
              <v-spacer />
              <h5>Total Payment : {{ totalPayment }}</h5>
              <v-spacer />
              <v-spacer />

              <h5 style="color: red" v-if="totalPayment - prepaymentAmount > 0">
                To Be Payed (Cash) : {{ totalPayment - prepaymentAmount }}
              </h5>
              <h5 style="color: red" v-else>To Be Payed (Cash) : 0</h5>
              <v-spacer />
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
import Close from "@/assets/icons/close.svg";
import Checked from "@/assets/icons/checked.svg";
import Unchecked from "@/assets/icons/unchecked.svg";

import { mapActions, mapState } from "vuex";

export default {
  props: ["paymentDialogRegular", "selectedPatinet"],

  data() {
    return {
      inputRules: [(v) => !!v || "This field is required"],

      who_payed: "",
      totalPriceInService: 0,
      totalPayment: 0,
      confirmPaymentCheckbox: false,

      testListPayment: [],
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
      "testCasePaymentDone",
    ]),
  },

  methods: {
    ...mapActions("cashier", [
      "getPaymentRequest",
      "getPrepaymentAmount",
      "testCasePaymentRegister",
    ]),

    async loadData() {
      await this.getPrepaymentAmount(this.selectedPatinet.patient_id);
      // await this.getTestCaseList(this.selectedPatinet.service_id);

      this.testListPayment = this.selectedPatinet.test_cases;
      this.totalPriceInService = 0;
      for (let i = 0; i < this.testListPayment.length; i++)
        if (this.testListPayment[i].verified)
          this.totalPriceInService += parseFloat(this.testListPayment[i].price);

      this.calculatePayment();
    },

    async paymentDone() {
      if (this.$refs.paymentDone.validate()) {
        let data = {};
        data.patient_id = this.selectedPatinet.patient_id;
        data.reason_id = this.selectedPatinet.reason_id;
        data.amount = this.selectedPatinet.amount;
        data.cash = this.totalPayment - this.prepaymentAmount;
        if (data.cash < 0) {
          data.cash = 0;
          data.prepayment = this.totalPayment;
        }
        data.credit = 0;
        data.insurance = 0;
        data.test_cases_id = [];
        for (let i = 0; i < this.testListPayment.length; i++) {
          let cu = this.checkboxWhole[this.testListPayment[i].id];
          if (cu === true)
            data.test_cases_id.push({
              id: this.testListPayment[i].id,
              payed_price: this.testListPayment[i].payed_price,
            });
        }

        await this.testCasePaymentRegister(data);
        if (this.testCasePaymentDone === true)
          this.paymentDialogRegular = false;
        else
          this.$fire({
            title: "Test Case Payment",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    async calculatePayment() {
      this.totalPayment = 0;
      for (let i = 0; i < this.testListPayment.length; i++) {
        let cu = this.checkboxWhole[this.testListPayment[i].id];
        if (cu === true)
          this.totalPayment += parseFloat(this.testListPayment[i].price);
      }
    },

    async checkboxWholeProcess(id) {
      this.checkboxWhole[id] = !this.checkboxWhole[id];
      if (this.checkboxWhole[id] === false) delete this.checkboxWhole[id];

      let temp = this.checkboxWhole;
      this.checkboxWhole = {};
      this.checkboxWhole = temp;

      this.calculatePayment();
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
