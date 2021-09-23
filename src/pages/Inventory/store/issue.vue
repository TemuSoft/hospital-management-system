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
          <v-btn small text outlined @click="sendIssueRequestDialog = true"
            >Send Requst</v-btn
          >
        </v-layout>
      </template>
    </v-data-table>

    <v-dialog v-model="sendIssueRequestDialog" width="800px" persistent>
      <v-card flat>
        <v-toolbar color="green">Create New Item Issue Request</v-toolbar>
        <br />

        <v-card-text>
          <v-form @submit.prevent="save" ref="save">
            <v-layout>
              <v-textarea
                dense
                label="Reason"
                v-model="item.reason"
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
                multiple
                chips
              />
              <v-spacer></v-spacer>

              <v-btn small text outlined @click="addIssuedItems()">Add</v-btn>
            </v-layout>

            <v-data-table
              dense
              :items="itemsIssue"
              :headers="headersItems"
              items-per-page="10"
            ></v-data-table>

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
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      sendIssueRequestDialog: false,
      inputRules: [(v) => !!v || "This field is required"],

      item: {},
      itemsIssue: [],
      headersItems: [
        { text: "Inventory", value: "inventory" },
        { text: "Name", value: "name" },
        { text: "Quantity", value: "quantity" },
        { text: "Aveliable", value: "aveliable" },
        { text: "Action", value: "action", width: "10%" },
      ],

      headersIssue: [
        { text: "Inventory", value: "inventory" },
        { text: "Name", value: "name" },
        { text: "Quantity", value: "quantity" },
        { text: "Status", value: "status" },
        { text: "Detail", value: "detail", width: "10%" },
      ],
    };
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

    async addIssuedItems() {
      for (let i = 0; i < this.inventotyItems.length; i++) {
        let exist = 0;
        for (let j = 0; j < this.itemsIssue.length; j++) {
          if (this.itemsIssue[j].id === this.inventotyItems[i].id) {
            exist = 1;
            break;
          } else exist = 0;
        }

        if (exist === 0) this.itemsIssue.push(this.inventotyItems[i]);
      }
    },

    async save() {
      if (this.$refs.save.validate()) {
        await this.sendIssueRequest(this.itemsIssue);

        if (this.sendIssuedRequest === true) {
          this.sendIssueRequestDialog = false;
          await this.loadData();
        } else alert("Something wrong try later!!!");
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
