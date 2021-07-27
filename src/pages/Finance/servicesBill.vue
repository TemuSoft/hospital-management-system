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
          <h3>Bills</h3>
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
        { text: "Patinet", value: "patient" },
        { text: "Amount", value: "amount" },
        { text: "Paid Amount", value: "paidAmount" },
        { text: "Paid?", value: "paid" },
        { text: "NO", value: "no" },
        { text: "CL", value: "cl" },
        { text: "Active", value: "active" },
        { text: "Created Date", value: "createdDate" },
        { text: "Action", value: "action" },
      ],
    };
  },
};
</script>

<style></style>
