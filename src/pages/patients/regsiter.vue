<template>
  <div class="main">
    <v-form @submit.prevent="save" ref="form">
      <v-card flat>
        <h2>{{ title }}</h2>
        <br />

        <v-layout row justify-start>
          <v-select
            dense
            :items="patientTypeoptions"
            label="Select Patinet Type"
            :rules="inputRules"
            outlined
            single-line
          />
          <v-spacer />
          <v-spacer />
        </v-layout>

        <v-layout row justify-space-around>
          <v-text-field
            label="Full Name"
            v-model="item.fullName"
            :rules="inputRules"
            outlined
            dense
          />
          <v-spacer />

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
            label="Birth Date"
            type="date"
            v-model="item.birthDate"
            :rules="inputRules"
            outlined
            dense
          />
          <v-spacer />

          <v-text-field
            label="Phone"
            v-model="item.phone"
            :rules="inputRules"
            outlined
            dense
          />
        </v-layout>

        <v-layout row justify-space-around>
          <v-text-field
            label="Address"
            v-model="item.address"
            :rules="inputRules"
            outlined
            dense
          />
          <v-spacer />

          <v-autocomplete
            label="Married Status"
            v-model="item.marriageStatus"
            :rules="inputRules"
            :items="marriagestatusoptions"
            outlined
            dense
          />
          <v-spacer />

          <v-text-field
            type="number"
            label="Height"
            v-model="item.height"
            :rules="inputRules"
            outlined
            dense
          />
          <v-spacer />

          <v-text-field
            label="Weight"
            v-model="item.weight"
            :rules="inputRules"
            outlined
            dense
          />
        </v-layout>

        <v-layout row justify-space-around>
          <v-text-field
            label="Blood Pressure"
            v-model="item.bloodPressure"
            outlined
            dense
          />
          <v-spacer />

          <v-autocomplete
            label="Blood Group"
            v-model="item.bloodGroup"
            :rules="inputRules"
            :items="bloodgroupoptions"
            outlined
            dense
          />
          <v-spacer />

          <v-text-field
            label="Guardian Name"
            v-model="item.guardianName"
            :rules="inputRules"
            outlined
            dense
          />
          <v-spacer />

          <v-text-field
            type="number"
            label="Guardian Contact"
            v-model="item.guardianContact"
            :rules="inputRules"
            outlined
            dense
          />
        </v-layout>

        <v-layout row justify-space-around>
          <v-textarea
            label="Allergies"
            rows="2"
            v-model="item.allergies"
            :rules="inputRules"
            outlined
            dense
          />
          <v-spacer />

          <v-textarea
            label="Note"
            rows="2"
            v-model="item.note"
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
      </v-card>
    </v-form>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      item: [],
      title: "Register New Patient",
      valid: true,
      inputRules: [(v) => !!v || "This field is required"],
      genderoptions: ["Male", "Female"],
      marriagestatusoptions: [
        "Single",
        "Married",
        "Seperated",
        "Widowed",
        "Unspecified",
      ],
      patientTypeoptions: ["Regular", "Credit", "Instatnt"],
      bloodgroupoptions: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    };
  },
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        alert("Inserted data is valid");
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
