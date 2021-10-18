<template>
  <div class="main">
    <v-card>
      <v-toolbar dense>
        <v-btn
          text
          class="text-capitalize"
          @click="$router.push({ name: 'staff' })"
        >
          <v-icon class="mx-3">mdi-arrow-left</v-icon>
          Go Back
        </v-btn>
        <v-spacer />
        <h2>Insurance Details</h2>
        <v-spacer />
        <v-spacer />
      </v-toolbar>
      <v-divider></v-divider>
      <br />
      <br />

      Insurance Name : {{ singleInsurance.name }}
      <br />
      Status : {{ singleInsurance.status }}
      <br />
      Description : {{ singleInsurance.description }}

      <h2>List of staff in the insurance / organization</h2>
      <v-data-taable
        :headers="headers"
        :search="search"
        :items="insuranceStaffList"
      >
      </v-data-taable>
    </v-card>

    <v-dialog persistent v-model="registerStaffDialog" width="100px">
      <v-card>
        <v-toolbar dense color="green">
          Register Insurance List
          <v-spacer />

          <Close class="icon" @click="registerStaffDialog = false" />
        </v-toolbar>

        <v-card-text>
          <v-form @submit.prevent="registerMember" ref="registerMember">
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

              <v-text-field
                label="Zone"
                v-model="patientInfo.zone"
                outlined
                dense
              />
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
              <v-btn small outlined color="green" @click="registerMember()">
                Register
              </v-btn>
              <v-spacer />
              <v-btn small outlined color="red" @click="cancel()">
                Cancel
              </v-btn>
              <v-spacer />
              <v-spacer />
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AccountService from "@/network/accountService";
import { mapActions, mapState } from "vuex";

import Close from "@/assets/icons/close.svg";

export default {
  data() {
    return {
      login_user: AccountService.getProfile(),

      registerStaffDialog: false,
      patientInfo: {},
      insurance_id: "",
      search: "",
      headers: [
        { text: "Full Name", value: "fullName" },
        { text: "Total Access", value: "totalAcsess" },
        { text: "Total Money", value: "totalMoney" },
        { text: "Action", value: "action" },
      ],
    };
  },

  components: {
    Close,
  },

  created() {
    const { insurance_id } = this.$route.params;
    this.insurance_id = insurance_id;

    this.loadData();
  },

  computed: {
    ...mapState("insurance", ["singleInsurance", "insuranceStaffList"]),
    ...mapState("patient", ["registeredPatient"]),
  },

  methods: {
    ...mapActions("insurance", ["getSingleInsurance", "getInsuranceStaffList"]),
    ...mapActions("patient", ["registerPatient"]),

    async loadData() {
      await this.getSingleInsurance(this.insurance_id);
      await this.getInsuranceStaffList(this.insurance_id);
    },

    async registerMember() {
      if (this.$refs.registerMember.validate()) {
        this.patientInfo.patient_type = 3;
        this.patientInfo.user_id = this.login_user.id;
        this.patientInfo.insurance_id = this.insurance_id;

        await this.registerPatient(this.patientInfo);

        if (this.registeredPatient === true) {
          this.patientInfo = {};
          this.registerStaffDialog = false;
          this.loadData();
        } else
          this.$fire({
            title: "Patient Registeration",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
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
