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
          <h3>Blood Bank</h3>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            label="Enter search text ..."
            dense
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn dense prepend-icon="mdi-plus">
            <v-icon left>mdi-plus</v-icon>Add New Medicine</v-btn
          >
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
        { text: "", value: "status" },
        { text: "Name", value: "name", align: "left" },
        { text: "Generic Name", value: "genericName" },
        { text: "Store Box", value: "storeBox" },
        { text: "Quantity left", value: "quantity", sortable: true },
        { text: "Buying price", value: "buyingPrice" },
        { text: "Selling price", value: "sellingPrice" },

        { text: "Composition", value: "compositions" },
        { text: "Group", value: "group.name", sortable: true },
        { text: "Category", value: "category.name", sortable: true },

        { text: "Manufacture", value: "company", sortable: false },
        { text: "Effects", value: "effects" },
        { text: "Expire Date", value: "expireOn" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
};
</script>

<style></style>
