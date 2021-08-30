<template>
  <div class="main">
    <h2>Store Items and Related</h2>
    <br />
    <br />

    <v-data-table :search="search" :items="inventorys" :headers="headers">
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

          <v-btn small @click="registerInventoryDialog = true"
            >Add Inventory</v-btn
          >
        </v-layout>
        <br />
      </template>

      <template v-slot:item.action="{ item }">
        <Edit @click="editInventory(item)" class="icon" />
        &nbsp;&nbsp;&nbsp;
        <Detail @click="detailInventory(item)" class="icon" />
        &nbsp;&nbsp;&nbsp;
        <Delete @click="deleteInventory(item)" class="icon" />
      </template>
    </v-data-table>

    <v-dialog v-model="registerInventoryDialog" persistent width="700px">
      <v-card>
        <v-toolbar color="green" dark>Add New Inventory </v-toolbar>
        <br />
        <v-card-text>
          <v-form @submit.prevent="save()" ref="save">
            <v-layout>
              <v-flex xs12 sm1> </v-flex>
              <v-flex xs12 sm3> Name</v-flex>
              <v-flex xs12 sm8>
                <v-text-field
                  dense
                  outlined
                  :rules="inputRules"
                  v-model="inventoryInfo.name"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs12 sm1> </v-flex>
              <v-flex xs12 sm3> Description</v-flex>
              <v-flex xs12 sm8>
                <v-text-field
                  dense
                  outlined
                  :rules="inputRules"
                  v-model="inventoryInfo.description"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-spacer></v-spacer>
              <v-btn small @click="registerInventoryDialog = false"
                >Cancel</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn small @click="save()">Save</v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="updateInventoryDialog" persistent width="700px">
      <v-card>
        <v-toolbar color="green" dark>Update Inventory </v-toolbar>
        <br />
        <v-card-text>
          <v-form @submit.prevent="update()" ref="update">
            <v-layout>
              <v-flex xs12 sm1> </v-flex>
              <v-flex xs12 sm3> Name</v-flex>
              <v-flex xs12 sm8>
                <v-text-field
                  dense
                  outlined
                  :rules="inputRules"
                  v-model="updateInventoryInfo.name"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs12 sm1> </v-flex>
              <v-flex xs12 sm3> Description</v-flex>
              <v-flex xs12 sm8>
                <v-text-field
                  dense
                  outlined
                  :rules="inputRules"
                  v-model="updateInventoryInfo.description"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-spacer></v-spacer>
              <v-btn small @click="updateInventoryDialog = false">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn small @click="update()">Update</v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Edit from "@/assets/icons/edit.svg";
import Detail from "@/assets/icons/eye.svg";
import Delete from "@/assets/icons/delete.svg";

export default {
  name: "Staff",

  data() {
    return {
      inventoryInfo: {},
      updateInventoryInfo: {},
      registerInventoryDialog: false,
      updateInventoryDialog: false,
      search: "",
      inputRules: [(v) => !!v || "This field is required"],
      headers: [
        { text: "Name", value: "name" },
        { text: "Date Created", value: "created_date" },
        { text: "Description", value: "description" },
        { text: "Action", value: "action" },
      ],
    };
  },

  components: {
    Edit,
    Detail,
    Delete,
  },

  created() {
    this.loadData();
  },

  computed: {
    ...mapState("inventory", [
      "registeredInventory",
      "inventorys",
      "updatedInventory",
    ]),
  },

  methods: {
    ...mapActions("inventory", [
      "registerInventory",
      "loadInventoryList",
      "updateInventory",
    ]),

    async loadData() {
      await this.loadInventoryList();
    },

    async editInventory(item) {
      this.updateInventoryInfo = item;
      this.updateInventoryDialog = true;
    },

    async detailInventory(item) {
      this.$router.push({
        name: "inventoryDetail",
        params: { inventoryId: item.id },
      });
    },

    async deleteInventory(item) {
      alert(item.id);
    },

    async save() {
      if (this.$refs.save.validate()) {
        await this.registerInventory(this.inventoryInfo);

        if (this.registeredInventory === true) {
          this.registerInventoryDialog = false;
          await this.loadData();
        } else
          this.$fire({
            title: "Inventory Registeration!!!",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    async update() {
      if (this.$refs.update.validate()) {
        await this.updateInventory(this.updateInventoryInfo);

        if (this.updatedInventory === true) {
          this.updateInventoryDialog = false;
          await this.loadData();
        } else
          this.$fire({
            title: "Inventory Info Update!!!",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
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
.icon {
  cursor: pointer;
}
</style>
