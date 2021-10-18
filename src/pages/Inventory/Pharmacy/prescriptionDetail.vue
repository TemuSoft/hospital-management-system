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
          <v-btn small class="text-capitalize green ml-3">
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

      <v-data-table
        :items="prescriptionsSingle.data"
        :headers="prescriptionPenddingHeaders"
      >
        <template v-slot:item.pay_status="{ item }">
          <v-chip v-if="item.pay_status === 0" color="yellow">Not Payed</v-chip>
          <v-chip v-else color="yellow">Something</v-chip>
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip v-if="item.status === 0" color="yellow">Pendding</v-chip>
          <v-chip v-else color="yellow">Something</v-chip>
        </template>

        <template v-slot:item.price="{ item }">
          <v-edit-dialog
            :return-value.sync="item.price"
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close"
            large
          >
            {{ item.price }}
            <template v-slot:input>
              <v-text-field
                @change="validateInputPrice(item)"
                v-model="item.price"
                type="number"
                label="Edit"
                single-line
              />
            </template>
          </v-edit-dialog>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PrintPdf from "@/print";
import AccountService from "@/network/accountService";

export default {
  data() {
    return {
      login_user: AccountService.getProfile(),
      totalAmount: 0,
      service_id: {},

      prescriptionPenddingHeaders: [
        { text: "Medicine", value: "medicine" },
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

  computed: {
    ...mapState("mainPatientInfoManager", ["prescriptionsSingle"]),
  },

  methods: {
    ...mapActions("mainPatientInfoManager", ["getPrescriptionsSingle"]),

    async loadData() {
      await this.getPrescriptionsSingle(this.service_id);

      this.caluleteTotalAmount();
    },

    validateInputPrice(item) {
      let index = this.prescriptionsSingle.data.indexOf(item);
      if (
        parseFloat(item.price) < 0 ||
        item.price === "" ||
        item.medicine_id === -1
      )
        item.price = 0;
      this.prescriptionsSingle.data[index] = item;

      this.caluleteTotalAmount();
    },

    caluleteTotalAmount() {
      this.totalAmount = 0;

      let temp = this.prescriptionsSingle.data;
      for (let i = 0; i < temp.length; i++)
        this.totalAmount += parseFloat(temp[i].price);
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
