<template>
  <div class="main">
    <v-card flat>
      <h3>Active OPD consultations</h3>
      {{ stateTy }}
      <br />

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
            <v-text-field
              v-model="search"
              label="Enter search text ..."
              dense
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
          </v-layout>
          <br />
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  components: {},
  data() {
    return {
      search: "",
      datalist: [],
      headers: [
        { text: "ID", value: "id" },
        { text: "Patinet Name", value: "patinetName" },
        { text: "Consultant", value: "consultant" },
        { text: "Is Active?", value: "isActive" },
        { text: "From", value: "from" },
        { text: "To", value: "to" },
      ],
    };
  },
  created() {},
  computed: {
    ...mapState("doctor", ["stateTy"]),
  },
};
</script>

<style scoped>
.main {
  margin: 5%;
  margin-top: 2%;
}
</style>
