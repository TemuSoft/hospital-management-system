<template>
  <div class="main">
    <h3>Labratory Medical Service</h3>
    <v-card flat>
      <v-layout>
        <v-spacer></v-spacer>
        <v-btn
          v-show="isHead"
          class="green text-capitalize"
          small
          @click="registerLabDialog = true"
          outlined
        >
          Add New
        </v-btn>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <v-btn
          v-show="isHead"
          small
          class="green text-capitalize"
          @click="registerLabGroupDialog = true"
          outlined
        >
          Add Test Group</v-btn
        >
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <v-btn
          v-show="isHead"
          outlined
          small
          class="green text-capitalize"
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
          <v-toolbar dense color="green">
            Add New Labratory Test
            <v-spacer />
            <Close @click="registerLabDialog = false" class="icon" />
          </v-toolbar>
          <br />
          <v-card-text>
            <v-form @submit.prevent="save" ref="save">
              <v-layout>
                <v-autocomplete
                  label="Group"
                  dense
                  :items="labratoryGroup"
                  outlined
                  item-text="title"
                  item-value="id"
                  :rules="inputRules"
                  v-model="testInfo.group_id"
                  class="mr-5"
                />
                <v-spacer />

                <v-autocomplete
                  label="Stauts"
                  dense
                  :items="statusList"
                  item-text="text"
                  item-value="value"
                  outlined
                  v-model="testInfo.status"
                  class="ml-5"
                />
              </v-layout>

              <v-layout>
                <v-text-field
                  label="Type"
                  dense
                  outlined
                  :rules="inputRules"
                  v-model="testInfo.title"
                />
                <v-spacer />

                <v-text-field
                  label="Cost"
                  type="number"
                  dense
                  outlined
                  v-model="testInfo.price"
                />
              </v-layout>

              <v-text-field
                label="Description"
                dense
                outlined
                v-model="testInfo.description"
              />

              <v-layout>
                <v-spacer />
                <v-btn small color="green text-capitalize" @click="save()"
                  >Save</v-btn
                >
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="updateLabDialog" persistent width="700px">
        <v-card>
          <v-toolbar dense color="green">
            Update Labratory Test
            <v-spacer />
            <Close @click="updateLabDialog = false" class="icon" />
          </v-toolbar>
          <br />
          <v-card-text>
            <v-form @submit.prevent="update" ref="update">
              <v-layout>
                <v-autocomplete
                  label="Group"
                  dense
                  :items="labratoryGroup"
                  outlined
                  item-text="title"
                  item-value="id"
                  :rules="inputRules"
                  v-model="updateTestInfo.group_id"
                  class="mr-5"
                />
                <v-spacer />

                <v-autocomplete
                  label="Stauts"
                  dense
                  :items="statusList"
                  item-text="text"
                  item-value="value"
                  outlined
                  v-model="updateTestInfo.status"
                  class="ml-5"
                />
              </v-layout>

              <v-layout>
                <v-text-field
                  label="Type"
                  dense
                  outlined
                  :rules="inputRules"
                  v-model="updateTestInfo.title"
                />
                <v-spacer />

                <v-text-field
                  label="Cost"
                  type="number"
                  dense
                  outlined
                  v-model="updateTestInfo.price"
                />
              </v-layout>

              <v-text-field
                label="Description"
                dense
                outlined
                v-model="updateTestInfo.description"
              />

              <v-layout>
                <v-spacer />
                <v-btn small color="green text-capitalize" @click="update()"
                  >Update</v-btn
                >
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
import AccountService from "@/network/accountService";

export default {
  data() {
    return {
      login_user: AccountService.getProfile(),
      role: AccountService.getRole(),
      isHead: false,
      registerLabDialog: false,
      updateLabDialog: false,
      registerLabGroupDialog: false,
      statusList: [
        { text: "Active", value: 1 },
        { text: "Not Active", value: 0 },
      ],
      testInfo: {},
      updateTestInfo: {},
      labgroupInfo: {},
      inputRules: [(v) => !!v || "This field is required"],

      headers: [
        { text: "Name", value: "title" },
        { text: "Price", value: "price" },
        { text: "Status", value: "status" },
        { text: "Description", value: "description" },
        { text: "Group", value: "group.title" },
      ],

      labGroupHeader: [
        { text: "Number", value: "number" },
        { text: "Title", value: "title" },
        { text: "Action", value: "action" },
      ],
    };
  },

  created() {
    if (this.role === "laboratory_head") {
      this.isHead = true;
      this.headers.push({ text: "Action", value: "action" });
    }
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
      "updatedLab",
      "labratoryGroup",
      "labTestList",
    ]),
  },

  methods: {
    ...mapActions("medicalService", [
      "registerLabGroup",
      "registerLab",
      "updateLab",
      "getLabratoryGroup",
      "getLabTestList",
    ]),

    async loadData() {
      await this.getLabratoryGroup();
      await this.getLabTestList();
    },

    async save() {
      if (this.$refs.save.validate()) {
        this.testInfo.registered_by = this.login_user.id;
        await this.registerLab(this.testInfo);

        if (this.registeredLab === true) {
          this.registerLabDialog = false;
          this.loadData();
        } else
          this.$fire({
            title: "Lab Test Case Registeration",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    async update() {
      if (this.$refs.update.validate()) {
        this.updateTestInfo.registered_by = this.login_user.id;
        await this.updateLab(this.updateTestInfo);

        if (this.updatedLab === true) {
          this.updateLabDialog = false;
          this.loadData();
        } else
          this.$fire({
            title: "Lab Test Case Update",
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
          this.loadData();
        } else
          this.$fire({
            title: "Lab group Registeration",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    async editLabTestCase(item) {
      this.updateTestInfo = item;
      this.updateLabDialog = true;
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
