<template>
  <div>
    <v-card flat>
      <h2>Prescription</h2>

      <v-layout>
        <v-spacer />
        <v-btn
          :disabled="notAddnewPrescription"
          small
          outlined
          text
          color="green"
          @click="addNewPrescription()"
        >
          Add New
        </v-btn>
      </v-layout>
      <br />

      <v-card flat v-if="addPrescription">
        <v-form @submit.prevent="Add" ref="Add">
          <v-layout>
            <v-combobox
              v-model="prescriptionInfo.medicine"
              dense
              outlined
              label="Medicine"
              :items="medicineList"
              item-text="name"
              item-value="id"
              chips
              @change="loadUnitOfMeasurment"
              :rules="inputRules"
            />
            <v-spacer />

            <v-text-field
              v-model="prescriptionInfo.quantity"
              dense
              outlined
              type="number"
              label="Quantity"
              :rules="numberRules0andabove"
            />
          </v-layout>

          <v-layout>
            <v-text-field
              v-model="prescriptionInfo.note"
              dense
              outlined
              label="Note"
              :rules="inputRules"
            />
          </v-layout>

          <v-btn small text outlined color="green" @click="Add()"> Add </v-btn>
        </v-form>

        <v-data-table
          :items="allPrescriptionInfo"
          :headers="prescriptionHeaders"
        >
          <template v-slot:item.action="{ item }">
            <Edit @click="editPrescription(item)" class="icon" />
          </template>
        </v-data-table>
        <v-btn small text outlined color="green" @click="submitAll()">
          Submit All
        </v-btn>
      </v-card>

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
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Edit from "@/assets/icons/edit.svg";
import AccountService from "@/network/accountService";

export default {
  props: ["service_id", "patientId"],
  data() {
    return {
      login_user: AccountService.getProfile(),
      addPrescription: false,
      addPrescriptionDialog: false,
      prescriptionInfo: {},
      allPrescriptionInfo: [],
      notAddnewPrescription: false,

      inputRules: [(v) => !!v || "This field is required"],
      numberRules0andabove: [(v) => v > 0 || "Can't be lessthan one"],

      prescriptionHeaders: [
        { text: "Medicine", value: "medicine" },
        { text: "Quantity", value: "quantity" },
        { text: "Action", value: "action" },
      ],

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
    this.loadData();
  },

  components: {
    Edit,
  },

  computed: {
    ...mapState("mainPatientInfoManager", [
      "prescriptionsSingle",
      "registeredPrescription",
    ]),

    ...mapState("pharmacy", ["medicineList", "singleMedicineUofM"]),
  },

  methods: {
    ...mapActions("mainPatientInfoManager", [
      "getPrescriptionsSingle",
      "registerPrescription",
    ]),

    ...mapActions("pharmacy", ["getMedicineList", "getSingleMedicineUofM"]),

    async loadData() {
      await this.getMedicineList();
      await this.getPrescriptionsSingle(this.service_id);

      if (this.prescriptionsSingle.data.length > 0)
        this.notAddnewPrescription = true;
    },

    async addNewPrescription() {
      this.allPrescriptionInfo = [];
      this.prescriptionInfo = {};
      this.addPrescription = !this.addPrescription;
    },

    async loadUnitOfMeasurment(medicine_id) {
      await this.getSingleMedicineUofM(medicine_id);
    },

    async Add() {
      if (this.$refs.Add.validate()) {
        let medicine = this.prescriptionInfo.medicine;

        if (medicine.name === undefined) {
          this.prescriptionInfo.medicine_id = -1;
        } else {
          this.prescriptionInfo.medicine = medicine.name;
          this.prescriptionInfo.medicine_id = medicine.id;
        }

        this.allPrescriptionInfo.push(this.prescriptionInfo);
        this.prescriptionInfo = {};
      }
    },

    async submitAll() {
      if (this.allPrescriptionInfo.length > 0) {
        this.allPrescriptionInfo = {
          user_id: this.login_user.id,
          service_id: this.service_id,
          data: this.allPrescriptionInfo,
        };
        await this.registerPrescription(this.allPrescriptionInfo);

        if (this.registeredPrescription.st === true) {
          this.getPrescriptionsSingle(this.service_id);
          this.prescriptionInfo = {};
        } else
          this.$fire({
            title: "Prescription Registeration",
            text: this.registeredPrescription.msg,
            type: "error",
            timer: 7000,
          });
      }
    },

    editPrescription(item) {
      alert(item.id);
    },
  },
};
</script>

<style scoped>
.icon {
  cursor: pointer;
}
</style>
