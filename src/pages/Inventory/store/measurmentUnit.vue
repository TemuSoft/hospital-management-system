<template>
  <div class="main">
    <h3>Measurement Units</h3>

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
          <v-text-field
            v-model="search"
            label="Enter search text ..."
            dense
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn small outlined @click="addMeasureUnitDialog = true">
            Add New
          </v-btn>
        </v-layout>
      </template>
    </v-data-table>

    <v-dialog persistent v-model="addMeasureUnitDialog" width="700px">
      <v-card>
        <v-toolbar color="green"> Add Measurement Unit</v-toolbar>
        <br />

        <v-card-text>
          <v-layout>
            <v-text-field dense outlined label="Unit" v-model="item.unit" />
            <v-spacer />

            <v-text-field dense outlined label="Symbol" v-model="item.symbol" />
            <v-spacer />

            <v-text-field
              dense
              outlined
              label=" Quantity"
              v-model="item.quantity"
            />
          </v-layout>
          <br />

          <v-layout>
            <v-spacer />
            <v-btn
              small
              outlined
              text
              color="red"
              @click="addMeasureUnitDialog = false"
            >
              Cancel
            </v-btn>
            <v-spacer />

            <v-btn small outlined text @click="addMeasureUnitDialog = true">
              Save
            </v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: [],
      addMeasureUnitDialog: false,
      datalist: [],
      search: "",
      headers: [
        { text: "ID", value: "id" },
        { text: "Created Date", value: "date" },
        { text: "Unit", value: "unit" },
        { text: "Symbol", value: "symbol" },
        { text: "Quantity", value: "quantity" },
        { text: "Action", value: "action" },
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
