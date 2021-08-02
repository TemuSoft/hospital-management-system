<template>
  <div class="main">
    <v-card>
      <v-toolbar dense flat>
        <v-btn
          text
          class="text-capitalize"
          @click="$router.push({ name: 'payment' })"
        >
          <v-icon class="mx-3">mdi-arrow-left</v-icon>
          Go Back
        </v-btn>
        <v-spacer />
        Payment History
        <v-spacer />
      </v-toolbar>
      <v-divider></v-divider>
      <br />

      <v-data-table :items="dataList" :headers="headers">
        <template v-slot:top>
          <br />
          <v-layout>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>

            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  outlined
                  dense
                  v-model="date"
                  label="Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" range>
                <v-spacer />
                <v-btn text color="red" @click="menu = false">Cancel</v-btn>
                <v-spacer />
                <v-btn text color="green" @click="$refs.menu.save(date)">
                  Ok
                </v-btn>
              </v-date-picker>
            </v-menu>
            <v-spacer></v-spacer>

            <v-autocomplete
              dense
              outlined
              :items="byWhomList"
              v-model="byWhom"
              label="Who Accept"
            ></v-autocomplete>
            <v-spacer></v-spacer>

            <v-autocomplete
              dense
              outlined
              :items="paymentTypeList"
              v-model="paymentType"
              label="Payment Type"
            ></v-autocomplete>
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
      menu: false,
      date: [
        new Date().toISOString().substr(0, 10),
        new Date().toISOString().substr(0, 10),
      ],
      byWhom: "",
      paymentType: "",
      dataList: [],
      byWhomList: ["Name 1", "Name 2", "Name 3", "Name 4"],
      paymentTypeList: ["Regular", "Credit", "Insurance", "Emergency"],
      headers: [
        { text: "Card No", value: "cardNo" },
        { text: "Name", value: "name" },
        { text: "Reason", value: "reason" },
        { text: "Price", value: "price" },
        { text: "Payed", value: "price" },
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
