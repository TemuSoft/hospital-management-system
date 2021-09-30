<template>
  <div>
    <v-dialog
      v-model="paymentDialogCard"
      width="1000"
      persistent
      v-if="selectedPatinet.patient"
    >
      <v-card>
        <v-toolbar dense color="green">
          Payment Approval Card Related
          <v-spacer />

          <Close @click="closeDialog()" class="icon" />
        </v-toolbar>
        <br />

        <v-card-text>
          <v-form @submit.prevent="paymentDoneCard" ref="paymentDoneCard">
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
                @change="validatePayment()"
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
                @change="validatePayment()"
                v-model="paymentInfo.payment_option"
              />
            </v-layout>

            <v-layout>
              <v-checkbox
                v-model="confirmPaymentCheckbox"
                label="Select me to confirm payment"
                @change="validatePayment()"
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
                @click="paymentDoneCard()"
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
  props: ["selectedPatinet", "paymentDialogCard"],

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
    };
  },

  created() {
    this.loadData();
  },

  components: {
    Close,
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

    async validatePayment() {
      if (this.paymentInfo.payment_option === 1) {
        this.confirmPaymentCheckbox = false;
        if (this.prepaymentAmountHave >= this.selectedPatinet.amount) {
          this.confirmPaymentCheckbox = true;
        }
      }
    },

    async closeDialog() {
      this.$emit("cardPaymentControl", false);
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
</style>
