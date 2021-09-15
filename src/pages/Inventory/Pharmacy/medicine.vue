<template>
  <div class="main">
    <h3>Medicines</h3>
    <v-data-table :headers="headers" :items="medicineList" :search="search">
      <template v-slot:item.action="{ item }">
        <Detail class="icon" @click="detialMedicine(item)" />

        <Edit
          class="icon"
          style="margin-left: 30px"
          @click="editMedicine(item)"
        />
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
          <v-btn
            small
            text
            outlined
            color="green"
            @click="addMedicineDialog = true"
          >
            Add New
          </v-btn>
        </v-layout>
        <br />
      </template>
    </v-data-table>

    <v-dialog v-model="addMedicineDialog" persistent width="700px">
      <v-card>
        <v-toolbar dense color="green">
          Add New Medicine
          <v-spacer />
          <Close class="icon" @click="closeDialog()" />
        </v-toolbar>
        <br />

        <v-card-text>
          <v-form @submit.prevent="save" ref="save">
            <v-layout>
              <v-text-field
                label="Name"
                dense
                outlined
                v-model="medicineInfo.name"
                :rules="inputRules"
              />
              <v-spacer />
              <v-text-field
                label="Quantity"
                type="number"
                dense
                outlined
                v-model="medicineInfo.quantity"
                :rules="inputRules"
              />
            </v-layout>

            <v-layout>
              <v-text-field
                label="Buying Price"
                type="number"
                dense
                outlined
                v-model="medicineInfo.buying_price"
                :rules="inputRules"
              />
              <v-spacer />
              <v-text-field
                label="Selling Price"
                type="number"
                dense
                outlined
                v-model="medicineInfo.selling_price"
                :rules="inputRules"
              />
            </v-layout>

            <v-layout>
              <v-text-field
                label="Manufacture Date"
                type="date"
                dense
                outlined
                v-model="medicineInfo.manufacture_date"
                :rules="inputRules"
              />
              <v-spacer />
              <v-text-field
                label="Expire Date"
                type="date"
                dense
                outlined
                v-model="medicineInfo.expire_date"
                :rules="inputRules"
              />
            </v-layout>

            <v-layout>
              <v-autocomplete
                label="Group"
                item-text="name"
                item-value="id"
                dense
                outlined
                :items="medicineGroupList"
                v-model="medicineInfo.group"
                :rules="inputRules"
              />
              <v-spacer />
              <v-autocomplete
                label="Category"
                dense
                outlined
                item-text="name"
                item-value="id"
                :items="medicineCategoryList"
                v-model="medicineInfo.category"
                :rules="inputRules"
              />
            </v-layout>

            <v-layout>
              <v-textarea
                label="Description and Side Effects"
                dense
                rows="2"
                outlined
                v-model="medicineInfo.description"
                :rules="inputRules"
              />
            </v-layout>

            <v-layout>
              <v-spacer />
              <v-btn small outlined color="green" @click="save"> Save </v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Close from "@/assets/icons/close.svg";
import Detail from "@/assets/icons/eye.svg";
import Edit from "@/assets/icons/edit.svg";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      inputRules: [(v) => !!v || "This field is required"],

      addMedicineDialog: false,
      medicineInfo: {},
      search: "",
      headers: [
        { text: "Name", value: "name", align: "left" },
        { text: "Quantity left", value: "quantity" },
        { text: "Group", value: "group" },
        { text: "Category", value: "category" },
        { text: "Expire Date", value: "expire_date" },
        { text: "Store Box", value: "storeBox" },
        { text: "Actions", value: "actions" },
      ],
    };
  },

  components: {
    Close,
    Detail,
    Edit,
  },

  computed: {
    ...mapState("pharmacy", [
      "medicineList",
      "registeredMedicine",
      "medicineGroupList",
      "medicineCategoryList",
    ]),
  },

  methods: {
    ...mapActions("pharmacy", [
      "registerMedicine",
      "getMedicineList",
      "getMedicineGroup",
      "getMedicineCategory",
    ]),

    async loadData() {
      await this.getMedicineList();
      await this.getMedicineGroup();
      await this.getMedicineCategory();
    },

    async closeDialog() {
      this.addMedicineDialog = false;
    },

    async save() {
      if (this.$refs.save.validate()) {
        await this.registerMedicine(this.medicineInfo);

        if (this.registeredMedicine === true) {
          this.addMedicineDialog = false;
          this.loadData();
        } else
          this.$fire({
            title: "Medicine Registeration",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    async detialMedicine(item) {
      alert(item.id);
    },

    async editMedicine(item) {
      alert(item.id);
    },
  },
};
</script>

<style scoped>
.main {
  padding-left: 1%;
  padding-right: 1%;
}

.icon {
  cursor: pointer;
}
</style>
