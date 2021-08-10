<template>
  <div class="main">
    <v-card flat>
      <h2>Work Permission</h2>
      <br />

      <v-data-table
        :items="dataList"
        :headers="requestHeaders"
        :items-per-page="10"
      >
        <template v-slot:top>
          <v-layout>
            <v-spacer></v-spacer>
            <v-btn outlined text small @click="sendRequestDialog = true">
              Send Request
            </v-btn>
          </v-layout>
        </template>
      </v-data-table>

      <v-dialog v-model="sendRequestDialog" width="700px" persistent>
        <v-card>
          <v-toolbar color="green"> Send Work Permission </v-toolbar>

          <br />
          <v-card-text>
            <v-layout>
              <v-text-field
                label="Start Date"
                type="date"
                dense
                v-model="item.startDate"
                outlined
              />
              <v-spacer></v-spacer>
              <v-text-field
                label="End Date"
                type="date"
                dense
                v-model="item.endDate"
                outlined
              />
            </v-layout>

            <v-textarea
              label="Reason"
              counter="300"
              outlined
              v-model="item.reason"
            />

            <v-text-field
              rounded
              dense
              type="file"
              label="Attachment if neccessary"
            />

            <br />
            <v-layout>
              <v-spacer></v-spacer>
              <v-btn
                small
                text
                outlined
                color="red"
                @click="sendRequestDialog = false"
                >Cancel</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn small outlined text @click="sendRequestDialog = false"
                >Send</v-btn
              >
            </v-layout>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {},
      sendRequestDialog: false,
      requestHeaders: [
        { text: "Send Date", value: "date" },
        { text: "Full Name", value: "fullName" },
        { text: "Department", value: "deoartment" },
        { text: "Start Date", value: "startDate" },
        { text: "End Date", value: "endDate" },
        { text: "Reason", value: "reason" },
        { text: "Status", value: "status" },
        { text: "Attachment", value: "attachment" },
        { text: "Action", value: "action" },
      ],
    };
  },
};
</script>

<style scoped>
.main {
  margin: 5%;
  margin-top: 3%;
}
</style>
