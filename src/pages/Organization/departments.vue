<template>
  <div class="main">
    <v-data-table :headers="headers" :items="departments" :search="search">
      <template v-slot:item.action="{ item }">
        <Edit @click="editDepartment(item)" class="icon" />
        &nbsp;&nbsp;&nbsp;
        <Detail @click="detailDepartment(item)" class="icon" />
        &nbsp;&nbsp;&nbsp;

        <Delete @click="deleteDeprtment(item)" class="icon" />
      </template>

      <template v-slot:top>
        <v-layout>
          <h3>Departments</h3>
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
            @click="registerDepaDialog = true"
            small
            outlined
            prepend-icon="mdi-plus"
          >
            <v-icon left>mdi-plus</v-icon>Add New
          </v-btn>
        </v-layout>
      </template>
    </v-data-table>

    <v-dialog dense v-model="registerDepaDialog" persistent width="700px">
      <v-card>
        <v-toolbar color="green" dark>Add New Departments </v-toolbar>
        <br />
        <v-card-text>
          <v-form @submit.prevent="save" ref="form">
            <v-layout>
              <v-flex xs12 sm1> </v-flex>
              <v-flex xs12 sm3> Name</v-flex>
              <v-flex xs12 sm8>
                <v-text-field
                  :rules="inputRules"
                  dense
                  outlined
                  v-model="depertmentInfo.name"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs12 sm1> </v-flex>
              <v-flex xs12 sm3> Status</v-flex>
              <v-flex xs12 sm8>
                <v-autocomplete
                  dense
                  :rules="inputRules"
                  :items="statusList"
                  item-text="name"
                  item-id="value"
                  outlined
                  v-model="depertmentInfo.status"
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
                  :rules="inputRules"
                  v-model="depertmentInfo.description"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-spacer></v-spacer>
              <v-btn
                small
                outlined
                color="red"
                @click="registerDepaDialog = false"
                >Cancel</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn small outlined color="green" @click="save()">Save</v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog dense v-model="updateDepaDialog" persistent width="700px">
      <v-card>
        <v-toolbar color="green" dark>Update Departments </v-toolbar>
        <br />
        <v-card-text>
          <v-form @submit.prevent="update" ref="update">
            <v-layout>
              <v-flex xs12 sm1> </v-flex>
              <v-flex xs12 sm3> Name</v-flex>
              <v-flex xs12 sm8>
                <v-text-field
                  :rules="inputRules"
                  dense
                  outlined
                  v-model="updateDepertmentInfo.name"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs12 sm1> </v-flex>
              <v-flex xs12 sm3> Status</v-flex>
              <v-flex xs12 sm8>
                <v-autocomplete
                  dense
                  :rules="inputRules"
                  :items="statusList"
                  item-text="name"
                  item-id="value"
                  outlined
                  v-model="updateDepertmentInfo.status"
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
                  :rules="inputRules"
                  v-model="updateDepertmentInfo.description"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-spacer></v-spacer>
              <v-btn
                small
                outlined
                color="red"
                @click="updateDepaDialog = false"
                >Cancel</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn small outlined color="green" @click="update()"
                >Update</v-btn
              >
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
import Detail from "@/assets/icons/eye.svg";
import Delete from "@/assets/icons/delete.svg";

export default {
  data() {
    return {
      login_user: { id: 4, name: "Temesgen Kefie", role: "Nurse" },
      registerDepaDialog: false,
      updateDepaDialog: false,
      depertmentInfo: {},
      updateDepertmentInfo: {},
      inputRules: [(v) => !!v || "This field is required"],

      statusList: [
        { name: "Active", value: 1 },
        { name: "Not Active", value: 0 },
      ],
      headers: [
        { text: "Name", value: "name" },
        { text: "Description", value: "description" },
        { text: "Status", value: "status" },
        { text: "Created Date", value: "created_date" },
        { text: "Action", value: "action" },
      ],
    };
  },

  components: { Edit, Detail, Delete },

  computed: {
    ...mapState("department", [
      "registeredDeprtment",
      "updatedDeprtment",
      "departments",
    ]),
  },

  created() {
    this.loadData();
  },

  methods: {
    ...mapActions("department", [
      "registerDepartment",
      "updateDeprtment",
      "getDepartmentList",
    ]),

    async loadData() {
      await this.getDepartmentList();
    },

    async save() {
      if (this.$refs.form.validate()) {
        this.depertmentInfo.created_by = this.login_user.id;
        await this.registerDepartment(this.depertmentInfo);

        if (this.registeredDeprtment === true) {
          this.registerDepaDialog = false;
          this.loadData();
          this.depertmentInfo = {};
        } else
          this.$fire({
            title: "Department Registeration",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    async update() {
      if (this.$refs.update.validate()) {
        await this.updateDeprtment(this.updateDepertmentInfo);

        if (this.updatedDeprtment === true) {
          this.updateDepaDialog = false;
          this.loadData();
          this.depertmentInfo = {};
        } else
          this.$fire({
            title: "Department Info Update",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    async editDepartment(item) {
      this.updateDepertmentInfo = item;
      this.updateDepaDialog = true;
    },
  },
};
</script>

<style scoped>
.main {
  margin: 7%;
  margin-top: 2%;
}
.icon {
  cursor: pointer;
}
</style>
