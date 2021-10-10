<template>
  <div class="main">
    <v-card flat>
      <v-toolbar dense flat>
        <v-btn text class="text-capitalize" @click="back()">
          <v-icon class="mx-3">mdi-arrow-left</v-icon>
          Go Back
        </v-btn>
        <v-spacer />
        Inventory Detail
        <v-spacer />
      </v-toolbar>
      <v-divider></v-divider>
      <br />

      <h3>Name : {{ singleInventory.name }}</h3>
      <p>
        Description :
        {{ singleInventory.description }}
      </p>
      <p>
        Date :
        {{ singleInventory.created_date }}
      </p>
      <br />

      <v-data-table :search="search" :items="itemsInventory" :headers="headers">
        <template v-slot:item.action="{ item }">
          <Edit @click="editItem(item)" class="icon" />
          &nbsp;&nbsp;&nbsp;
          <Detail @click="detailItem(item)" class="icon" />
        </template>

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

            <v-btn
              small
              @click="registerItemDialog = true"
              outlined
              color="green"
              class="text-capitalize"
            >
              Add Item
            </v-btn>
          </v-layout>
          <br />
        </template>
      </v-data-table>

      <v-dialog v-model="registerItemDialog" persistent width="700px">
        <v-card>
          <v-toolbar color="green" dense>
            Add New Item
            <v-spacer />

            <Close @click="registerItemDialog = false" class="icon" />
          </v-toolbar>
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
                    v-model="itemInfo.total_quantity"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-flex xs12 sm1> </v-flex>
                <v-flex xs12 sm3> Unit Of Measurment</v-flex>
                <v-flex xs12 sm8>
                  <v-autocomplete
                    dense
                    :items="measurements"
                    outlined
                    item-text="unit"
                    item-value="id"
                    :rules="inputRules"
                    v-model="itemInfo.uofm"
                  />
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
                <v-spacer />
                <v-btn small @click="save()" outlined color="green">Save</v-btn>
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
import Edit from "@/assets/icons/edit.svg";
import Detail from "@/assets/icons/eye.svg";
import Close from "@/assets/icons/close.svg";

export default {
  data() {
    return {
      itemInfo: {},
      registerItemDialog: false,
      inputRules: [(v) => !!v || "This field is required"],
      search: "",
      inventoryId: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Total Register", value: "total_quantity" },
        { text: "Aveliable", value: "available_quantity" },
        { text: "Unit Of Measurment", value: "uofm" },
        { text: "Action", value: "action" },
      ],
    };
  },

  components: {
    Edit,
    Detail,
    Close,
  },

  created() {
    const { inventoryId } = this.$route.params;
    this.inventoryId = inventoryId;

    if (this.inventoryId === undefined) this.back();
    this.loadData();
  },

  computed: {
    ...mapState("inventory", ["singleInventory"]),
    ...mapState("item", ["registeredItem", "itemsInventory"]),
    ...mapState("measurement", ["measurements"]),
  },

  methods: {
    ...mapActions("inventory", ["loadSingleInvetory"]),
    ...mapActions("item", ["registerItem", "loadItemListInventory"]),
    ...mapActions("measurement", ["getMeasurementList"]),

    async loadData() {
      await this.loadSingleInvetory(this.inventoryId);
      await this.loadItemListInventory(this.inventoryId);
      await this.getMeasurementList();
    },

    async save() {
      if (this.$refs.save.validate()) {
        this.itemInfo.inventory_id = this.inventoryId;
        this.itemInfo.available_quantity = this.itemInfo.total_quantity;
        await this.registerItem(this.itemInfo);

        if (this.registeredItem === true) {
          this.registerItemDialog = false;
          await this.loadData();
        } else
          this.$fire({
            title: "Item Registeration",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    async editItem(item) {
      alert(item.id);
    },

    async detailItem(item) {
      alert(item.id);
    },

    back() {
      this.$router.push({ name: "store" });
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
