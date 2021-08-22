<template>
  <div class="main">
    <v-card>
      <h2>Staff</h2>
      <br />

      <v-data-table dense :headers="headers" :items="staffs" :search="search">
        <template v-slot:top>
          <v-layout>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-autocomplete
              dense
              :items="positionList"
              label="Positions"
            ></v-autocomplete>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              label="Enter search text ..."
              dense
              single-line
              hide-details
            ></v-text-field
            ><v-spacer></v-spacer>
            <v-btn
              small
              outlined
              text
              @click="$router.push({ name: 'registerStaff' })"
            >
              Add New
            </v-btn>
          </v-layout>
          <br />
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      search: "",

      headers: [
        { text: "First Name", value: "first_name" },
        { text: "Father Name", value: "father_name" },
        { text: "Gender", value: "gender" },
        { text: "Department", value: "department" },
        { text: "Email", value: "email" },
        { text: "Phone Number", value: "phone_number" },
        { text: "Active?", value: "is_active" },
      ],
      positionList: [
        { name: "Adminstrator", value: 1 },
        { name: "Human Resource", value: 2 },
        { name: "Labratory", value: 3 },
        { name: "OPD", value: 4 },
        { name: "Medical Directors", value: 5 },
        { name: "Nurse and Pharmacy", value: 6 },
        { name: "Store", value: 7 },
      ],
    };
  },

  computed: {
    ...mapState("staff", ["staffs"]),
  },

  created() {
    this.loadData();
  },

  methods: {
    ...mapActions("staff", ["getStaffList", "getStaffListFilter"]),

    async loadData() {
      await this.getStaffList();

      // await this.getStaffListFilter({ key: "email", value: "email" });
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
