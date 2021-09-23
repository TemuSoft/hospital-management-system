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
            <v-flex xs12 sm1>Medicine</v-flex>

            <v-flex xs12 sm11>
              <v-text-field
                outlined
                dense
                v-model="prescriptionInfo.medicine"
                :rules="inputRules"
              />
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm1>Dosage</v-flex>
            &nbsp;&nbsp;

            <v-flex xs12 sm3>
              <v-text-field
                outlined
                type="number"
                dense
                v-model="prescriptionInfo.dosage"
                :rules="inputRules"
              />
            </v-flex>

            <v-flex xs12 sm1></v-flex>

            <v-flex xs12 sm3>
              <v-autocomplete
                outlined
                dense
                :items="['mg', 'Tablet']"
                v-model="prescriptionInfo.dosageUse"
                :rules="inputRules"
              />
            </v-flex>

            <v-flex xs12 sm1></v-flex>

            <v-flex xs12 sm1> Frequency </v-flex>

            <v-flex xs12 sm3>
              <v-autocomplete
                outlined
                dense
                :items="['Morning', 'Night', 'Afternoon', 'Midenight']"
                v-model="prescriptionInfo.frequency"
                :rules="inputRules"
              />
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm1> No. of Days</v-flex>
            &nbsp;&nbsp;

            <v-flex xs12 sm3>
              <v-text-field
                outlined
                type="number"
                dense
                v-model="prescriptionInfo.noDays"
                :rules="inputRules"
              />
            </v-flex>

            <v-flex xs12 sm1></v-flex>

            <v-flex xs12 sm3>
              <v-autocomplete
                outlined
                dense
                :items="['Day', 'Week', 'Month', 'Year']"
                v-model="prescriptionInfo.days"
                :rules="inputRules"
              />
            </v-flex>

            <v-flex xs12 sm1></v-flex>

            <v-flex xs12 sm1> Food Rela. </v-flex>

            <v-flex xs12 sm3>
              <v-autocomplete
                outlined
                dense
                :items="['After', 'Before', 'With', 'Without']"
                v-model="prescriptionInfo.foodRelation"
                :rules="inputRules"
              />
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm1>Route</v-flex>

            <v-flex xs12 sm11>
              <v-autocomplete
                outlined
                dense
                :items="[
                  'Oral',
                  'Ophthamic',
                  'Topical',
                  'Eye Drop',
                  'Vaginal',
                  'Arm',
                ]"
                v-model="prescriptionInfo.dosageUse"
                :rules="inputRules"
              />
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm1>Instraction</v-flex>

            <v-flex xs12 sm11>
              <v-text-field
                outlined
                dense
                v-model="prescriptionInfo.instraction"
                :rules="inputRules"
              />
            </v-flex>
          </v-layout>

          <v-btn small text outlined color="green" @click="save()">
            Save
          </v-btn>
        </v-form>
      </v-card>

      <v-data-table :items="prescriptionNew" :headers="prescriptionHeaders">
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      addPrescription: false,
      addPrescriptionDialog: false,
      prescriptionInfo: {},
      prescriptionNew: [],

      inputRules: [(v) => !!v || "This field is required"],

      prescriptionHeaders: [
        { text: "Medicine", value: "medicine" },
        { text: "Dosage", value: "dosage" },
        { text: "Frequency", value: "frequency" },
        { text: "Duration", value: "duration" },
        { text: "Route", value: "route" },
        { text: "Total Quantity", value: "QTY" },
      ],
    };
  },

  created() {
    this.loadData();
  },

  computed: {
    ...mapState("mainPatientInfoManager", [
      "prescriptions",
      "registeredPrescription",
    ]),
  },

  methods: {
    ...mapActions("mainPatientInfoManager", [
      "getPrescriptions",
      "registerPrescription",
    ]),

    async loadData() {
      await this.getPrescriptions();
      this.prescriptionNew = this.prescriptions;
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
  },
};
</script>

<style scoped></style>
