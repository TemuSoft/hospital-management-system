<template>
  <div>
    <v-card flat>
      <h2>Prescription</h2>

      <v-layout>
        <v-spacer />
        <v-btn
          small
          outlined
          text
          color="green"
          @click="addPrescription = !addPrescription"
        >
          Add New
        </v-btn>
      </v-layout>
      <br />

      <v-card flat v-if="addPrescription">
        <v-form @submit.prevent="save" ref="save">
          <v-layout>
            <v-autocomplete
              v-model="prescriptionInfo.medicine"
              dense
              outlined
              label="Medicine"
              :items="medicineList"
              item-text="name"
              item-value="id"
              @change="loadUnitOfMeasurment"
              :rules="inputRules"
            />
            <v-spacer />

            <v-autocomplete
              v-model="prescriptionInfo.unit_of_measurement"
              dense
              outlined
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

          <v-btn small text outlined color="green" @click="save()">
            Save
          </v-btn>
        </v-form>
      </v-card>

      <v-data-table :items="prescriptionNew" :headers="prescriptionHeaders">
        <template v-slot:item.action="{ item }">
          <Edit @click="editPrescription(item)" class="icon" />
        </template>
      </v-data-table>
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

    async loadUnitOfMeasurment(medicine_id) {
      await this.getSingleMedicineUofM(medicine_id);
    },

    async save() {
      if (this.$refs.save.validate()) {
        await this.registerPrescription(this.prescriptionNew);

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
