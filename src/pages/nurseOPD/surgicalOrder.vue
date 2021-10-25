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

    <v-layout v-for="su in surgicalOrderList" :key="su"> </v-layout>

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
          label="Checked me to confirm"
          v-model="confrimSurgicalOrder"
          dense
        />
      </v-layout>

      <v-layout>
        <v-btn
          v-if="confrimSurgicalOrder"
          small
          class="text-capitalizr green"
          @click="register"
        >
          Save
        </v-btn>
      </v-layout>
    </v-form>
  </div>
</template>

<script>
import AccountService from "@/network/accountService";
import { mapActions, mapState } from "vuex";

export default {
  props: ["service_id", "patient_id"],
  data() {
    return {
      login_user: AccountService.getProfile(),
      inputRules: [(v) => !!v || "This field is required!!!"],

      addNewSurgicalOrder: false,

      surgicalOrdeInfo: {},
      confrimSurgicalOrder: false,
    };
  },

  created() {
    this.loadData();
  },

  computed: {
    ...mapState("mainPatientInfoManager", ["surgicalOrderList"]),
  },

  methods: {
    ...mapActions("mainPatientInfoManager", [
      "getSurgicalOrderList",
      "registerSurgicalOrder",
    ]),

    async loadData() {
      await this.getSurgicalOrderList(this.service_id);
    },

    async register() {
      if (this.$refs.register.validate()) {
        this.surgicalOrdeInfo.user_id = this.login_user.id;
        this.surgicalOrdeInfo.service_id = this.service_id;
        this.surgicalOrdeInfo.patient_id = this.patient_id;

        await this.registerSurgicalOrder(this.surgicalOrdeInfo);
        this.loadData();
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
