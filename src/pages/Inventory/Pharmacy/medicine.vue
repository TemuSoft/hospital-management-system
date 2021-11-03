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
        {{ getMeasurementPharmacyName(item.unit_of_measurement) }}
      </template>

      <template v-slot:item.action="{ item }">
        <Detail class="icon" @click="detialMedicine(item)" />

        <Edit class="icon ml-10" @click="editMedicine(item)" />

        <Add @click="addMoreInSingleMedicine(item)" class="icon ml-10" />
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
          />
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
            Unit Of Measurment :
            {{
              getMeasurementPharmacyName(selectedMedicine.unit_of_measurement)
            }}
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

    <v-dialog v-model="unitOfMeasurmentRelationDialog" width="700px" persistent>
      <v-card>
        <v-toolbar dense color="green">
          Medicine Unit Of Measurment
          <v-spacer />

          <v-btn
            @click="registerUofMedicine = true"
            class="text-capitalize"
            text
          >
            Register
          </v-btn>
          <v-spacer />

          <v-btn
            @click="editMedicineRelationUofM()"
            class="text-capitalize"
            text
          >
            Edit Whole
          </v-btn>
          <v-spacer />

          <Close class="icon" @click="unitOfMeasurmentRelationDialog = false" />
        </v-toolbar>
        <br />

        <v-card-text>
          <v-form @submit.prevent="registerUofM" ref="registerUofM">
            <v-layout v-if="registerUofMedicine">
              <v-text-field
                dense
                label="Outer Unit Of Measurment"
                outlined
                :readonly="true"
                :rules="inputRules"
                :value="getMeasurementPharmacyName(lastMedicineReUofM)"
              />
              <v-spacer />

              <v-autocomplete
                dense
                label="Inner Unit Of Measurment"
                :items="measurementsPharmacy"
                outlined
                item-text="unit"
                item-value="id"
                :rules="numberRules0andabove"
                @change="validateSimilarity($event)"
                v-model="medicineUofMRelationInfo.sub_unit_id"
              />
              <v-spacer />

              <v-text-field
                dense
                label="Quantity"
                type="number"
                outlined
                :rules="numberRules0andabove"
                v-model="medicineUofMRelationInfo.quantity"
              />
            </v-layout>

            <v-layout v-if="registerUofMedicine">
              <v-spacer />
              <v-btn
                small
                outlined
                color="green"
                class="text-capitalize"
                @click="registerUofM()"
              >
                Register
              </v-btn>
            </v-layout>
          </v-form>

          <v-data-table
            :items="medicineUofMRelationList"
            :headers="medicineUofMRelationHeaders"
          >
            <template v-slot:item.main_unit_id="{ item }">
              {{ getMeasurementPharmacyName(item.main_unit_id) }}
            </template>

            <template v-slot:item.sub_unit_id="{ item }">
              {{ getMeasurementPharmacyName(item.sub_unit_id) }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Close from "@/assets/icons/close.svg";
import Detail from "@/assets/icons/eye.svg";
import Edit from "@/assets/icons/edit.svg";
import Add from "@/assets/icons/add.svg";
import { mapActions, mapState } from "vuex";

import AccountService from "@/network/accountService";

export default {
  data() {
    return {
      login_user: AccountService.getProfile(),
      inputRules: [(v) => !!v || "This field is required"],
      numberRules0andabove: [(v) => v > 0 || "Can't be lessthan one"],

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
        { text: "Actions", value: "action", width: "15%" },
      ],

      medicineUofMRelationHeaders: [
        { text: "Main Unit", value: "main_unit_id" },
        { text: "Sub Unit", value: "sub_unit_id" },
        { text: "Quantity", value: "quantity" },
        { text: "Action", value: "action" },
      ],
      lastMedicineReUofM: 0,
      unitOfMeasurmentRelationDialog: false,
      medicineUofMRelationInfo: {},
      registerUofMedicine: false,
    };
  },

  components: {
    Close,
    Detail,
    Edit,
    Add,
  },

  computed: {
    ...mapState("pharmacy", [
      "medicineList",
      "registeredMedicine",
      "addMoredMedicine",
      "medicineCategoryList",
    ]),
    ...mapState("measurement", [
      "measurementsPharmacy",
      "medicineUofMRelationList",
    ]),
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

    ...mapActions("measurement", [
      "getMeasurementListPharmacy",
      "registerMedicineUofMRelation",
      "getMedicineUofMRelationList",
    ]),

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

    async registerUofM() {
      if (this.$refs.registerUofM.validate()) {
        this.medicineUofMRelationInfo.user_id = this.login_user.id;
        this.medicineUofMRelationInfo.main_unit_id = this.lastMedicineReUofM;
        await this.registerMedicineUofMRelation(this.medicineUofMRelationInfo);
        await this.getMedicineUofMRelationList(
          this.medicineUofMRelationInfo.medicine_id
        );
        this.unitOfMeasurmentRelationDialog = false;
      }
    },

    getMeasurementPharmacyName(id) {
      let res = "";
      for (let i = 0; i < this.measurementsPharmacy.length; i++)
        if (id === this.measurementsPharmacy[i].id) {
          res = this.measurementsPharmacy[i].unit;
          break;
        }

      return res;
    },

    validateSimilarity(selected) {
      if (selected === this.lastMedicineReUofM)
        this.medicineUofMRelationInfo.sub_unit_id = 0;

      for (let i = 0; i < this.medicineUofMRelationList.length; i++) {
        let main = this.medicineUofMRelationList[i].main_unit_id;
        let sub = this.medicineUofMRelationList[i].sub_unit_id;

        if (selected === main || selected === sub) {
          this.medicineUofMRelationInfo.sub_unit_id = 0;
          break;
        }
      }
    },

    async detialMedicine(item) {
      this.unitOfMeasurmentRelationDialog = true;
      this.medicineUofMRelationInfo.medicine_id = item.id;
      await this.getMedicineUofMRelationList(item.id);

      if (this.medicineUofMRelationList.length === 0)
        this.lastMedicineReUofM = item.unit_of_measurement;
      else {
        let len = this.medicineUofMRelationList.length - 1;
        this.lastMedicineReUofM =
          this.medicineUofMRelationList[len].sub_unit_id;
      }
    },

    async editMedicineRelationUofM() {
      alert(true);
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
