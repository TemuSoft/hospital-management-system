<template>
  <div class="main">
    <v-form @submit.prevent="save" ref="form">
      <h2>{{ title }}</h2>
      <br />

      <v-layout row justify-center>
        <v-select
          dense
          v-model="item.patient_type"
          :items="patientTypeoptions"
          label="Select Patinet Type"
          :rules="inputRules"
          item-text="name"
          item-id="value"
          outlined
          single-line
        />
        <v-spacer />
        <v-spacer />
      </v-layout>

      <v-layout row>
        <v-text-field
          label="First Name"
          v-model="item.first_name"
          :rules="inputRules"
          outlined
          dense
        />
        <v-spacer />

        <v-text-field
          label="Birth Date"
          type="date"
          v-model="item.birthdate"
          :rules="inputRules"
          outlined
          dense
        />
        <v-spacer />

        <v-text-field
          label="Phone"
          v-model="item.phone_number"
          :rules="inputRules"
          outlined
          dense
        />
        <v-spacer />

        <v-text-field
          label="Guardian Name"
          v-model="item.guardian_name"
          :rules="inputRules"
          outlined
          dense
        />
      </v-layout>

      <v-layout row>
        <v-text-field
          label="Father Name"
          v-model="item.fathers_name"
          :rules="inputRules"
          outlined
          dense
        />
        <v-spacer />

        <v-autocomplete
          label="Nationality"
          v-model="item.nationality"
          :items="nationalityList"
          item-text="name"
          item-id="value"
          outlined
          dense
        />
        <v-spacer />

        <v-text-field label="Region" v-model="item.region" outlined dense />
        <v-spacer />

        <v-text-field
          type="number"
          label="Guardian Contact"
          v-model="item.guardian_contact"
          outlined
          dense
        />
      </v-layout>

      <v-layout row>
        <v-text-field
          label="Grand Father"
          v-model="item.last_name"
          :rules="inputRules"
          outlined
          dense
        />
        <v-spacer />

        <v-text-field label="Zone" v-model="item.zone" outlined dense />
        <v-spacer />

        <v-text-field label="Woreda" v-model="item.woreda" outlined dense />
        <v-spacer />

        <v-text-field label="Kebele" v-model="item.kebele" outlined dense />
      </v-layout>

      <v-layout row>
        <v-autocomplete
          label="Gender"
          v-model="item.gender"
          :rules="inputRules"
          :items="genderoptions"
          outlined
          dense
        />
        <v-spacer />

        <v-text-field
          label="House Number"
          v-model="item.house_number"
          outlined
          dense
        />
      </v-layout>
      <br />

      <v-layout>
        <v-btn small text outlined color="green" @click="save()">
          Register
        </v-btn>
      </v-layout>
    </v-form>
    {{ registeredPatient }}------------------------
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  components: {},
  data() {
    return {
      item: {},
      title: "Register New Patient",
      inputRules: [(v) => !!v || "This field is required"],
      genderoptions: ["Male", "Female"],

      patientTypeoptions: [
        { name: "Regular", value: 1 },
        { name: "Credit", value: 2 },
        { name: "Organization", value: 3 },
        { name: "Temporary", value: 4 },
      ],
      nationalityList: [
        { name: "Ethiopia", value: 1 },
        { name: "Others", value: 2 },
      ],
    };
  },

  mounted: {
    ...mapState("patient", ["registeredPatient"]),
  },

  created() {},

  methods: {
    ...mapActions("patient", ["registerPatient"]),

    async save() {
      if (this.$refs.form.validate()) {
        await this.registerPatient(this.item);
        if (this.registeredPatient === true) this.item = {};
        else alert("Failed to Register Patinet");
      }
    },
  },
};
</script>

<style scoped>
.main {
  margin: 7%;
  margin-top: 3%;
}
</style>
