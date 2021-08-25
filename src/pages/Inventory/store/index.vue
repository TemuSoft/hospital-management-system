<template>
  <div class="main">
    <h2>Store Items and Related</h2>
    <br />
    <br />

    {{ inventorysTemp }}

    <v-data-table :search="search" :items="inventorysTemp" :headers="headers">
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
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Edit from "@/assets/icons/edit.svg";
import Detail from "@/assets/icons/eye.svg";
import Delete from "@/assets/icons/delete.svg";

export default {
  data() {
    return {
      inventoryInfo: [],
      registerInventoryDialog: false,
      search: "",
      inputRules: [(v) => !!v || "This field is required"],
      headers: [
        { text: "Name", value: "name" },
        { text: "Date Created", value: "dateCreated" },
        { text: "Description", value: "description" },
        { text: "Action", value: "action" },
      ],
      inventorysTemp: [],
    };
  },

  components: {
    Edit,
    Detail,
    Delete,
  },

  created() {
    this.loadData();
    this.inventorysTemp = [
      {
        id: 1,
        name: "Inventory one",
        dateCreated: "09-08-2021",
        description: "Description...",
      },
    ];
  },

  computed: {
    ...mapState("inventory", ["registeredInventory", "inventorys"]),
  },

  methods: {
    ...mapActions("inventory", ["registerInventory", "loadInventoryList"]),

    async loadData() {
      await this.loadInventoryList();
    },

    async editInventory(item) {
      this.inventoryInfo = item;
      this.registerInventoryDialog = true;
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
        if (this.registeredInventory === true) {
          this.registerInventoryDialog = false;
          await this.loadData();
        } else alert("Sonething wrong please try later!!!");
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
