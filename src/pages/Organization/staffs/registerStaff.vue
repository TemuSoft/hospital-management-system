<template>
  <div>
    <v-card class="main">
      <v-toolbar dense flat>
        <v-btn
          text
          class="text-capitalize"
          @click="$router.push({ name: 'staff' })"
        >
          <v-icon class="mx-3">mdi-arrow-left</v-icon>
          Go Back
        </v-btn>
        <v-spacer />
        Register Staff
        <v-spacer />
      </v-toolbar>
      <v-divider></v-divider>
      <br />

      <div>
        <v-form @submit.prevent="save" ref="form">
          <v-layout>
            <v-flex xs12 sm1> </v-flex>
            <v-flex xs12 sm1> Title</v-flex>
            <v-flex xs12 sm4>
              <v-text-field
                dense
                outlined
                v-model="staffInfo.tilte"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm1> </v-flex>
            <v-flex xs12 sm1> Email</v-flex>
            <v-flex xs12 sm4>
              <v-text-field
                :rules="inputRules"
                dense
                outlined
                v-model="staffInfo.email"
              />
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm1> </v-flex>
            <v-flex xs12 sm1> First Name</v-flex>
            <v-flex xs12 sm4>
              <v-text-field
                dense
                outlined
                :rules="inputRules"
                v-model="staffInfo.first_name"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm1> </v-flex>
            <v-flex xs12 sm1> Phone Number</v-flex>
            <v-flex xs12 sm4>
              <v-text-field
                dense
                outlined
                :rules="inputRules"
                v-model="staffInfo.phone_number"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm1> </v-flex>
            <v-flex xs12 sm1> Father Name</v-flex>
            <v-flex xs12 sm4>
              <v-text-field
                dense
                outlined
                :rules="inputRules"
                v-model="staffInfo.father_name"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm1> </v-flex>
            <v-flex xs12 sm1> Woreda</v-flex>
            <v-flex xs12 sm4>
              <v-text-field dense outlined v-model="staffInfo.woreda" />
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm1> </v-flex>
            <v-flex xs12 sm1> Gender</v-flex>
            <v-flex xs12 sm4>
              <v-autocomplete
                :items="genderoptions"
                :rules="inputRules"
                dense
                outlined
                v-model="staffInfo.gender"
              />
            </v-flex>
            <v-flex xs12 sm1> </v-flex>
            <v-flex xs12 sm1> Kebele</v-flex>
            <v-flex xs12 sm4>
              <v-text-field dense outlined v-model="staffInfo.kebele" />
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm1> </v-flex>
            <v-flex xs12 sm1> Date Birth</v-flex>
            <v-flex xs12 sm4>
              <v-text-field
                :rules="inputRules"
                dense
                outlined
                type="date"
                v-model="staffInfo.birth_date"
              />
            </v-flex>
            <v-flex xs12 sm1> </v-flex>
            <v-flex xs12 sm1> House Number</v-flex>
            <v-flex xs12 sm4>
              <v-text-field dense outlined v-model="staffInfo.house_number" />
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm1> </v-flex>
            <v-flex xs12 sm1> Department</v-flex>
            <v-flex xs12 sm4>
              <v-autocomplete
                outlined
                dense
                :items="departments"
                item-text="name"
                item-value="id"
                :rules="inputRules"
                v-model="staffInfo.department"
              />
            </v-flex>
            <v-flex xs12 sm1> </v-flex>
            <v-flex xs12 sm1> Role</v-flex>
            <v-flex xs12 sm4>
              <v-autocomplete
                outlined
                dense
                :items="roles"
                item-text="name"
                item-value="value"
                :rules="inputRules"
                v-model="staffInfo.role"
              />
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm1> </v-flex>
            <v-flex xs12 sm1> </v-flex>
            <v-flex xs12 sm4>
              <v-btn small outlined color="green" @click="save()"> Save </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </div>
      <br />
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      staffInfo: {},
      inputRules: [(v) => !!v || "This field is required"],
      genderoptions: ["Male", "Female"],

      roles: [
        { name: "Administrator", value: "admin" },
        { name: "Nurse", value: "nurse" },
        { name: "Cashier", value: "cashier" },
        { name: "Pharmacy", value: "pharmacy" },
        { name: "Pharmacy Store", value: "pharmacy_store" },
        { name: "Laboratory", value: "laboratory" },
        { name: "Imaging", value: "imaging" },
        { name: "Laboratory Head", value: "laboratory_head" },
        { name: "Imaging Head", value: "imaging_head" },
        { name: "OPD", value: "opd" },
        { name: "Store", value: "store" },
        { name: "Reception", value: "reception" },
      ],
    };
  },

  computed: {
    ...mapState("staff", ["registeredStaff"]),
    ...mapState("department", ["departments"]),
  },

  created() {
    this.loadData();
  },

  methods: {
    ...mapActions("staff", ["registerStaff"]),
    ...mapActions("department", ["getDepartmentList"]),

    async loadData() {
      await this.getDepartmentList();
    },

    async save() {
      if (this.$refs.form.validate()) {
        await this.registerStaff(this.staffInfo);
        if (this.registeredStaff === true) this.$router.push({ name: "staff" });
        else
          this.$fire({
            title: "Staff Registeration",
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
  margin-top: 2%;
}
</style>
