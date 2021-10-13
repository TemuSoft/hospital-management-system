<template>
  <div class="main">
    <h2>Issue</h2>

    <br />

    <v-tabs v-model="tab" align-with-title>
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab
        v-for="item in tabData"
        :key="item"
        class="text-capitalize"
        @click.stop="handleTabNavigation(item.id)"
        >{{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabData" :key="item">
        <div v-if="item.id === 1">
          <v-layout>
            <v-spacer />
            <v-btn
              small
              text
              color="green"
              class="text-capitalize"
              outlined
              @click="sendIssueRequestDialog = true"
            >
              Send Requst
            </v-btn>
          </v-layout>

          <v-data-table :items="issuesPersonal" :headers="headersIssue" dense>
            <template v-slot:item.request_date="{ item }">
              {{ new Date(item.request_date).toDateString().substr(0, 50) }}
            </template>

            <template v-slot:item.department="{ item }">
              {{ getDeprtmentName(item.department) }}
            </template>

            <template v-slot:item.quantity="{ item }">
              {{ getTotalIssedQuantity(item.issue_items) }}
            </template>

            <template v-slot:item.detail="{ item }">
              <v-layout justify-center v-if="item.status === 0">
                Pendding
              </v-layout>

              <v-layout justify-center v-else>
                <v-btn
                  small
                  text
                  color="green"
                  class="text-capitalize"
                  @click="detailIsseRequest(item)"
                >
                  Detail
                </v-btn>
              </v-layout>
            </template>
          </v-data-table>
        </div>
        <div v-if="item.id === 2">
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
          <br />
          <br />

          <v-data-table :items="issues" :headers="headersIssue" dense>
            <template v-slot:item.request_date="{ item }">
              {{ new Date(item.request_date).toDateString().substr(0, 50) }}
            </template>

            <template v-slot:item.department="{ item }">
              {{ getDeprtmentName(item.department) }}
            </template>

            <template v-slot:item.quantity="{ item }">
              {{ getTotalIssedQuantity(item.issue_items) }}
            </template>

            <template v-slot:item.detail="{ item }">
              <v-layout justify-center v-if="item.status === 0">
                <Edit class="icon" />
                <v-btn
                  class="ml-5 text-capitalize"
                  small
                  text
                  color="blue"
                  @click="confirmIsseRequest(item)"
                >
                  Approval
                </v-btn>
              </v-layout>
            </template>
          </v-data-table>
        </div>
      </v-tab-item>
    </v-tabs-items>

    <v-dialog v-model="sendIssueRequestDialog" width="1000px" persistent>
      <v-card flat>
        <v-toolbar dense color="green">
          Create New Item Issue Request
          <v-spacer />

          <Close @click="sendIssueRequestDialog = false" class="icon" />
        </v-toolbar>
        <br />

        <v-card-text>
          <v-form @submit.prevent="sendRequest" ref="sendRequest">
            <v-layout>
              <v-textarea
                dense
                rows="1"
                label="Reason"
                v-model="issueInfo.reason"
                :rules="inputRules"
                outlined
              />
            </v-layout>

            <v-layout>
              <v-autocomplete
                :items="inventorys"
                item-text="name"
                item-value="id"
                outlined
                dense
                @change="loadInventoryItems($event)"
                label="Inventory"
              />
              <v-spacer />

              <v-autocomplete
                :items="itemsInventory"
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
            </v-layout>

            <v-layout>
              <v-btn
                class="text-capitalize"
                small
                text
                color="green"
                outlined
                @click="addIssuedItems()"
              >
                Add
              </v-btn>
            </v-layout>
            <br />

            <v-data-table
              dense
              :items="itemsIssue"
              :headers="issueItemsHeadres"
            >
              <template v-slot:item.inventory_id="{ item }">
                {{ getInventoryName(item.inventory_id) }}
              </template>

              <template v-slot:item.uofm="{ item }">
                {{ getUnitOfMeasurment(item.uofm) }}
              </template>

              <template v-slot:item.quantity="{ item }">
                <v-edit-dialog
                  :return-value.sync="item.quantity"
                  @save="save"
                  @cancel="cancel"
                  @open="open"
                  @close="close"
                  large
                >
                  {{ item.quantity }}
                  <template v-slot:input>
                    <v-text-field
                      @change="validateInput(item)"
                      v-model="item.quantity"
                      :rules="numberRules"
                      type="number"
                      label="Edit"
                      single-line
                    />
                  </template>
                </v-edit-dialog>
              </template>

              <template v-slot:item.action="{ item }">
                <Delete class="icon" @click="deleteSelectedIssueItem(item)" />
              </template>
            </v-data-table>

            <v-layout>
              <v-spacer />
              <v-btn small text outlined color="green" @click="sendRequest()">
                Send Request
              </v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="confirmIssueRequestDialog" width="900px" persistent>
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
                rows="3"
                label="Reason"
                v-model="selectedIssueRequest.reason"
                :rules="inputRules"
                outlined
                :readonly="true"
              />
            </v-layout>

            <v-data-table
              dense
              :items="selectedIssueRequest.issue_items"
              :headers="headersIssueApproval"
              :items-per-page="10"
            >
              <template v-slot:item.inventory_id="{ item }">
                {{ getInventoryName(item.item_detail.inventory_id) }}
              </template>

              <template v-slot:item.uofm="{ item }">
                {{ getUnitOfMeasurment(item.item_detail.uofm) }}
              </template>

              <template v-slot:item.accepted_quantity="{ item }">
                <v-edit-dialog
                  :return-value.sync="item.accepted_quantity"
                  @save="save"
                  @cancel="cancel"
                  @open="open"
                  @close="close"
                  large
                >
                  {{ item.accepted_quantity }}
                  <template v-slot:input>
                    <v-text-field
                      @change="validateInputConfirm(item)"
                      v-model="item.accepted_quantity"
                      :rules="numberRules0andabove"
                      type="number"
                      label="Edit"
                      single-line
                    />
                  </template>
                </v-edit-dialog>
              </template>
            </v-data-table>

            <v-layout>
              <v-select
                v-model="approvalSelected"
                dense
                outlined
                @change="approvalTypeSelected"
                label="Approval"
                :items="['Approve', 'Reject']"
              />
            </v-layout>

            <v-layout>
              <v-text-field
                type="password"
                outlined
                dense
                v-model="whoConfrim"
                :rules="inputRules"
                label="Giver password"
              />
              <v-spacer />

              <v-text-field
                type="password"
                outlined
                dense
                v-model="whoReceived"
                :rules="inputRules"
                label="Receiver password"
              />
            </v-layout>

            <v-layout>
              <v-spacer></v-spacer>
              <v-btn
                small
                outlined
                @click="confirm()"
                color="green"
                class="text-capitailze"
              >
                Confirm
              </v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="detailIssueRequestDialog" width="900px" persistent>
      <v-card flat>
        <v-toolbar dense color="green">
          Approved Item Issue Request
          <v-spacer />

          <Close @click="detailIssueRequestDialog = false" class="icon" />
        </v-toolbar>
        <br />

        <v-card-text>
          <v-form @submit.prevent="confirm" ref="confirm">
            <v-layout>
              <v-textarea
                dense
                rows="3"
                label="Reason"
                v-model="selectedIssueRequestDetail.reason"
                :rules="inputRules"
                outlined
                :readonly="true"
              />
            </v-layout>

            <v-data-table
              dense
              :items="selectedIssueRequestDetail.issue_items"
              :headers="headersIssueApproval"
              :items-per-page="10"
            >
              <template v-slot:item.inventory_id="{ item }">
                {{ getInventoryName(item.item_detail.inventory_id) }}
              </template>

              <template v-slot:item.uofm="{ item }">
                {{ getUnitOfMeasurment(item.item_detail.uofm) }}
              </template>
            </v-data-table>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Edit from "@/assets/icons/edit.svg";
import Close from "@/assets/icons/close.svg";
import Delete from "@/assets/icons/delete.svg";
import AccountService from "@/network/accountService";

export default {
  data() {
    return {
      login_user: AccountService.getProfile(),
      tab: null,

      detailIssueRequestDialog: false,
      confirmIssueRequestDialog: false,
      sendIssueRequestDialog: false,
      approvalSelected: "Approve",

      inputRules: [(v) => !!v || "This field is required"],
      numberRules: [(v) => (v > 0 && !!v) || "Can't be lessthan one"],
      numberRules0andabove: [(v) => v >= 0 || "Can't be lessthan one"],

      itemSelected: [],
      issueInfo: {},
      itemsIssue: [],

      headersIssue: [
        { text: "Request Date", value: "request_date" },
        { text: "Name", value: "name" },
        { text: "Department", value: "department" },
        { text: "Quantity", value: "quantity" },
        { text: "Detail", value: "detail", width: "15%", align: "center" },
      ],

      issueItemsHeadres: [
        { text: "Inventory", value: "inventory_id" },
        { text: "Item", value: "name" },
        { text: "UofM", value: "uofm" },
        { text: "Avaliable", value: "available_quantity" },
        { text: "Quantity", value: "quantity" },
        { text: "Action", value: "action" },
      ],

      headersIssueApproval: [
        { text: "Inventory", value: "inventory_id" },
        { text: "Item", value: "item_detail.name" },
        { text: "UofM", value: "uofm" },
        { text: "Avaliable", value: "item_detail.available_quantity" },
        {
          text: "Reserved",
          value: "item_detail.temporarily_reserved_quanitity",
        },
        { text: "Requested", value: "quantity" },
        { text: "Approved", value: "accepted_quantity" },
      ],

      selectedIssueRequest: {},
      selectedIssueRequestDetail: {},

      tabData: [],
    };
  },

  components: {
    Edit,
    Close,
    Delete,
  },

  created() {
    this.loadData();

    let role = AccountService.getRole();
    this.tabData.push({ id: 1, tab: "Personal Issue" });
    if (role === "store") this.tabData.push({ id: 2, tab: "Requests" });
  },

  computed: {
    ...mapState("inventory", ["inventorys"]),
    ...mapState("item", ["itemsInventory"]),
    ...mapState("issue", [
      "sendIssuedRequest",
      "issues",
      "issuesPersonal",
      "confirmIssuedRequest",
    ]),
    ...mapState("measurement", ["measurements"]),
    ...mapState("department", ["departments"]),
  },

  methods: {
    ...mapActions("inventory", ["loadInventoryList"]),
    ...mapActions("item", ["loadItemListInventory"]),
    ...mapActions("issue", [
      "sendIssueRequest",
      "loadIssueRequest",
      "getIssuesPersonal",
      "confirmIssueRequest",
    ]),
    ...mapActions("measurement", ["getMeasurementList"]),
    ...mapActions("department", ["getDepartmentList"]),

    async loadData() {
      await this.loadInventoryList();
      await this.getMeasurementList();
      await this.loadIssueRequest();
      await this.getDepartmentList();
      await this.getIssuesPersonal(this.login_user.id);
    },

    async loadInventoryItems(id) {
      await this.loadItemListInventory(id);
    },

    async validateInput(item) {
      let index = this.itemsIssue.indexOf(item);
      let qua = parseFloat(item.quantity);
      let ava = parseFloat(item.available_quantity);
      let temp = parseFloat(item.temporarily_reserved_quanitity);

      if (qua > ava - temp || qua < 0) this.itemsIssue[index].quantity = 0;
    },

    async validateInputConfirm(item) {
      let index = this.selectedIssueRequest.issue_items.indexOf(item);
      let acc = parseFloat(item.accepted_quantity);
      let qu = parseFloat(item.quantity);

      if (acc < 0 || acc > qu)
        this.selectedIssueRequest.issue_items[index].accepted_quantity = 0;
    },

    async deleteSelectedIssueItem(item) {
      let index = this.itemsIssue.indexOf(item);
      this.itemsIssue.splice(index, 1);
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

    getUnitOfMeasurment(uofmId) {
      let res = "";
      for (let i = 0; i < this.measurements.length; i++)
        if (uofmId === this.measurements[i].id) {
          res = this.measurements[i].unit;
          break;
        }
      return res;
    },

    getDeprtmentName(department) {
      let res = "";
      for (let i = 0; i < this.departments.length; i++)
        if (this.departments[i].id === department) {
          res = this.departments[i].name;
          break;
        }

      return res;
    },

    getInventoryName(inventory_id) {
      let res = "";
      for (let i = 0; i < this.inventorys.length; i++)
        if (inventory_id === this.inventorys[i].id) {
          res = this.inventorys[i].name;
        }

      return res;
    },

    getTotalIssedQuantity(data) {
      let total = 0;
      for (let i = 0; i < data.length; i++)
        total += parseFloat(data[i].quantity);

      return total;
    },

    async sendRequest() {
      if (this.$refs.sendRequest.validate()) {
        this.issueInfo.user_id = this.login_user.id;
        this.issueInfo.items = [];

        let allValid = true;
        for (let i = 0; i < this.itemsIssue.length; i++) {
          if (this.itemsIssue[i].quantity === 0) allValid = false;

          this.issueInfo.items.push({
            item_id: this.itemsIssue[i].id,
            quantity: this.itemsIssue[i].quantity,
          });
        }

        if (allValid) {
          await this.sendIssueRequest(this.issueInfo);

          if (this.sendIssuedRequest.st === true) {
            this.sendIssueRequestDialog = false;
            await this.loadData();
          } else
            this.$fire({
              title: "Item Issueing Request",
              text: this.sendIssuedRequest.msg + "!!!",
              type: "error",
              timer: 7000,
            });
        } else
          this.$fire({
            title: "Item Issueing Request",
            text: "Quantity requsted input is not valid!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    approvalTypeSelected(type) {
      if (type === "Reject") {
        for (let i = 0; i < this.selectedIssueRequest.issue_items.length; i++)
          this.selectedIssueRequest.issue_items[i].accepted_quantity = 0;
      }
    },

    async confirm() {
      this.approvalTypeSelected(this.approvalSelected);
      if (this.$refs.confirm.validate()) {
        let data = {
          store_user_id: this.login_user.id,
          issue_id: this.selectedIssueRequest.id,
          items: [],
        };

        let t = this.selectedIssueRequest.issue_items;
        for (let i = 0; i < t.length; i++)
          data.items.push({
            id: t[i].id,
            accepted_quantity: t[i].accepted_quantity,
          });

        await this.confirmIssueRequest(data);

        if (this.confirmIssuedRequest.st === true) {
          this.selectedIssueRequest = {};
          this.confirmIssueRequestDialog = false;
          this.loadData();
        } else
          this.$fire({
            title: "Confrom Issueing Request",
            text: this.confirmIssueRequest.smg + "!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    async confirmIsseRequest(item) {
      this.selectedIssueRequest = item;
      this.confirmIssueRequestDialog = true;
    },

    async detailIsseRequest(item) {
      this.selectedIssueRequestDetail = item;
      this.detailIssueRequestDialog = true;
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

.issueCard {
  padding: 10px;
  padding-left: 30px;
  padding-right: 30px;
  width: 19%;
}

.mainCardView {
  margin-left: 5%;
}

table {
  width: 100%;
}
</style>
