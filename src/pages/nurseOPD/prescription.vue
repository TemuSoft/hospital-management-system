<template>
  <div>
    <v-card flat>
      <h2>Prescription</h2>

      <v-layout>
        <v-spacer />
        <v-btn small outlined text color="green" @click="addNewPrescription()">
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

            <v-combobox
              v-model="prescriptionInfo.unit_of_measurement"
              dense
              outlined
              chips
              label="Unit Of Measurment"
              :items="singleMedicineUofM"
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
      </v-card>

      <v-data-table :items="allPrescriptionInfo" :headers="prescriptionHeaders">
        <template v-slot:item.action="{ item }">
          <Edit @click="editPrescription(item)" class="icon" />
        </template>
      </v-data-table>
      <v-btn
        small
        text
        outlined
        color="green"
        v-if="allPrescriptionInfo.length > 0"
        @click="submitAll()"
      >
        Submit All
      </v-btn>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Edit from "@/assets/icons/edit.svg";

export default {
  data() {
    return {
      addPrescription: false,
      addPrescriptionDialog: false,
      prescriptionInfo: {},
      allPrescriptionInfo: [],
      prescriptionNew: [],

      inputRules: [(v) => !!v || "This field is required"],
      numberRules0andabove: [(v) => v > 0 || "Can't be lessthan one"],

      prescriptionHeaders: [
        { text: "Medicine", value: "medicine" },
        { text: "Unit Of Measurment", value: "unit_of_measurement" },
        { text: "Quantity", value: "quantity" },
        { text: "Action", value: "action" },
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
      "prescriptions",
      "registeredPrescription",
    ]),

    ...mapState("pharmacy", ["medicineList", "singleMedicineUofM"]),
  },

  methods: {
    ...mapActions("mainPatientInfoManager", [
      "getPrescriptions",
      "registerPrescription",
    ]),

    ...mapActions("pharmacy", ["getMedicineList", "getSingleMedicineUofM"]),

    async loadData() {
      await this.getMedicineList();
      await this.getPrescriptions();
      this.prescriptionNew = this.prescriptions;
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
        await this.registerPrescription(this.allPrescriptionInfo);

        if (this.registeredPrescription === true) {
          this.getPrescriptions();
          this.prescriptionInfo = {};
        } else
          this.$fire({
            title: "Prescription Registeration",
            text: "Something wrong please try again!!!",
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
