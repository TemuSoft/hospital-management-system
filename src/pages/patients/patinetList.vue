<template>
  <div class="main">
    <h2>Patinet List</h2>
    <v-card flat>
      <v-data-table
        dense
        :headers="headers"
        :items="datalist"
        :search="search"
        items-per-page="10"
      >
        <template v-slot:top>
          <v-layout>
            <v-text-field
              v-model="search"
              label="Enter search text ..."
              dense
              single-line
              hide-details
            ></v-text-field>

            <v-spacer></v-spacer>
            <v-btn
              small
              outlined
              @click="$router.push({ name: 'regsiterPatinet' })"
            >
              Add New
            </v-btn>
          </v-layout>
        </template>

        <template v-slot:no-data>
          <h3>No Data available ...</h3>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      search: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Gender", value: "gender", sortable: false },
        { text: "Guardian", value: "guardianName" },
        { text: "Status", value: "isAdmitted", sortable: true },
        { text: "Address", value: "address" },
        { text: "Phone", value: "phone", sortable: true },
        { text: "Is Active?", value: "isActive" },
        { text: "Created On", value: "createdDate" },
        { text: "Created By", value: "createdBy" },
      ],
    };
  },
};
</script>

<style scoped>
.main {
  margin: 5%;
  margin-top: 2%;
}
</style>
