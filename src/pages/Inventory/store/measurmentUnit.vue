<template>
  <div class="main">
    <h3>Measurement Units</h3>

    <v-data-table :headers="headers" :items="measurements" :search="search">
      <template v-slot:item.type="{ item }">
        <label v-if="item.type === 1">Store</label>
        <label v-else>Pharmacy</label>
      </template>

      <template v-slot:item.action="{ item }">
        <Edit @click="editMeasurement(item)" class="icon" />
      </template>

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
          <v-form @submit.prevent="save" ref="save">
            <v-layout>
              <v-text-field
                dense
                outlined
                :rules="inputRules"
                label="Unit"
                v-model="measurementInfo.unit"
              />
              <v-spacer />

              <v-text-field
                dense
                outlined
                :rules="inputRules"
                label="Symbol"
                v-model="measurementInfo.symbol"
              />
              <v-spacer />

              <v-text-field
                dense
                outlined
                :rules="inputRules"
                type="number"
                label=" Quantity"
                v-model="measurementInfo.quantity"
              />
            </v-layout>
            <br />

            <v-layout>
              <v-spacer />
              <v-btn small outlined text color="red" @click="cancel()">
                Cancel
              </v-btn>
              <v-spacer />

              <v-btn small outlined text @click="save()"> Save </v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog persistent v-model="updateMeasureUnitDialog" width="700px">
      <v-card>
        <v-toolbar color="green"> Update Measurement Unit</v-toolbar>
        <br />

        <v-card-text>
          <v-form @submit.prevent="update" ref="update">
            <v-layout>
              <v-text-field
                dense
                outlined
                :rules="inputRules"
                label="Unit"
                v-model="measurementInfo.unit"
              />
              <v-spacer />

              <v-text-field
                dense
                outlined
                :rules="inputRules"
                label="Symbol"
                v-model="measurementInfo.symbol"
              />
              <v-spacer />

              <v-text-field
                dense
                outlined
                :rules="inputRules"
                type="number"
                label=" Quantity"
                v-model="measurementInfo.quantity"
              />
            </v-layout>
            <br />

            <v-layout>
              <v-spacer />
              <v-btn small outlined text color="red" @click="cancel()">
                Cancel
              </v-btn>
              <v-spacer />

              <v-btn small outlined text @click="update()"> UPdate </v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Edit from "@/assets/icons/edit.svg";

export default {
  data() {
    return {
      measurementInfo: {},
      updateMeasureUnitDialog: false,
      addMeasureUnitDialog: false,
      search: "",
      inputRules: [(v) => !!v || "This field is required"],
      headers: [
        { text: "Unit", value: "unit" },
        { text: "Symbol", value: "symbol" },
        { text: "Quantity", value: "quantity" },
        { text: "Type", value: "type" },
        { text: "Action", value: "action" },
      ],
    };
  },

  components: {
    Edit,
  },

  created() {
    this.loadData();
  },

  computed: {
    ...mapState("measurement", [
      "registeredMeasurement",
      "updatedMeasurement",
      "measurements",
    ]),
  },

  methods: {
    ...mapActions("measurement", [
      "registerMeasurement",
      "updateMeasurement",
      "getMeasurementList",
    ]),

    async loadData() {
      await this.getMeasurementList();
    },

    async save() {
      if (this.$refs.save.validate()) {
        this.measurementInfo.type = 1;
        await this.registerMeasurement(this.measurementInfo);

        if (this.registeredMeasurement === true) {
          this.addMeasureUnitDialog = false;
          this.loadData();
        } else
          this.$fire({
            title: "Measurement Registeration",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    async update() {
      if (this.$refs.update.validate()) {
        await this.updateMeasurement(this.measurementInfo);

        if (this.updatedMeasurement === true) {
          this.updateMeasureUnitDialog = false;
          this.loadData();
        } else
          this.$fire({
            title: "Measurement Infor Update",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    async cancel() {
      this.addMeasureUnitDialog = false;
      this.updateMeasureUnitDialog = false;
      this.measurementInfo = {};
    },

    async editMeasurement(item) {
      this.measurementInfo = item;
      this.updateMeasureUnitDialog = true;
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
