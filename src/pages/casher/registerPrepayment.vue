<template>
  <div class="main">
    <v-card flat>
      <v-layout>
        <v-btn
          text
          class="text-capitalize"
          @click="$router.push({ name: 'payment' })"
        >
          <v-icon class="mx-3">mdi-arrow-left</v-icon>
          Go Back
        </v-btn>
        <v-spacer />

        <h2>Prepayment Single Patinet and Company</h2>
        <v-spacer />
      </v-layout>
      <v-divider></v-divider>
      <br />

      <v-data-table
        :items="dataList"
        :search="search"
        :headers="headersPrepayment"
        items-per-page="10"
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

            <v-autocomplete
              rounded
              dense
              outlined
              :items="patinetCompany"
              @change="loadPrepaymentList($event)"
              label="who?"
            />
            <v-spacer></v-spacer>

            <v-btn small outlined @click="addPrepaymentDialog = true">
              Add New
            </v-btn>
          </v-layout>
          <br />
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="addPrepaymentDialog" width="600px" persistent>
      <v-card>
        <v-toolbar color="green" dense> Register Prepayment</v-toolbar>
        <br />

        <v-card-text>
          <v-layout>
            <v-autocomplete
              :items="patinetCompany"
              v-model="item.who"
              label="Who?"
              outlined
              dense
              @change="loadExistingFromRegister($event)"
            />
          </v-layout>

          <v-layout>
            <v-flex xs12 sm6>
              <v-autocomplete
                label="Name"
                v-model="item.whoId"
                dense
                :items="whoNameList"
                outlined
              />
              <v-text-field
                label="Amount"
                v-model="item.amount"
                dense
                outlined
                type="number"
              />
              <v-text-field rounded type="file" dense />
            </v-flex>

            <v-flex xs12 sm6 ml-6>
              <v-textarea
                label="Description"
                v-model="item.description"
                outlined
                dense
              />
            </v-flex>
          </v-layout>

          <v-layout>
            <v-spacer></v-spacer>
            <v-btn small @click="addPrepaymentDialog = false">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn small @click="save()">Save</v-btn>
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
      item: {},
      addPrepaymentDialog: false,
      patinetCompany: ["Patie-nt", "Company"],
      dataList: [],
      search: "",
      headersPrepayment: [
        { text: "Name", value: "name" },
        { text: "Amount", value: "amount" },
        { text: "Date Insert", value: "date" },
        { text: "Action", value: "action" },
      ],
    };
  },

  methods: {
    async loadPrepaymentList(val) {
      alert(val);
    },

    async loadExistingFromRegister(val) {
      alert(val);
    },
  },
};
</script>

<style scoped>
.main {
  margin: 7%;
  margin-top: 2%;
}
</style>
