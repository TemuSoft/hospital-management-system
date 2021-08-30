<template>
  <div class="main">
    <h3>Labratory Medical Service</h3>
    <v-card flat>
      <v-layout>
        <v-spacer></v-spacer>
        <v-btn small @click="registerLabDialog = true" outlined>Add New</v-btn>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <v-btn small @click="registerLabGroupDialog = true" outlined
          >Register Test Group</v-btn
        >
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <v-btn
          outlined
          small
          @click="$router.push({ name: 'labratoryReport' })"
        >
          Labratory Report
        </v-btn>
      </v-layout>
      <br />

      <v-data-table :items="labTestList" :headers="headers">
        <template v-slot:item.action="{ item }">
          <Edit class="icon" @click="editLabTestCase(item)" />
        </template>
      </v-data-table>

      <v-dialog v-model="registerLabDialog" persistent width="700px">
        <v-card>
          <v-toolbar color="green" dark>Add New Labratory Test </v-toolbar>
          <br />
          <v-card-text>
            <v-form @submit.prevent="save" ref="form">
              <v-layout>
                <v-flex xs12 sm1> </v-flex>
                <v-flex xs12 sm3> Group</v-flex>
                <v-flex xs12 sm8>
                  <v-autocomplete
                    dense
                    :items="labratoryGroup"
                    outlined
                    item-text="title"
                    item-value="id"
                    :rules="inputRules"
                    v-model="testInfo.group_id"
                  ></v-autocomplete>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-flex xs12 sm1> </v-flex>
                <v-flex xs12 sm3> Type</v-flex>
                <v-flex xs12 sm8>
                  <v-text-field
                    dense
                    outlined
                    :rules="inputRules"
                    v-model="testInfo.title"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-flex xs12 sm1> </v-flex>
                <v-flex xs12 sm3> Cost</v-flex>
                <v-flex xs12 sm8>
                  <v-text-field
                    type="number"
                    dense
                    outlined
                    v-model="testInfo.price"
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
                    item-text="text"
                    item-value="value"
                    outlined
                    v-model="testInfo.status"
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
                    v-model="testInfo.description"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-spacer></v-spacer>
                <v-btn
                  small
                  outlined
                  color="red"
                  @click="registerLabDialog = false"
                  >Cancel</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn small outlined color="green" @click="save()">Save</v-btn>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="registerLabGroupDialog" persistent width="500px">
        <v-card>
          <v-toolbar dense color="green">
            Register Labratory Group
            <v-spacer />

            <Close @click="registerLabGroupDialog = false" class="icon" />
          </v-toolbar>
          <br />
          <br />

          <v-card-text>
            <v-form @submit.prevent="saveGroup" ref="saveGroup">
              <v-layout>
                <v-flex xs12 sm1> </v-flex>
                <v-flex xs12 sm3> Title</v-flex>
                <v-flex xs12 sm8>
                  <v-text-field
                    dense
                    outlined
                    :rules="inputRules"
                    v-model="labgroupInfo.title"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-spacer />
                <v-btn small outlined color="green" @click="saveGroup()">
                  Save
                </v-btn>
              </v-layout>
            </v-form>

            <v-data-table :items="labratoryGroup" :headers="labGroupHeader">
              <template v-slot:item.number="{ item }">
                {{ labratoryGroup.indexOf(item) + 1 }}
              </template>

              <template v-slot:item.action="{ item }">
                <Edit @click="editLabTestGroup(item)" class="icon" />
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Edit from "@/assets/icons/edit.svg";
import Close from "@/assets/icons/close.svg";

export default {
  data() {
    return {
      login_user: { id: 4, name: "Temesgen Kefie", role: "Nurse" },
      registerLabDialog: false,
      registerLabGroupDialog: false,
      statusList: [
        { text: "Active", value: 1 },
        { text: "Not Active", value: 0 },
      ],
      testInfo: {},
      labgroupInfo: {},
      inputRules: [(v) => !!v || "This field is required"],

      headers: [
        { text: "Name", value: "title" },
        { text: "Price", value: "price" },
        { text: "Status", value: "status" },
        { text: "Description", value: "description" },
        { text: "Group", value: "group.title" },
        { text: "Action", value: "action" },
      ],

      labGroupHeader: [
        { text: "Number", value: "number" },
        { text: "Title", value: "title" },
        { text: "Action", value: "action" },
      ],
    };
  },

  created() {
    this.loadData();
  },

  components: {
    Edit,
    Close,
  },

  computed: {
    ...mapState("medicalService", [
      "registeredLabGroup",
      "registeredLab",
      "labratoryGroup",
      "labTestList",
    ]),
  },

  methods: {
    ...mapActions("medicalService", [
      "registerLabGroup",
      "registerLab",
      "getLabratoryGroup",
      "getLabTestList",
    ]),

    async loadData() {
      this.labgroupInfo.created_by = "Temesegn";
      this.testInfo.created_by = "Temesgen";
      await this.getLabratoryGroup();
      await this.getLabTestList();
    },

    async save() {
      if (this.$refs.form.validate()) {
        this.testInfo.registered_by = this.login_user.id;
        await this.registerLab(this.testInfo);

        if (this.registeredLab === true) this.registerLabDialog = false;
        else
          this.$fire({
            title: "Lab Text Case Registeration",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    async saveGroup() {
      if (this.$refs.saveGroup.validate()) {
        this.labgroupInfo.registered_by = this.login_user.id;
        await this.registerLabGroup(this.labgroupInfo);

        if (this.registeredLabGroup === true) {
          await this.getLabratoryGroup();
          this.labgroupInfo = {};
        } else
          this.$fire({
            title: "Lab group Registeration",
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
