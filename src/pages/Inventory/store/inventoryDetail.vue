<template>
  <div class="main">
    <v-card flat>
      <v-toolbar dense flat>
        <v-btn
          text
          class="text-capitalize"
          @click="$router.push({ name: 'store' })"
        >
          <v-icon class="mx-3">mdi-arrow-left</v-icon>
          Go Back
        </v-btn>
        <v-spacer />
        Inventory Detail
        <v-spacer />
      </v-toolbar>
      <v-divider></v-divider>
      <br />

      <h3>Name : Medical Tools</h3>
      <p>Description : Description about Inventory .....</p>
      <p>Date : Date created about Inventory.....</p>
      <br />

      <v-data-table :search="search" :items="dataList" :headers="headers">
        <template v-slot:top>
          <br />
          <v-layout>
            <v-text-field
              v-model="search"
              label="Enter search text ..."
              dense
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>

            <v-btn small @click="registerItemDialog = true">Add Item</v-btn>
          </v-layout>
          <br />
        </template>
      </v-data-table>

      <v-dialog v-model="registerItemDialog" persistent width="700px">
        <v-card>
          <v-toolbar color="green" dark>Add New Item </v-toolbar>
          <br />
          <v-card-text>
            <v-layout>
              <v-flex xs12 sm1> </v-flex>
              <v-flex xs12 sm3> Name</v-flex>
              <v-flex xs12 sm8>
                <v-text-field dense outlined v-model="item.name"></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs12 sm1> </v-flex>
              <v-flex xs12 sm3> Total Quantity</v-flex>
              <v-flex xs12 sm8>
                <v-text-field
                  dense
                  type="number"
                  outlined
                  v-model="item.totalQuantity"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs12 sm1> </v-flex>
              <v-flex xs12 sm3> Unit Of Measurment</v-flex>
              <v-flex xs12 sm8>
                <v-autocomplete
                  dense
                  :items="unitOfMeasurment"
                  outlined
                  v-model="item.uofm"
                ></v-autocomplete>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs12 sm1> </v-flex>
              <v-flex xs12 sm3> Description</v-flex>
              <v-flex xs12 sm8>
                <v-text-field
                  dense
                  outlined
                  v-model="item.description"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-spacer></v-spacer>
              <v-btn small @click="registerItemDialog = false">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn small @click="save()">Save</v-btn>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      unitOfMeasurment: [],
      item: [],
      registerItemDialog: false,
      search: "",
      dataList: [],
      headers: [
        { text: "Name", value: "name" },
        { text: "Total Register", value: "totalRegister" },
        { text: "Aveliable", value: "aveliable" },
        { text: "Unit Of Measurment", value: "uofm" },
        { text: "Action", value: "action" },
      ],
    };
  },
};
</script>

<style scoped>
.main {
  margin: 7%;
  margin-top: 3%;
}
</style>
