<template>
  <div class="main">
    <h3>Medicines Group</h3>

    <v-data-table
      dense
      :headers="headers"
      :items="medicineGroupList"
      :search="search"
    >
      <template v-slot:item.action="{ item }">
        <Detail class="icon" @click="detialMedicineGroup(item)" />

        <Edit
          class="icon"
          style="margin-left: 30px"
          @click="editMedicineGroup(item)"
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
            @click="addMedicineGroupDialog = true"
          >
            Add New
          </v-btn>
        </v-layout>
        <br />
      </template>
    </v-data-table>

    <v-dialog v-model="addMedicineGroupDialog" persistent width="700px">
      <v-card>
        <v-toolbar dense color="green">
          Add New Medicine Group
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
                v-model="medicineGroupInfo.name"
                :rules="inputRules"
              />
            </v-layout>

            <v-layout>
              <v-textarea
                label="Description"
                rows="2"
                dense
                outlined
                v-model="medicineGroupInfo.description"
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

      addMedicineGroupDialog: false,
      medicineGroupInfo: {},

      search: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Description", value: "description" },
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
    ...mapState("pharmacy", ["registeredMedicineGroup", "medicineGroupList"]),
  },

  methods: {
    ...mapActions("pharmacy", ["registerMedicineGroup", "getMedicineGroup"]),

    async loadData() {
      await this.getMedicineGroup();
    },

    async closeDialog() {
      this.addMedicineGroupDialog = false;
    },

    async save() {
      if (this.$refs.save.validate()) {
        await this.registerMedicine(this.medicineGroupInfo);

        if (this.registeredMedicineGroup === true) {
          this.addMedicineDialogGroup = false;
          this.loadData();
        } else
          this.$fire({
            title: "Medicine Group Registeration",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    async detialMedicineGroup(item) {
      alert(item.id);
    },

    async editMedicineGroup(item) {
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
