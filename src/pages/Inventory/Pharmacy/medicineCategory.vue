<template>
  <div class="main">
    <h3>Medicines Category</h3>

    <v-data-table
      dense
      :headers="headers"
      :items="medicineCategoryList"
      :search="search"
    >
      <template v-slot:item.action="{ item }">
        <Detail class="icon" @click="detialMedicineCategory(item)" />

        <Edit
          class="icon"
          style="margin-left: 30px"
          @click="editMedicineCategory(item)"
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
          />
          <v-spacer />
          <v-btn
            small
            text
            outlined
            color="green"
            @click="addMedicineCategoryDialog = true"
          >
            Add New
          </v-btn>
        </v-layout>
        <br />
      </template>
    </v-data-table>

    <v-dialog v-model="addMedicineCategoryDialog" persistent width="700px">
      <v-card>
        <v-toolbar dense color="green">
          Add New Medicine Category
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
                v-model="medicineCategoryInfo.name"
                :rules="inputRules"
              />
            </v-layout>

            <v-layout>
              <v-autocomplete
                label="Unit Of Measurement"
                dense
                outlined
                :items="measurements"
                v-model="medicineCategoryInfo.uofm"
                :rules="inputRules"
              />
            </v-layout>

            <v-layout>
              <v-textarea
                label="Description"
                rows="2"
                dense
                outlined
                v-model="medicineCategoryInfo.description"
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

      addMedicineCategoryDialog: false,
      medicineCategoryInfo: {},

      search: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Description", value: "description" },
        { text: "Unit Of Measurment", value: "uofm" },
        { text: "Action", value: "action" },
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
      "registeredMedicineCategory",
      "medicineCategoryList",
    ]),
    ...mapState("measurement", ["measurements"]),
  },

  methods: {
    ...mapActions("pharmacy", [
      "registerMedicineCategory",
      "getMedicineCategory",
    ]),
    ...mapActions("measurement", ["getMeasurementList"]),

    async loadData() {
      await this.getMedicineCategory();
      await this.getMeasurementList();
    },

    async closeDialog() {
      this.addMedicineCategoryDialog = false;
    },

    async save() {
      if (this.$refs.save.validate()) {
        await this.registerMedicine(this.medicineCategoryInfo);

        if (this.registeredMedicineCategory === true) {
          this.addMedicineDialogCategory = false;
          this.loadData();
        } else
          this.$fire({
            title: "Medicine Category Registeration",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    async detialMedicineCategory(item) {
      alert(item.id);
    },

    async editMedicineCategory(item) {
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
