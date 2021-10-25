<template>
  <div>
    <h3>Sugical Order</h3>
    <br />
    <v-layout>
      <v-spacer />
      <v-btn
        small
        class="text-capitalize green"
        @click="addNewSurgicalOrder = !addNewSurgicalOrder"
      >
        Add New
      </v-btn>
    </v-layout>

    <v-form
      @submit.prevent="register"
      ref="register"
      v-if="addNewSurgicalOrder"
    >
      <v-layout>
        <v-textarea
          v-model="surgicalOrdeInfo.description"
          :rules="inputRules"
          outlined
          rows="3"
          label="Description"
        />
      </v-layout>

      <v-layout>
        <v-checkbox
          v-model="confrimSurgicalOrder"
          label="Checked me to confirm"
        />
      </v-layout>

      <v-layout>
        <v-btn small class="text-capitalizr green" @click="register">
          Save
        </v-btn>
      </v-layout>
    </v-form>
    <br />
    <v-card
      elevation="10"
      class="mb-3"
      v-for="(su, i) in surgicalOrderList"
      :key="su"
    >
      <v-layout class="pa-5">
        <v-layout>
          {{ su.description }}
          <v-spacer />

          <Edit class="icon ml-5" @click="editSurgicalOrder(i)" />
          <Delete class="icon ml-5" @click="delteSurgicalOrder(i)" />
        </v-layout>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import AccountService from "@/network/accountService";
import { mapActions, mapState } from "vuex";

import Edit from "@/assets/icons/edit.svg";
import Delete from "@/assets/icons/delete.svg";

export default {
  props: ["service_id", "patient_id"],
  data() {
    return {
      login_user: AccountService.getProfile(),
      inputRules: [(v) => !!v || "This field is required!!!"],

      addNewSurgicalOrder: true,

      surgicalOrdeInfo: {},
      confrimSurgicalOrder: false,
    };
  },

  components: {
    Edit,
    Delete,
  },

  created() {
    this.loadData();
  },

  computed: {
    ...mapState("mainPatientInfoManager", [
      "registeredSurgicalOrder",
      "surgicalOrderList",
    ]),
  },

  methods: {
    ...mapActions("mainPatientInfoManager", [
      "getSurgicalOrderList",
      "registerSurgicalOrder",
    ]),

    async loadData() {
      await this.getSurgicalOrderList(this.service_id);
      if (this.surgicalOrderList.length > 0) this.addNewSurgicalOrder = false;
    },

    async register() {
      if (this.$refs.register.validate()) {
        this.surgicalOrdeInfo.physician_id = this.login_user.id;
        this.surgicalOrdeInfo.service_id = this.service_id;
        this.surgicalOrdeInfo.patient_id = this.patient_id;

        await this.registerSurgicalOrder(this.surgicalOrdeInfo);
        if (this.registeredSurgicalOrder.st === true) {
          this.surgicalOrdeInfo = {};
          this.addNewSurgicalOrder = false;
          this.loadData();
        } else
          this.$fire({
            title: "Surgical Order Registeration",
            text: this.registeredSurgicalOrder.msg,
            type: "error",
            timer: 7000,
          });
      }
    },
  },
};
</script>

<style scoped>
.icon {
  cursor: pointer;
}
</style>
