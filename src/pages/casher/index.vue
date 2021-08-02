<template>
  <div class="main">
    <h2>Payment Request</h2>

    <v-data-table :items="dataList" :headers="headers">
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
          <v-btn small @click="$router.push({ name: 'paymentHistory' })">
            Payment History</v-btn
          >
        </v-layout>

        <br />
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
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
