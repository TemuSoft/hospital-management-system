<template>
  <div class="main">
    <v-card flat>
      <h2>Work Permission</h2>
      <br />

      <v-data-table
        :items="workPermissions"
        :headers="requestHeaders"
        :items-per-page="10"
      >
        <template v-slot:top>
          <v-layout>
            <v-spacer></v-spacer>
            <v-btn
              class="text-capitalize green"
              small
              @click="sendRequestDialog = true"
            >
              Send Request
            </v-btn>
          </v-layout>
        </template>
      </v-data-table>

      <v-dialog v-model="sendRequestDialog" width="900px" persistent>
        <v-card>
          <v-toolbar dense color="green">
            Send Work Permission
            <v-spacer />

            <Close @click="sendRequestDialog = false" class="icon" />
          </v-toolbar>

          <br />
          <v-card-text>
            <v-form @submit.prevent="sendRequest" ref="sendRequest">
              <v-layout>
                <v-text-field
                  label="Start Date"
                  type="date"
                  dense
                  v-model="requestPermission.start_date"
                  outlined
                  :rules="inputRules"
                />
                <v-text-field
                  label="Start Time"
                  type="time"
                  dense
                  v-model="requestPermission.start_time"
                  outlined
                  :rules="inputRules"
                />
                <v-spacer></v-spacer>
                <v-text-field
                  label="End Date"
                  type="date"
                  dense
                  v-model="requestPermission.end_date"
                  :rules="inputRules"
                  outlined
                />
                <v-text-field
                  label="End Time"
                  type="time"
                  dense
                  v-model="requestPermission.end_time"
                  outlined
                  :rules="inputRules"
                />
              </v-layout>

              <v-textarea
                label="Reason"
                counter="300"
                outlined
                v-model="requestPermission.reason"
                :rules="inputRules"
              />

              <v-text-field
                rounded
                dense
                type="file"
                label="Attachment if neccessary"
              />

              <br />
              <v-layout>
                <v-spacer />
                <v-btn
                  small
                  class="text-capitalize green"
                  @click="sendRequest()"
                >
                  Send
                </v-btn>
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
import Close from "@/assets/icons/close.svg";

export default {
  data() {
    return {
      requestPermission: {},
      sendRequestDialog: false,
      inputRules: [(v) => !!v || "This field is required"],
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

  created() {
    this.loadData();
  },

  components: {
    Close,
  },

  computed: {
    ...mapState("workPermission", ["requestedPermission", "workPermissions"]),
  },

  methods: {
    ...mapActions("workPermission", [
      "sendReuqestPermission",
      "getWorkPermission",
    ]),

    async loadData() {
      await this.getWorkPermission();
    },

    async sendRequest() {
      if (this.$refs.sendRequest.validate()) {
        await this.sendReuqestPermission(this.requestPermission);

        if (this.requestedPermission === true) {
          this.sendRequestDialog = false;
        } else
          this.$fire({
            title: "Work Permission",
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
  margin: 5%;
  margin-top: 3%;
}
.icon {
  cursor: pointer;
}
</style>
