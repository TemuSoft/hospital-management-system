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
      :items="issueList"
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
          <v-layout>
            <v-textarea
              dense
              label="Reason"
              v-model="item.reason"
              outlined
            ></v-textarea>
          </v-layout>

          <v-layout>
            <v-autocomplete
              :items="inventory"
              item-text="name"
              item-value="id"
              outlined
              dense
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

            <v-btn small text outlined>Add</v-btn>
          </v-layout>

          <v-data-table
            dense
            :items="item"
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
            <v-btn small text outlined>Save</v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sendIssueRequestDialog: false,
      inventory: [],
      inventotyItems: [],
      item: [],
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
