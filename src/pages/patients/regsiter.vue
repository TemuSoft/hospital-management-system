<template>
  <div class="main">
    <v-form @submit.prevent="save" ref="form">
      <h2>Register New Patient</h2>
      <br />

      <v-layout row justify-center>
        <v-select
          dense
          v-model="patientInfo.patient_type"
          :items="patientTypeoptions"
          label="Select Patinet Type"
          :rules="inputRules"
          item-text="name"
          item-value="value"
          outlined
          single-line
        />
        <v-spacer />
        <v-spacer />
      </v-layout>

      <v-layout row>
        <v-text-field
          label="First Name"
          v-model="patientInfo.first_name"
          :rules="inputRules"
          outlined
          dense
        />
        <v-spacer />

        <v-text-field
          label="Birth Date"
          type="date"
          v-model="patientInfo.birthdate"
          :rules="inputRules"
          outlined
          dense
        />
        <v-spacer />

        <v-text-field
          label="Phone"
          v-model="patientInfo.phone_number"
          :rules="inputRules"
          outlined
          dense
        />
        <v-spacer />

        <v-text-field
          label="Guardian Name"
          v-model="patientInfo.guardian_name"
          :rules="inputRules"
          outlined
          dense
        />
      </v-layout>

      <v-layout row>
        <v-text-field
          label="Father Name"
          v-model="patientInfo.fathers_name"
          :rules="inputRules"
          outlined
          dense
        />
        <v-spacer />

        <v-autocomplete
          label="Nationality"
          v-model="patientInfo.nationality"
          :items="nationalityList"
          item-text="name"
          item-id="value"
          outlined
          dense
        />
        <v-spacer />

        <v-text-field
          label="Region"
          v-model="patientInfo.region"
          outlined
          dense
        />
        <v-spacer />

        <v-text-field
          type="number"
          label="Guardian Contact"
          v-model="patientInfo.guardian_contact"
          outlined
          dense
        />
      </v-layout>

      <v-layout row>
        <v-text-field
          label="Grand Father"
          v-model="patientInfo.last_name"
          :rules="inputRules"
          outlined
          dense
        />
        <v-spacer />

        <v-text-field label="Zone" v-model="patientInfo.zone" outlined dense />
        <v-spacer />

        <v-text-field
          label="Woreda"
          v-model="patientInfo.woreda"
          outlined
          dense
        />
        <v-spacer />

        <v-text-field
          label="Kebele"
          v-model="patientInfo.kebele"
          outlined
          dense
        />
      </v-layout>

      <v-layout row>
        <v-autocomplete
          label="Gender"
          v-model="patientInfo.gender"
          :rules="inputRules"
          :items="genderoptions"
          outlined
          dense
        />
        <v-spacer />

        <v-text-field
          label="House Number"
          v-model="patientInfo.house_number"
          outlined
          dense
        />
      </v-layout>
      <br />

      <v-layout>
        <v-btn small outlined color="green" @click="save()"> Register </v-btn>
        <v-spacer />
        <v-btn small outlined color="red" @click="cancel()"> Cancel </v-btn>
        <v-spacer />
        <v-spacer />
      </v-layout>
    </v-form>
  </div>
</template>
<script>
import AccountService from "@/network/accountService";
import { mapActions, mapState } from "vuex";

export default {
  components: {},
  data() {
    return {
      login_user: AccountService.getProfile(),
      patientInfo: {},
      inputRules: [(v) => !!v || "This field is required"],
      genderoptions: ["Male", "Female"],

      patientTypeoptions: [
        { name: "Regular", value: 1 },
        { name: "Credit", value: 2 },
        { name: "Temporary", value: 4 },
      ],
      nationalityList: [
        { name: "Ethiopia", value: 1 },
        { name: "Others", value: 2 },
      ],
    };
  },

  computed: {
    ...mapState("patient", ["registeredPatient"]),
  },

  created() {},

  methods: {
    ...mapActions("patient", ["registerPatient"]),

    async save() {
      if (this.$refs.form.validate()) {
        this.patientInfo.user_id = this.login_user.id;
        this.patientInfo.insurance_id = -1;
        await this.registerPatient(this.patientInfo);
        if (this.registeredPatient === true) {
          this.patientInfo = {};
          this.$router.push({ name: "patinets" });
        } else
          this.$fire({
            title: "Patient Registeration",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    async cancel() {
      this.$router.push({ name: "patinets" });
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
