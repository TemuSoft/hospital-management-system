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
          <h3>Medical service categories</h3>
          <v-spacer></v-spacer>

          <v-btn dense prepend-icon="mdi-plus">
            <v-icon left>mdi-plus</v-icon>New Medical Service Categories
          </v-btn>
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
      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Description", value: "description" },
        { text: "Action", value: "action" },
      ],
    };
  },
};
</script>

<style></style>
