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
        <v-checkbox
          v-model="confrimPrescriptionNotExist"
          label="Checked me fro new medicine"
          @change="resetValue()"
        />
        <v-form @submit.prevent="Add" ref="Add">
          <v-layout v-if="!confrimPrescriptionNotExist">
            <v-autocomplete
              v-model="selectedMedicine"
              dense
              outlined
              label="Medicine"
              :items="medicineListWithUofM"
              item-text="name"
              item-value="id"
              return-object
              chips
              :rules="inputRules"
            />
            <v-spacer />

            <v-autocomplete
              :items="selectedMedicine.uofmlist"
              dense
              outlined
              label="Unit Of Measurment"
              item-text="unit"
              item-value="id"
              chips
              :rules="inputRules"
              v-model="selectedMedicines_unit"
            />

            <v-spacer />

            <v-text-field
              v-model="selectedMedicine_quantity"
              dense
              outlined
              type="number"
              label="Quantity"
              :rules="numberRules0andabove"
            />
          </v-layout>

          <v-layout v-else>
            <v-text-field
              v-model="selectedMedicine"
              dense
              outlined
              label="Medicine"
              chips
              :rules="inputRules"
            />
            <v-spacer />

            <v-text-field
              dense
              outlined
              label="Unit Of Measurment"
              chips
              :rules="inputRules"
              v-model="selectedMedicines_unit"
            />

            <v-spacer />

            <v-text-field
              v-model="selectedMedicine_quantity"
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
            <Delete @click="deletePrescription(item)" class="icon" />
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

        <template v-slot:item.unit_of_measurment="{ item }">
          {{ getUnitOfMeasurment(item.unit_of_measurment) }}
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
import Delete from "@/assets/icons/delete.svg";
import AccountService from "@/network/accountService";

export default {
  props: ["service_id", "patientId"],
  data() {
    return {
      login_user: AccountService.getProfile(),
      addPrescription: false,

      selectedMedicine: {},
      selectedMedicines_unit: 0,
      selectedMedicine_quantity: 0,
      confrimPrescriptionNotExist: false,

      prescriptionInfo: {},
      allPrescriptionInfo: [],
      notAddnewPrescription: false,

      inputRules: [(v) => !!v || "This field is required"],
      numberRules0andabove: [(v) => v > 0 || "Can't be lessthan one"],

      prescriptionHeaders: [
        { text: "Medicine", value: "medicine" },
        { text: "Quantity", value: "quantity" },
        { text: "Note", value: "note" },
        { text: "Action", value: "action" },
      ],

      prescriptionPenddingHeaders: [
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
    this.loadData();
  },

  components: {
    Delete,
  },

  computed: {
    ...mapState("mainPatientInfoManager", [
      "prescriptionsSingle",
      "registeredPrescription",
    ]),

    ...mapState("pharmacy", ["medicineListWithUofM"]),
  },

  methods: {
    ...mapActions("mainPatientInfoManager", [
      "getPrescriptionsSingle",
      "registerPrescription",
    ]),

    ...mapActions("pharmacy", ["getMedicineListWithUofM"]),

    async loadData() {
      await this.getMedicineListWithUofM();
      await this.getPrescriptionsSingle(this.service_id);

      if (this.prescriptionsSingle.data != undefined)
        if (this.prescriptionsSingle.data.length > 0)
          this.notAddnewPrescription = true;
    },

    async addNewPrescription() {
      this.allPrescriptionInfo = [];
      this.prescriptionInfo = {};
      this.addPrescription = !this.addPrescription;
    },

    async Add() {
      if (this.$refs.Add.validate()) {
        if (!this.confrimPrescriptionNotExist) {
          this.prescriptionInfo.medicine_id = this.selectedMedicine.id;
          this.prescriptionInfo.medicine = this.selectedMedicine.name;

          for (let i = 0; i < this.allPrescriptionInfo.length; i++) {
            let id = this.allPrescriptionInfo[i].medicine_id;
            if (id === this.selectedMedicine.id)
              this.allPrescriptionInfo.splice(i, 1);
          }
        } else {
          this.prescriptionInfo.medicine_id = -1;
          this.prescriptionInfo.medicine = this.selectedMedicine;
        }
        this.prescriptionInfo.unit_of_measurment = this.selectedMedicines_unit;
        this.prescriptionInfo.quantity = this.selectedMedicine_quantity;

        this.allPrescriptionInfo.push(this.prescriptionInfo);
        this.resetValue();
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

    getUnitOfMeasurment(uofmId) {
      let res = "Unit meas..." + uofmId;
      // for (let i = 0; i < this.measurements.length; i++)
      //   if (uofmId === this.measurements[i].id) {
      //     res = this.measurements[i].unit;
      //     break;
      //   }
      return res;
    },

    resetValue() {
      this.selectedMedicine = "";
      this.selectedMedicines_unit = "";
      this.selectedMedicine_quantity = 0;
    },

    deletePrescription(item) {
      let index = this.allPrescriptionInfo.indexOf(item);
      this.allPrescriptionInfo.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.icon {
  cursor: pointer;
}
</style>
