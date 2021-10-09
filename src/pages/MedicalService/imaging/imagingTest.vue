<template>
  <div class="main">
    <h3>Imaging Medical Service</h3>
    <v-card flat>
      <v-layout>
        <v-spacer></v-spacer>
        <v-btn small @click="registerImagingDialog = true" outlined
          >Add New</v-btn
        >
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <v-btn outlined small @click="$router.push({ name: 'imagingReport' })">
          Imaging Report
        </v-btn>
      </v-layout>
      <br />

      <v-data-table :items="imagingTestList" :headers="headers">
        <template v-slot:item.action="{ item }">
          <Edit class="icon" @click="editImagingTestCase(item)" />
        </template>
      </v-data-table>

      <v-dialog v-model="registerImagingDialog" persistent width="700px">
        <v-card>
          <v-toolbar color="green" dark>Add New Imaging Test </v-toolbar>
          <br />
          <v-card-text>
            <v-form @submit.prevent="save" ref="form">
              <v-layout>
                <v-flex xs12 sm1> </v-flex>
                <v-flex xs12 sm3> Title</v-flex>
                <v-flex xs12 sm8>
                  <v-text-field
                    dense
                    outlined
                    :rules="inputRules"
                    v-model="imagingInfo.title"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-flex xs12 sm1> </v-flex>
                <v-flex xs12 sm3> Price</v-flex>
                <v-flex xs12 sm8>
                  <v-text-field
                    type="number"
                    dense
                    outlined
                    v-model="imagingInfo.price"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-flex xs12 sm1> </v-flex>
                <v-flex xs12 sm3> Status</v-flex>
                <v-flex xs12 sm8>
                  <v-autocomplete
                    dense
                    :items="statusList"
                    outlined
                    v-model="imagingInfo.status"
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
                    v-model="imagingInfo.description"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-spacer></v-spacer>
                <v-btn
                  small
                  outlined
                  color="red"
                  @click="registerImagingDialog = false"
                  >Cancel</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn small outlined color="green" @click="save()">Save</v-btn>
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
import AccountService from "@/network/accountService";

export default {
  data() {
    return {
      login_user: AccountService.getProfile(),
      registerImagingDialog: false,
      statusList: [
        { text: "Active", value: 1 },
        { text: "Not Active", value: 0 },
      ],
      imagingInfo: {},
      inputRules: [(v) => !!v || "This field is required"],

      tests: [],
      headers: [
        { text: "Title", value: "title" },
        { text: "Price", value: "price" },
        { text: "Status", value: "status" },
        { text: "Description", value: "description" },
        { text: "Action", value: "action" },
      ],
    };
  },

  components: {
    Edit,
  },

  created() {
    this.loadData();
  },

  computed: {
    ...mapState("medicalService", ["registeredImaging", "imagingTestList"]),
  },

  methods: {
    ...mapActions("medicalService", ["registerImaging", "getImagingTestList"]),

    async loadData() {
      await this.getImagingTestList();
    },

    async save() {
      if (this.$refs.form.validate()) {
        this.imagingInfo.registered_by = this.login_user.id;
        await this.registerImaging(this.imagingInfo);

        if (this.registeredImaging === true) this.registerImagingDialog = false;
        else
          this.$fire({
            title: "Imaging Registeration",
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
  margin-top: 2%;
}
.icon {
  cursor: pointer;
}
</style>
