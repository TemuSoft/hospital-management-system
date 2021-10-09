<template>
  <div class="main">
    <h3>Dispensary</h3>

    <v-card flat>
      <v-data-table
        :items="dispensaryListsss"
        :headers="dispensaryHeaders"
        :items-per-page="10"
        :search="search"
      >
        <template v-slot:item.total_medicine="{ item }">
          {{ getTotalMedicine(item.meds) }}
        </template>

        <template v-slot:item.request_date="{ item }">
          {{ new Date(item.request_date).toISOString().substr(0, 10) }}
        </template>

        <template v-slot:top>
          <v-layout>
            <v-text-field
              v-model="search"
              label="Enter search text ..."
              dense
              single-line
              hide-details
            />
          </v-layout>
          <br />
        </template>

        <template v-slot:item.action="{ item }">
          <v-btn
            v-if="item.store_user_id === -5"
            text
            color="green"
            class="text-capitalize"
            @click="dispensaryApproval(item)"
          >
            Approval
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    {{ dispensaryListsss }}

    <v-dialog v-model="dispensaryApprovalDialog" persistent width="1000">
      <v-card>
        <v-toolbar dense color="green">
          Dispensary Approval
          <v-spacer />

          <Close class="icon" @click="dispensaryApprovalDialog = false" />
        </v-toolbar>
        <br />

        <v-card-text>
          <label class="titleHead">Medicine Name : </label>
          <label class="titleCont">{{ selectedDispensary.name }} </label>
          <br />

          <label class="titleHead">Category : </label>
          <label class="titleCont">{{ selectedDispensary.name }} </label>
          <br />

          <label class="titleHead">Unit Of Measurment : </label>
          <label class="titleCont">{{ selectedDispensary.name }} </label>
          <br />

          <v-layout>
            <label class="titleHead">Total Avaliable : </label>
            <label class="titleCont">{{ selectedDispensary.name }} </label>
            <v-spacer />

            <label class="titleHead">Total Requested : </label>
            <label class="titleCont">{{ selectedDispensary.name }} </label>
            <v-spacer />

            <v-text-field
              label="Accepted amount"
              v-model="acceptedAmount"
              dense
              outlined
            />
          </v-layout>

          <h3>Medicine Detail</h3>
          <v-layout>
            quantity buying_price selling_price manufacture_date expire_date
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Close from "@/assets/icons/close.svg";
import AccountService from "@/network/accountService";

export default {
  data() {
    return {
      login_user: AccountService.getProfile(),
      inputRules: [(v) => !!v || "This field is required"],

      search: "",
      dispensaryListsss: [
        {
          id: 1,
          user_id: 1,
          status: 0,
          store_user_id: -5,
          request_date: "2021-10-09T16:36:04.468365Z",
          name: "Solomon Alamrew",
          meds: [
            {
              id: 1,
              request_id: 1,
              medicine_id: 7,
              quantity_requested: "2.00",
              quantity_accepted: "0.00",
              medicine_name: "Medicine name",
              balance_in_store: 42,
            },
          ],
        },
        {
          id: 2,
          user_id: 9,
          status: 0,
          store_user_id: -5,
          request_date: "2021-10-09T16:41:23.250565Z",
          name: "Pharmacy Pharmacy",
          meds: [],
        },
        {
          id: 3,
          user_id: 9,
          status: 0,
          store_user_id: -5,
          request_date: "2021-10-09T16:42:44.127374Z",
          name: "Pharmacy Pharmacy",
          meds: [
            {
              id: 2,
              request_id: 3,
              medicine_id: 7,
              quantity_requested: "2.00",
              quantity_accepted: "0.00",
              medicine_name: "Medicine name",
              balance_in_store: 42,
            },
          ],
        },
        {
          id: 4,
          user_id: 9,
          status: 0,
          store_user_id: 0,
          request_date: "2021-10-09T17:16:59.914518Z",
          name: "Pharmacy Pharmacy",
          meds: [
            {
              id: 3,
              request_id: 4,
              medicine_id: 7,
              quantity_requested: "6.00",
              quantity_accepted: "0.00",
              medicine_name: "Medicine name",
              balance_in_store: 42,
            },
          ],
        },
        {
          id: 5,
          user_id: 9,
          status: 0,
          store_user_id: 0,
          request_date: "2021-10-09T17:17:38.934756Z",
          name: "Pharmacy Pharmacy",
          meds: [
            {
              id: 4,
              request_id: 5,
              medicine_id: 7,
              quantity_requested: "67.00",
              quantity_accepted: "0.00",
              medicine_name: "Medicine name",
              balance_in_store: 42,
            },
          ],
        },
        {
          id: 6,
          user_id: 9,
          status: 0,
          store_user_id: 0,
          request_date: "2021-10-09T17:18:14.193703Z",
          name: "Pharmacy Pharmacy",
          meds: [
            {
              id: 5,
              request_id: 6,
              medicine_id: 7,
              quantity_requested: "8.00",
              quantity_accepted: "0.00",
              medicine_name: "Medicine name",
              balance_in_store: 42,
            },
          ],
        },
      ],

      dispensaryHeaders: [
        { text: "Who ?", value: "name" },
        { text: "Total Medicine", value: "total_medicine" },
        { text: "Date", value: "request_date" },
        { text: "Action", value: "action", width: "17%" },
      ],

      dispensaryApprovalDialog: false,
      selectedDispensary: [],
      acceptedAmount: 0,
    };
  },

  components: {
    Close,
  },

  computed: {
    ...mapState("pharmacy", ["dispensaryList"]),
  },

  created() {
    this.loadData();
  },

  methods: {
    ...mapActions("pharmacy", ["getDispensaryList"]),

    async loadData() {
      await this.getDispensaryList();
    },

    getTotalMedicine(data) {
      let res = 0;
      for (let i = 0; i < data.length; i++)
        res += parseFloat(data[i].quantity_requested);

      return res;
    },

    async dispensaryApproval(data) {
      this.dispensaryApprovalDialog = true;
      this.selectedDispensary = data;
    },
  },
};
</script>

<style scoped>
.main {
  margin: 7%;
  margin-top: 1%;
}
.icon {
  cursor: pointer;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

th {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  height: 30px;
}

td,
th {
  text-align: center;
}

.titleHead {
  font-family: bold;
  font: bold 12px/30px Georgia;
  letter-spacing: 2px;
}
.titleCont {
  font-size: 17px;
}
</style>
