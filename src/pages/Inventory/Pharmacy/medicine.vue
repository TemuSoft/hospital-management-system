<template>
  <div class="main">
    <h3>Medicines</h3>
    <v-data-table :headers="headers" :items="medicineList" :search="search">
      <template v-slot:item.category_id="{ item }">
        <div v-for="cc in medicineCategoryList" :key="cc">
          <label v-if="cc.id === item.category_id">{{ cc.name }}</label>
        </div>
      </template>

      <template v-slot:item.unit_of_measurement="{ item }">
        <div v-for="mm in measurementsPharmacy" :key="mm">
          <label v-if="mm.id === item.unit_of_measurement">{{ mm.unit }}</label>
        </div>
      </template>

      <template v-slot:item.action="{ item }">
        <Detail class="icon" @click="detialMedicine(item)" />

        <Edit
          class="icon"
          style="margin-left: 30px"
          @click="editMedicine(item)"
        />

        <v-btn
          small
          text
          color="green"
          class="text-capitalize"
          @click="addMoreInSingleMedicine(item)"
        >
          Add More
        </v-btn>
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
            @click="(registerMedicineDialog = true), (medicineInfo = {})"
          >
            Add New
          </v-btn>
        </v-layout>
        <br />
      </template>
    </v-data-table>

    <v-dialog v-model="registerMedicineDialog" persistent width="700px">
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
              <v-flex xs12 sm6>
                <v-text-field
                  label="Name"
                  dense
                  outlined
                  v-model="medicineInfo.name"
                  :rules="inputRules"
                />

                <v-autocomplete
                  label="Category"
                  item-text="name"
                  item-value="id"
                  dense
                  outlined
                  :items="medicineCategoryList"
                  v-model="medicineInfo.category_id"
                  :rules="inputRules"
                />

                <v-autocomplete
                  dense
                  label="Unit Of Measurment"
                  :items="measurementsPharmacy"
                  outlined
                  item-text="unit"
                  item-value="id"
                  :rules="inputRules"
                  v-model="medicineInfo.unit_of_measurement"
                />
              </v-flex>
              <v-flex xs12 sm1></v-flex>
              <v-flex xs12 sm5>
                <v-text-field
                  label="Dosage"
                  dense
                  outlined
                  v-model="medicineInfo.dosage"
                  :rules="inputRules"
                />
                <v-textarea
                  label="Description and Side Effects"
                  dense
                  rows="3"
                  outlined
                  v-model="medicineInfo.description"
                  :rules="inputRules"
                />
              </v-flex>
            </v-layout>

            <v-layout>
              <v-spacer />
              <v-btn small outlined color="green" @click="save"> Save </v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="addMedicineDialog" persistent width="700px">
      <v-card>
        <v-toolbar dense color="green">
          Add New Medicine
          <v-spacer />
          <Close class="icon" @click="closeDialog()" />
        </v-toolbar>
        <br />

        <v-card-text>
          <v-form @submit.prevent="register" ref="register">
            Name : {{ selectedMedicine.name }}
            <br />
            Balance : {{ selectedMedicine.balance }}
            <br />
            Category : {{ selectedMedicine.category }}
            <br />
            Dosage : {{ selectedMedicine.dosage }}
            <br />
            Unit Of Measurment : {{ selectedMedicine.unit_of_measurement }}
            <br />
            <br />
            <br />

            <v-layout>
              <v-flex xs12 sm6>
                <v-text-field
                  label="Quantity"
                  type="number"
                  dense
                  outlined
                  v-model="medicineInfo.quantity"
                  :rules="inputRules"
                />

                <v-text-field
                  label="Buying Price"
                  type="number"
                  dense
                  outlined
                  v-model="medicineInfo.buying_price"
                  :rules="inputRules"
                />

                <v-text-field
                  label="Selling Price"
                  type="number"
                  dense
                  outlined
                  v-model="medicineInfo.selling_price"
                  :rules="inputRules"
                />
              </v-flex>
              <v-flex xs12 sm1></v-flex>
              <v-flex xs12 sm5>
                <v-text-field
                  label="Manufacture Date"
                  type="date"
                  dense
                  outlined
                  v-model="medicineInfo.manufacture_date"
                  :rules="inputRules"
                />

                <v-text-field
                  label="Expire Date"
                  type="date"
                  dense
                  outlined
                  v-model="medicineInfo.expire_date"
                  :rules="inputRules"
                />
              </v-flex>
            </v-layout>

            <v-layout>
              <v-spacer />
              <v-btn small outlined color="green" @click="register">
                Register
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
import Detail from "@/assets/icons/eye.svg";
import Edit from "@/assets/icons/edit.svg";
import { mapActions, mapState } from "vuex";

import AccountService from "@/network/accountService";

export default {
  data() {
    return {
      login_user: AccountService.getProfile(),
      inputRules: [(v) => !!v || "This field is required"],

      registerMedicineDialog: false,
      addMedicineDialog: false,
      selectedMedicine: [],
      medicineInfo: {},
      search: "",
      headers: [
        { text: "Name", value: "name", align: "left" },
        { text: "Balance", value: "balance" },
        { text: "Unit Of Measurment", value: "unit_of_measurement" },
        { text: "Category", value: "category_id" },
        { text: "Store Box", value: "storeBox" },
        { text: "Actions", value: "action" },
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
      "addMoredMedicine",
      "medicineCategoryList",
    ]),
    ...mapState("measurement", ["measurementsPharmacy"]),
  },

  created() {
    this.loadData();
  },

  methods: {
    ...mapActions("pharmacy", [
      "registerMedicine",
      "addMoreMedicine",
      "getMedicineList",
      "getMedicineCategory",
    ]),

    ...mapActions("measurement", ["getMeasurementListPharmacy"]),

    async loadData() {
      await this.getMedicineCategory();
      await this.getMeasurementListPharmacy();
      await this.getMedicineList();
    },

    async closeDialog() {
      this.addMedicineDialog = false;
      this.registerMedicineDialog = false;
    },

    async save() {
      if (this.$refs.save.validate()) {
        this.medicineInfo.user_id = this.login_user.id;
        await this.registerMedicine(this.medicineInfo);

        if (this.registeredMedicine.st === true) {
          this.registerMedicineDialog = false;
          this.loadData();
        } else
          this.$fire({
            title: "Medicine Registeration",
            text: this.registeredMedicine.msg,
            type: "error",
            timer: 7000,
          });
      }
    },

    async register() {
      if (this.$refs.register.validate()) {
        this.medicineInfo.user_id = this.login_user.id;
        this.medicineInfo.balance = this.medicineInfo.quantity;
        await this.addMoreMedicine(this.medicineInfo);

        if (this.addMoredMedicine.st === true) {
          this.addMedicineDialog = false;
          this.loadData();
        } else
          this.$fire({
            title: "Medicine Registeration",
            text: this.registeredMedicine.msg,
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

    async addMoreInSingleMedicine(data) {
      this.addMedicineDialog = true;
      this.medicineInfo = {};
      this.medicineInfo.medicine_id = data.id;
      this.selectedMedicine = data;
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
