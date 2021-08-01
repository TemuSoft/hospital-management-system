<template>
  <div class="main">
    <v-card>
      <br />
      <v-data-table
        dense
        class="default"
        :headers="headers"
        :items="datalist"
        :search="search"
        sort-by="isActive"
        :sort-desc="sortDesc"
      >
        <template v-slot:top>
          <v-layout>
            <v-spacer></v-spacer>
            <h3>Staff</h3>
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
            <v-btn small @click="$router.push({ name: 'registerStaff' })">
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
export default {
  data() {
    return {
      datalist: [],
      search: "",
      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Department", value: "department" },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone" },
        { text: "Role", value: "role" },
        { text: "Active?", value: "active" },
        { text: "Aveliable?", value: "aveliable" },
      ],
      positionList: [
        "Adminstrator",
        "Human Resource",
        "Labratory",
        "OPD",
        "Medical Directors",
        "Nurse and Pharmacy",
        "Store",
      ],
    };
  },
};
</script>

<style scoped>
.main {
  margin: 7%;
  margin-top: 2%;
}
</style>
