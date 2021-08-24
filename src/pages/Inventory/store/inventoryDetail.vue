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

      <v-data-table :search="search" :items="items" :headers="headers">
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
            <v-form @submit.prevent="save" ref="save">
              <v-layout>
                <v-flex xs12 sm1> </v-flex>
                <v-flex xs12 sm3> Name</v-flex>
                <v-flex xs12 sm8>
                  <v-text-field
                    dense
                    outlined
                    :rules="inputRules"
                    v-model="itemInfo.name"
                  ></v-text-field>
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
                    :rules="inputRules"
                    v-model="itemInfo.totalQuantity"
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
                    :rules="inputRules"
                    v-model="itemInfo.uofm"
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
                    v-model="itemInfo.description"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-spacer></v-spacer>
                <v-btn small @click="registerItemDialog = false">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn small @click="save()">Save</v-btn>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      unitOfMeasurment: [],
      itemInfo: [],
      registerItemDialog: false,
      inputRules: [(v) => !!v || "This field is required"],
      search: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Total Register", value: "totalRegister" },
        { text: "Aveliable", value: "aveliable" },
        { text: "Unit Of Measurment", value: "uofm" },
        { text: "Action", value: "action" },
      ],
    };
  },
  created() {
    this.loadData();
  },

  computed: {
    ...mapState("item", ["registeredItem", "items"]),
  },

  methods: {
    ...mapActions("item", ["registerItem", "loadItemList"]),

    async loadData() {
      await this.loadItemList();
    },

    async save() {
      if (this.$refs.save.validate()) {
        this.itemInfo.avaliable = this.itemInfo.totalQuantity;
        await this.registerItem(this.itemInfo);

        if (this.registeredItem === true) {
          this.registerItemDialog = false;
          await this.loadData();
        } else alert("Something wrong try again later please!!!");
      }
    },
  },
};
</script>

<style scoped>
.main {
  margin: 7%;
  margin-top: 3%;
}
</style>
