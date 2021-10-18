<template>
  <div>
    <v-layout class="main">
      <v-spacer />

      <v-btn
        small
        text
        outlined
        color="green"
        @click="(dispensaryRegisterDialog = true), (dispensaryInfo = {})"
      >
        Send Dispensary Request
      </v-btn>
    </v-layout>

    <v-dialog v-model="dispensaryRegisterDialog" width="800px" persistent>
      <v-card>
        <v-toolbar dense color="green">
          Send dispensary request
          <v-spacer />

          <Close @click="dispensaryRegisterDialog = false" class="icon" />
        </v-toolbar>
        <br />
        {{ selectedMedicines }}
        <v-card-text>
          <v-form @submit.prevent="register" ref="register">
            <table v-if="selectedMedicines.length > 0">
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>

              <tr v-for="(sm, i) in selectedMedicines" :key="i">
                <td>{{ sm.name }}</td>

                <td>
                  <v-text-field
                    dense
                    outlined
                    type="number"
                    rounded
                    class="ml-15"
                    :rules="inputRules"
                    v-model="selectedMedicines[i].quantity_requested"
                  />
                </td>

                <td style="width: 30%">
                  <Delete class="icon" @click="deleteSelectedMedicines(i)" />
                </td>
              </tr>
            </table>

            <v-layout>
              <v-autocomplete
                label="Medicine"
                item-text="name"
                item-value="id"
                dense
                outlined
                :items="medicineList"
                v-model="selectedMedicines"
                multiple
                chips
                return-object
                @change="medicineSleceted"
              />

              <v-spacer />
              <v-btn
                small
                outlined
                color="green"
                class="text-capitalize"
                @click="register()"
              >
                Send
              </v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Close from "@/assets/icons/close.svg";
import Delete from "@/assets/icons/delete.svg";
import AccountService from "@/network/accountService";

export default {
  data() {
    return {
      login_user: AccountService.getProfile(),
      inputRules: [(v) => !!v || "This field is required"],

      selectedMedicines: [],
      dispensaryInfo: {},
      dispensaryRegisterDialog: false,

      dispensaryMedicineHeader: [
        { text: "", value: "name" },
        { text: "", value: "quantity_requested" },
        { text: "", value: "action", width: "20%" },
      ],
    };
  },

  components: {
    Close,
    Delete,
  },

  computed: {
    ...mapState("pharmacy", [
      "medicineList",
      "dispensaryList",
      "registeredDispensary",
    ]),
  },

  created() {
    this.loadData();
  },

  methods: {
    ...mapActions("pharmacy", [
      "getMedicineList",
      "getDispensaryList",
      "registerDispensary",
    ]),

    async loadData() {
      await this.getMedicineList();
      await this.getDispensaryList();
    },

    async register() {
      if (this.$refs.register.validate()) {
        this.dispensaryInfo.user_id = this.login_user.id;
        this.dispensaryInfo.details = [];
        for (let i = 0; i < this.selectedMedicines.length; i++)
          this.dispensaryInfo.details.push({
            medicine_id: this.selectedMedicines[i].id,
            quantity_requested: this.selectedMedicines[i].quantity_requested,
          });

        await this.registerDispensary(this.dispensaryInfo);

        if (this.registeredDispensary.st === true) {
          this.dispensaryInfo = {};
          this.dispensaryRegisterDialog = false;
        } else
          this.$fire({
            title: "Dispensary Request",
            text: this.registeredDispensary.msg,
            type: "error",
            timer: 7000,
          });
      }
    },

    async deleteSelectedMedicines(i) {
      this.selectedMedicines.splice(i, 1);
    },
  },
};
</script>
<style scoped>
.main {
  margin: 7%;
  margin-top: 1%;
}
</style>
