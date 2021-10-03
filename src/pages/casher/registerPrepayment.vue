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

        <h2>Prepayment Single Patient and/or Company</h2>
        <v-spacer />
      </v-layout>
      <v-divider></v-divider>
      <br />

      <v-data-table
        :items="prepaymentList"
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
              label="who?"
            />
            <v-spacer></v-spacer>

            <v-btn
              color="green"
              class="text-capitalize"
              small
              outlined
              @click="addPrepaymentDialog = true"
            >
              Add New
            </v-btn>
          </v-layout>
          <br />
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="addPrepaymentDialog" width="600px" persistent>
      <v-card>
        <v-toolbar color="green" dense>
          Register Prepayment
          <v-spacer />

          <Close @click="addPrepaymentDialog = false" class="icon" />
        </v-toolbar>
        <br />

        <v-card-text>
          <v-form @submit.prevent="save" ref="save">
            <v-layout>
              <v-autocomplete
                :items="patinetCompany"
                v-model="prepaymentInfo.who"
                label="Who?"
                item-text="text"
                item-value="value"
                outlined
                dense
                @change="loadExistingFromRegister($event)"
              />
            </v-layout>

            <v-layout>
              <v-flex xs12 sm6>
                <v-autocomplete
                  label="Name"
                  v-model="prepaymentInfo.who_id"
                  dense
                  :items="whoNameList"
                  item-text="name"
                  item-value="id"
                  outlined
                />
                <v-text-field
                  label="Amount"
                  v-model="prepaymentInfo.amount"
                  dense
                  outlined
                  type="number"
                />
              </v-flex>

              <v-flex xs12 sm6 ml-6>
                <v-textarea
                  label="Description"
                  v-model="prepaymentInfo.description"
                  outlined
                  rows="4"
                  dense
                />
              </v-flex>
            </v-layout>

            <v-layout>
              <v-btn
                small
                outlined
                color="green"
                class="text-capitalize"
                @click="save()"
              >
                Save
              </v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Close from "@/assets/icons/close.svg";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      item: {},
      addPrepaymentDialog: false,
      patinetCompany: [
        { text: "Patient", value: 1 },
        { text: "Company", value: 2 },
      ],

      whoNameList: [],
      prepaymentInfo: {},
      search: "",
      headersPrepayment: [
        { text: "Name", value: "name" },
        { text: "Amount", value: "amount" },
        { text: "Date Insert", value: "date" },
        { text: "Action", value: "action" },
      ],
    };
  },

  created() {
    this.loadData();
  },

  components: {
    Close,
  },

  computed: {
    ...mapState("cashier", ["registeredPrepayment", "prepaymentList"]),
    ...mapState("patient", ["patients"]),
    ...mapState("insurance", ["insurances"]),
  },

  methods: {
    ...mapActions("cashier", ["registerPrepayment", "getPrepaymentList"]),
    ...mapActions("patient", ["getPatientList"]),
    ...mapActions("insurance", ["getInsuranceList"]),

    async loadData() {
      await this.getPrepaymentList();
    },

    async save() {
      if (this.$$refs.save.validate()) {
        await this.registerPrepayment(this.prepaymentInfo);

        if (this.registeredPrepayment === true) {
          this.prepaymentInfo = {};
          this.loadData();
        } else
          this.$fire({
            title: "Pprepayment Registeration",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    async loadExistingFromRegister(val) {
      if (val === 1) {
        await this.getPatientList();
        this.whoNameList = this.patients;
        this.prepaymentInfo.who = 1;
      } else {
        await this.getInsuranceList();
        this.whoNameList = this.insurances;
        this.prepaymentInfo.who = 2;
      }
    },
  },
};
</script>

<style scoped>
.main {
  margin: 7%;
  margin-top: 2%;
}

.icon {
  cursor: pointer;
}
</style>
