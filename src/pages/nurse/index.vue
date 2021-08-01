<template>
  <div>
    <h3>Nurse Page</h3>
    <v-data-table :items="dalaList" :headers="headers"> </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dalaList: [],
      headers: [
        { text: "Card No", value: "cardNo" },
        { text: "Name", value: "name" },
        { text: "Type", value: "type" },
        { text: "Status", value: "status" },
        { text: "Action", value: "action" },
      ],
    };
  },
};
</script>

<style></style>
