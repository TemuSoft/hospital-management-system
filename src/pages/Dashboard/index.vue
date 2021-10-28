<template>
  <div class="main">
    <Admin v-if="role === 'admin'" />
    <Cashier v-else-if="role === 'cashier'" />
    <LaboratoryImaging
      v-else-if="
        role === 'imaging' ||
        role === 'laboratory' ||
        role === 'laboratory_head' ||
        role === 'imaging_head'
      "
    />
    <NurseOPD v-else-if="role === 'nurse' || role === 'opd'" />
    <Reception v-else-if="role === 'reception'" />
    <Pharmacy v-else-if="role === 'pharmacy'" />
    <PharmacyStore v-else-if="role === 'pharmacy_store'" />
    <Store v-else-if="role === 'store'" />
  </div>
</template>

<script>
import AccountService from "@/network/accountService";

import Admin from "./collection/admin.vue";
import Cashier from "./collection/cashier.vue";
import LaboratoryImaging from "./collection/labratoryImaging.vue";
import NurseOPD from "./collection/nurseOPD.vue";
import Pharmacy from "./collection/pharmacys.vue";
import PharmacyStore from "./collection/PharmacyStore.vue";
import Reception from "./collection/reception.vue";
import Store from "./collection/stores.vue";

export default {
  data() {
    return {
      role: "",
    };
  },

  created() {
    this.role = AccountService.getRole();
  },

  mounted() {},

  components: {
    Admin,
    Cashier,
    LaboratoryImaging,
    NurseOPD,
    Pharmacy,
    Reception,
    Store,
    PharmacyStore,
  },

  methods: {},
};
</script>

<style scoped>
.main {
  margin: 5%;
  margin-top: 0%;
}
</style>
