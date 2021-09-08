<template>
  <div class="main">
    <h2>Issue</h2>

    <br />
    <v-layout class="mainCardView">
      <v-card outlined class="issueCard">
        <h3>Rejected</h3>
        <p>20</p>
      </v-card>
      <v-spacer></v-spacer>

      <v-card outlined class="issueCard">
        <h3>Approved</h3>
        <p>20</p>
      </v-card>
      <v-spacer></v-spacer>

      <v-card outlined class="issueCard">
        <h3>Pendding</h3>
        <p>20</p>
      </v-card>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
    </v-layout>

    <v-data-table
      :items="issues"
      :headers="headersIssue"
      items-per-page="10"
      dense
    >
      <template v-slot:top>
        <v-layout>
          <v-spacer></v-spacer>
          <v-btn small text outlined @click="sendIssueRequestDialog = true">
            Send Requst
          </v-btn>
        </v-layout>
      </template>

      <template v-slot:item.action="{}">
        <Edit class="icon" />
        <v-btn small text color="yellow">Approval</v-btn>
        <v-btn small text color="green">Approved</v-btn>
        <v-btn small text color="red">Rejected</v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="sendIssueRequestDialog" width="800px" persistent>
      <v-card flat>
        <v-toolbar dense color="green">
          Create New Item Issue Request
          <v-spacer />

          <Close @click="confirmIssueRequestDialog = false" class="icon" />
        </v-toolbar>
        <br />

        <v-card-text>
          <v-form @submit.prevent="save" ref="save">
            <v-layout>
              <v-textarea
                dense
                label="Reason"
                v-model="issueInfo.reason"
                :rules="inputRules"
                outlined
              ></v-textarea>
            </v-layout>

            <v-layout>
              <v-autocomplete
                :items="inventorys"
                item-text="name"
                item-value="id"
                outlined
                dense
                @click="loadInventoryItems($event)"
                label="Inventory"
              />
              <v-spacer></v-spacer>

              <v-autocomplete
                :items="inventotyItems"
                item-text="name"
                item-value="id"
                outlined
                dense
                label="Item"
                return-object
                multiple
                chips
                v-model="itemSelected"
              />
              <v-spacer></v-spacer>

              <v-btn small text outlined @click="addIssuedItems()">Add</v-btn>
            </v-layout>

            <table>
              <tr>
                <th>Inventory</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Aveliable</th>
                <th>Action</th>
              </tr>
              inventory name quantity aveliable action
              <tr v-for="(item, i) in itemsIssue" :key="i">
                <td>{{ itemsIssue[i].inventory }}</td>
                <td>{{ itemsIssue[i].itemName }}</td>
                <td>{{ itemsIssue[i].quantity }}</td>
                <td>
                  <v-text-field
                    dense
                    rounded
                    :rules="inputRules"
                    v-model="itemsIssue[i].avaliabel"
                  />
                </td>
                <td>
                  <Delete class="icon" @click="deleteSelectedIssueItem(i)" />
                </td>
              </tr>
            </table>

            <v-layout>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-btn small text outlined @click="sendIssueRequestDialog = false"
                >Cancel</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn small text outlined @click="save()">Save</v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="confirmIssueRequestDialog" width="800px" persistent>
      <v-card flat>
        <v-toolbar dense color="green">
          Approval Item Issue Request
          <v-spacer />

          <Close @click="confirmIssueRequestDialog = false" class="icon" />
        </v-toolbar>
        <br />

        <v-card-text>
          <v-form @submit.prevent="confirm" ref="confirm">
            <v-layout>
              <v-textarea
                dense
                label="Reason"
                v-model="issueInfo.reason"
                :rules="inputRules"
                outlined
                :readonly="true"
              ></v-textarea>
            </v-layout>

            <v-layout>
              <v-autocomplete
                :items="inventorys"
                item-text="name"
                item-value="id"
                outlined
                dense
                :readonly="true"
                label="Inventory"
              />
              <v-spacer></v-spacer>

              <v-autocomplete
                :items="inventotyItems"
                item-text="name"
                item-value="id"
                outlined
                dense
                label="Item"
                chips
                :readonly="true"
              />
            </v-layout>

            <v-data-table
              dense
              :items="itemsIssue"
              :headers="headersItems"
              items-per-page="10"
            ></v-data-table>

            <v-layout v-if="true">
              <v-autocomplete
                v-model="approvalSelected"
                dense
                outlined
                label="Approval"
                :items="['Approve', 'Reject']"
              />
            </v-layout>

            <v-layout v-else>
              <v-text-field
                type="password"
                outlined
                dense
                v-model="whoConfrim"
                label="Giver password"
              />
              <v-spacer />

              <v-text-field
                type="password"
                outlined
                dense
                v-model="whoReceived"
                label="Receiver password"
              />
            </v-layout>

            <v-layout>
              <v-spacer></v-spacer>
              <v-btn small text outlined @click="confirm()">Confirm</v-btn>
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
import Close from "@/assets/icons/close.svg";
import Delete from "@/assets/icons/delete.svg";

export default {
  data() {
    return {
      confirmIssueRequestDialog: true,
      sendIssueRequestDialog: false,
      approvalSelected: "Approve",

      inputRules: [(v) => !!v || "This field is required"],

      itemSelected: [],
      issueInfo: {},
      itemsIssue: [],

      headersIssue: [
        { text: "Inventory", value: "inventory" },
        { text: "Name", value: "name" },
        { text: "Quantity", value: "quantity" },
        { text: "Status", value: "status" },
        { text: "Detail", value: "detail", width: "10%" },
      ],
    };
  },

  components: {
    Edit,
    Close,
    Delete,
  },

  created() {
    this.loadData();
  },

  computed: {
    ...mapState("inventory", ["inventorys"]),
    ...mapState("items", ["inventotyItems"]),
    ...mapState("issue", ["sendIssuedRequest", "issues"]),
  },

  methods: {
    ...mapActions("inventory", ["loadInventoryList"]),
    ...mapActions("item", ["getInventoryItems"]),
    ...mapActions("issue", ["sendIssueRequest", "loadIssueRequest"]),

    async loadData() {
      await this.loadInventoryList();
      await this.loadIssueRequest();
    },

    async loadInventoryItems(id) {
      await this.getInventoryItems(id);
    },

    async deleteSelectedIssueItem(i) {
      this.itemsIssue.splice(i, 1);
    },

    async addIssuedItems() {
      for (let i = 0; i < this.itemSelected.length; i++) {
        let exist = 0;
        for (let j = 0; j < this.itemsIssue.length; j++) {
          if (this.itemsIssue[j].id === this.itemSelected[i].id) {
            exist = 1;
            break;
          } else exist = 0;
        }

        if (exist === 0) this.itemsIssue.push(this.itemSelected[i]);
      }
    },

    async save() {
      if (this.$refs.save.validate()) {
        await this.sendIssueRequest(this.itemsIssue);

        if (this.sendIssuedRequest === true) {
          this.sendIssueRequestDialog = false;
          await this.loadData();
        } else
          this.$fire({
            title: "Item Issueing Request",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    async confirm() {},
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

.issueCard {
  padding: 10px;
  padding-left: 30px;
  padding-right: 30px;
  width: 19%;
}

.mainCardView {
  margin-left: 5%;
}
</style>
