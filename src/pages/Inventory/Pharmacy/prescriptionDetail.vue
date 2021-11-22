<template>
  <div class="main">
    <v-card flat>
      <v-toolbar dense>
        <v-btn text class="text-capitalize" @click="back()">
          <v-icon class="mx-3">mdi-arrow-left</v-icon>
          Go Back
        </v-btn>
        <v-spacer />
        <h3>
          Patient Name : {{ prescriptionsSingle.patient_name }} , Card Number :
          {{ prescriptionsSingle.card_number }}
        </h3>
        <v-spacer />

        <v-btn
          small
          rounded
          @click="printPrescription()"
          class="text-capitalize"
          text
          color="green"
        >
          Print
        </v-btn>

        <v-btn
          small
          rounded
          @click="printPrescription()"
          class="text-capitalize ml-5"
          text
          color="green"
        >
          Outsource
        </v-btn>
        <v-spacer />

        <template v-if="prescriptionsSingle.status === 0">
          Amount : {{ totalAmount }} ETB
          <v-btn
            small
            class="text-capitalize green ml-3"
            @click="confirmPayment()"
          >
            Confirm Payment
          </v-btn>
        </template>

        <v-btn
          small
          class="text-capitalize green"
          v-else
          @click="paymentApproval = true"
        >
          Payment Done
        </v-btn>
      </v-toolbar>
      <v-divider />

      {{ prescriptionsSingle }}
      <v-data-table
        :items="prescriptionsSingle.data"
        :headers="prescriptionPenddingHeaders"
      >
        <template v-slot:item="props">
          <tr :style="getBackgroundColor(props.item)">
            <td>
              <template
                v-if="props.item.medicine_id != -1 && props.item.status === 0"
              >
                <Checked
                  class="icon"
                  v-if="props.item.checkbox"
                  @click="
                    (props.item.checkbox = false),
                      (props.item.price = 0),
                      validateInputPrice(props.item)
                  "
                />
                <Unchecked
                  class="icon"
                  v-else
                  @click="
                    (props.item.checkbox = true), validateInputPrice(props.item)
                  "
                />
              </template>
            </td>
            <td>
              {{ props.item.medicine }}
            </td>
            <td>
              {{ getUnitOfMeasurment(props.item.unit_of_measurment) }}
            </td>
            <td>
              {{ props.item.quantity }}
            </td>
            <td>
              <v-chip v-if="props.item.status === 0" color="yellow">
                Pendding
              </v-chip>
              <v-chip v-else color="yellow">Something</v-chip>
            </td>
            <td>
              <v-chip v-if="props.item.pay_status === 0" color="yellow">
                Not Payed
              </v-chip>
              <v-chip v-else color="yellow">Something</v-chip>
            </td>

            <td>
              <v-edit-dialog
                v-if="
                  props.item.medicine_id != -1 && props.item.checkbox === true
                "
                :return-value.sync="props.item.price"
                @save="save"
                @cancel="cancel"
                @open="open"
                @close="close"
                large
              >
                {{ props.item.price }}
                <template v-slot:input>
                  <v-text-field
                    @change="validateInputPrice(props.item)"
                    v-model="props.item.price"
                    type="number"
                    label="Edit"
                    single-line
                  />
                </template>
              </v-edit-dialog>

              <v-chip
                v-else-if="props.item.pay_status === 0"
                class="text-capitalize red"
              >
                Not Payable
              </v-chip>
              <v-chip v-else x-small class="text-capitalize green">
                Done
              </v-chip>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PrintPdf from "@/print";
import Checked from "@/assets/icons/checked.svg";
import Unchecked from "@/assets/icons/unchecked.svg";
import AccountService from "@/network/accountService";

export default {
  data() {
    return {
      login_user: AccountService.getProfile(),
      totalAmount: 0,
      service_id: {},

      prescriptionPenddingHeaders: [
        { text: "Is Payable ?", value: "checkbox" },
        { text: "Medicine", value: "medicine" },
        { text: "Unit Of Measurment", value: "unit_of_measurment" },
        { text: "Quantity", value: "quantity" },
        { text: "Pay Status", value: "pay_status" },
        { text: "Status", value: "status" },
        { text: "Price", value: "price" },
      ],
    };
  },

  created() {
    const { service_id } = this.$route.params;
    this.service_id = service_id;

    if (service_id === undefined) this.back();
    this.loadData();
  },

  components: {
    Checked,
    Unchecked,
  },

  computed: {
    ...mapState("mainPatientInfoManager", [
      "prescriptionsSingle",
      "prescriptionPayment",
    ]),
  },

  methods: {
    ...mapActions("mainPatientInfoManager", [
      "getPrescriptionsSingle",
      "prescriptionPaymentDone",
    ]),

    async loadData() {
      await this.getPrescriptionsSingle(this.service_id);

      this.caluleteTotalAmount();
    },

    async confirmPayment() {
      let data = this.prescriptionsSingle.data;
      let confirm = {
        id: this.prescriptionsSingle.id,
        service_id: this.prescriptionsSingle.service_id,
        user_id: this.login_user.id,
        detail: [],
      };

      for (let i = 0; i < data.length; i++)
        if (data[i].checkbox === true)
          confirm.detail.push({
            id: data[i].id,
            medicine_id: data[i].medicine_id,
            quantity: parseFloat(data[i].quantity),
            unit_of_measurment: data[i].unit_of_measurment,
            price: data[i].price,
          });

      await this.prescriptionPaymentDone(confirm);
      if (this.prescriptionPayment.st === true) {
        this.loadData();
      } else
        this.$fire({
          title: "Test Case Payment",
          text: this.prescriptionPayment.msg,
          type: "error",
          timer: 7000,
        });
    },

    validateInputPrice(item) {
      let index = this.prescriptionsSingle.data.indexOf(item);
      if (
        parseFloat(item.price) <= 0 ||
        item.price === "" ||
        item.medicine_id === -1
      )
        item.price = 1;
      this.prescriptionsSingle.data[index] = item;

      this.caluleteTotalAmount();
    },

    caluleteTotalAmount() {
      this.totalAmount = 0;

      let temp = this.prescriptionsSingle.data;
      for (let i = 0; i < temp.length; i++)
        this.totalAmount += parseFloat(temp[i].price);
    },

    getBackgroundColor(item) {
      if (item.medicine_id === -1) return { backgroundColor: "lightblue" };
    },

    getUnitOfMeasurment(uofmId) {
      let res = "Unit meas..." + uofmId;
      // for (let i = 0; i < this.measurements.length; i++)
      //   if (uofmId === this.measurements[i].id) {
      //     res = this.measurements[i].unit;
      //     break;
      //   }
      return res;
    },

    async printPrescription() {
      let profile = {
        name: "Temesgen Kefie",
        gender: "Male",
        mobile_number: "0987654321",
        birthdate: "04-06-1998",
      };
      PrintPdf.prescriptionPdfMaker(this.prescriptionsSingle.data, profile);
    },

    async back() {
      this.$router.push({ name: "prescription" });
    },
  },
};
</script>

<style scoped>
.main {
  margin: 5%;
  margin-top: 2%;
}

.style-1 {
  background-color: rgb(215, 215, 44);
}
.style-2 {
  background-color: rgb(114, 114, 67);
}
</style>
