<template>
  <div class="main">
    <v-card flat>
      <v-toolbar dense>
        <v-btn text class="text-capitalize" @click="back()">
          <v-icon class="mx-3">mdi-arrow-left</v-icon>
          Go Back
        </v-btn>
        <v-spacer />
        <h3 style="color: lightgreen">Dispensary Detail</h3>
        <v-spacer />
        <v-spacer />
      </v-toolbar>

      <v-data-table
        :items="dispensarySingle.meds"
        :headers="dispensarySingleHeaders"
        :items-per-page="10"
        :search="search"
      >
        <template v-slot:item.action="{ item }">
          <v-btn
            v-if="dispensarySingle.store_user_id === -5"
            text
            color="green"
            class="text-capitalize"
            @click="dispensaryApproval(item)"
          >
            Approval
          </v-btn>
        </template>

        <template v-slot:item.quantity_accepted="{ item }">
          <h3 style="color: red">{{ item.quantity_accepted }}</h3>
        </template>
      </v-data-table>

      <v-btn small outlined color="green" @click="submitDispensaryRequest()">
        Submit
      </v-btn>
    </v-card>

    <v-dialog v-model="dispensaryApprovalDialog" persistent width="1000">
      <v-card>
        <v-toolbar dense color="green">
          Dispensary Approval
          <v-spacer />

          <Close class="icon" @click="closeDispensaryApprovalDialog()" />
        </v-toolbar>
        <br />

        <v-card-text>
          <label class="titleHead">Medicine Name : </label>
          <label class="titleCont">
            {{ selectedDispensary.medicine_name }}
          </label>
          <br />

          <label class="titleHead">Category : </label>
          <label class="titleCont">{{ selectedDispensary.name }} </label>
          <br />

          <label class="titleHead">Unit Of Measurment : </label>
          <label class="titleCont">{{ selectedDispensary.name }} </label>
          <br />

          <v-layout>
            <label class="titleHead">Total Avaliable : </label>
            <label class="titleCont"
              >{{ selectedDispensary.balance_in_store }}
            </label>
            <v-spacer />

            <label class="titleHead">Total Requested : </label>
            <label class="titleCont">
              {{ selectedDispensary.quantity_requested }}
            </label>
            <v-spacer />

            <v-text-field
              label="Accepted amount"
              type="number"
              v-model="selectedDispensary.quantity_accepted"
              dense
              rounded
            />
          </v-layout>

          <h3>Medicine Detail</h3>
          <v-data-table
            :items="selectedDispensary.medicine_detail"
            :headers="medicineDetialHeaders"
          >
            <template v-slot:item.checkbox="{ item }">
              <checked
                class="icon"
                v-if="item.checkbox"
                @click="checkboxWholeProcess(item, false)"
              />
              <unchecked
                class="icon"
                v-else
                @click="checkboxWholeProcess(item, true)"
              />
            </template>

            <template v-slot:item.approved="{ item }">
              <v-edit-dialog
                :return-value.sync="item.approved"
                @save="save"
                @cancel="cancel"
                @open="open"
                @close="close"
                large
              >
                {{ item.approved }}
                <template v-slot:input>
                  <v-text-field
                    @change="validateInput(item)"
                    v-model="item.approved"
                    type="number"
                    label="Edit"
                    single-line
                  ></v-text-field>
                </template>
              </v-edit-dialog>
            </template>
          </v-data-table>

          <v-layout>
            <v-spacer />
            <v-btn small color="green" outlined @click="approvedRequest()">
              Approved
            </v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Close from "@/assets/icons/close.svg";
import Checked from "@/assets/icons/checked.svg";
import Unchecked from "@/assets/icons/unchecked.svg";
import AccountService from "@/network/accountService";

export default {
  data() {
    return {
      login_user: AccountService.getProfile(),
      inputRules: [(v) => !!v || "This field is required"],

      dispensary_id: "",

      dispensarySingleHeaders: [
        { text: "Medicine Name", value: "medicine_name" },
        { text: "Balaance", value: "balance_in_store" },
        { text: "Requested", value: "quantity_requested" },
        { text: "Accepted ", value: "quantity_accepted" },
        { text: "Action", value: "action", width: "17%" },
      ],

      dispensaryApprovalDialog: false,
      selectedDispensary: {},
      acceptedAmount: 0,

      medicineDetialHeaders: [
        { text: "", value: "checkbox" },
        { text: "Buying Price", value: "buying_price" },
        { text: "Selling Price", value: "selling_price" },
        { text: "Expire Date", value: "expire_date" },
        { text: "Quantity", value: "quantity" },
        { text: "Approved", value: "approved" },
      ],
    };
  },

  created() {
    const { dispensary_id } = this.$route.params;
    this.dispensary_id = dispensary_id;

    this.loadData();
  },

  components: {
    Close,
    Checked,
    Unchecked,
  },

  computed: {
    ...mapState("pharmacy", ["dispensarySingle", "confirmedDispensaryRequest"]),
  },

  methods: {
    ...mapActions("pharmacy", [
      "getDispensarySingle",
      "confirmDispensaryRequest",
    ]),

    async loadData() {
      await this.getDispensarySingle(this.dispensary_id);
    },

    checkboxWholeProcess(item, make) {
      let index = this.selectedDispensary.medicine_detail.indexOf(item);
      this.selectedDispensary.medicine_detail[index].checkbox = make;

      if (make === false)
        this.selectedDispensary.medicine_detail[index].approved = 0;
    },

    async submitDispensaryRequest() {
      let data = {
        id: this.dispensary_id,
        store_user_id: this.login_user.id,
        detail: [],
      };

      let dd = this.dispensarySingle.meds;
      for (let i = 0; i < dd.length; i++) {
        data.detail.push({
          id: dd[i].id,
          medicine_id: dd[i].medicine_id,
          quantity_accepted: dd[i].quantity_accepted,
          from: [],
        });

        for (let j = 0; j < dd[i].medicine_detail.length; j++) {
          if (dd[i].medicine_detail[j].checkbox === true)
            data.detail[i].from.push({
              id: dd[i].medicine_detail[j].id,
              approved: dd[i].medicine_detail[j].approved,
            });
        }
      }
      await this.confirmDispensaryRequest(data);

      if (this.confirmedDispensaryRequest.st === true) this.back();
      else
        this.$fire({
          title: "Dispensary Request Confirmation",
          text: this.confirmedDispensaryRequest.msg,
          type: "error",
          timer: 7000,
        });
    },

    validateInput(item) {
      let i = this.selectedDispensary.medicine_detail.indexOf(item);
      if (item.approved < 0 || item.checkbox === false) {
        item.approved = 0;
        this.selectedDispensary.medicine_detail[i] = item;
      } else {
        let av = parseFloat(item.quantity);
        let app = parseFloat(item.approved);

        if (app > av) {
          item.approved = 0;
          this.selectedDispensary.medicine_detail[i] = item;
        }
      }
    },

    back() {
      this.$router.push({ name: "dispensary" });
    },

    async closeDispensaryApprovalDialog() {
      this.selectedDispensary.quantity_accepted = 0;

      for (let i = 0; i < this.selectedDispensary.medicine_detail.length; i++) {
        this.selectedDispensary.medicine_detail[i].approved = 0;
        this.selectedDispensary.medicine_detail[i].checkbox = false;
      }
      this.dispensaryApprovalDialog = false;
    },

    async approvedRequest() {
      let dd = this.selectedDispensary.medicine_detail;
      let totalReq = parseFloat(this.selectedDispensary.quantity_requested);
      let totalAva = parseFloat(this.selectedDispensary.balance_in_store);
      let totalAcc = parseFloat(this.selectedDispensary.quantity_accepted);
      let totalInput = 0;

      for (let i = 0; i < dd.length; i++)
        totalInput += parseFloat(dd[i].approved);

      if (totalAcc != totalInput || totalAcc > totalAva || totalAcc > totalReq)
        this.$fire({
          title: "Medicine Dispensary",
          text: "Input value id not valid",
          type: "error",
          timer: 7000,
        });
      else this.dispensaryApprovalDialog = false;
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
