<template>
  <div>
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
                label="Payment Type"
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
                label="Payment Type"
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
import Close from "@/assets/icons/close.svg";
import Checked from "@/assets/icons/checked.svg";
import Unchecked from "@/assets/icons/unchecked.svg";

import { mapActions, mapState } from "vuex";

export default {
  props: ["paymentDialogOthers", "selectedPatinet"],

  data() {
    return {
      inputRules: [(v) => !!v || "This field is required"],

      paymentInfo: {},
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
    ...mapState("cashier", ["paymnetRequest", "prepaymentAmount"]),
  },

  mounted() {
    this.loadData();
  },

  methods: {
    ...mapActions("cashier", ["getPaymentRequest", "getPrepaymentAmount"]),

    async loadData() {
      await this.getPrepaymentAmount(this.selectedPatinet.patinet_id);
    },

    async paymentDoneCard() {
      if (this.$refs.paymentDoneCard.validate()) {
        alert("All Input is valid");
      }
    },

    async validatePayment() {
      if (this.paymentInfo.payment_option === 1) {
        this.confirmPaymentCheckbox = false;
        if (this.prepaymentAmountHave >= this.selectedPatinet.amount) {
          this.confirmPaymentCheckbox = true;
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
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.tdCell {
  height: 50px;
}
</style>
