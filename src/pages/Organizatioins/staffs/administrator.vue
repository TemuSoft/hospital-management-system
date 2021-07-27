<template>
  <div>
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
          <h3>Adminstrator</h3>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            label="Enter search text ..."
            dense
            single-line
            hide-details
          ></v-text-field>
        </v-layout>
      </template>
    </v-data-table>
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
    };
  },
};
</script>

<style></style>
