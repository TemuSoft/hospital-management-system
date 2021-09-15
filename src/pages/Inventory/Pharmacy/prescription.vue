<template>
  <div class="main">
    <v-card>
      <v-data-table
        :items="prescriptionList"
        :headers="headers"
        :search="search"
        :items-per-page="10"
      >
        <template v-slot:item.action>
          <Detail class="icon" @click="detailPrescription(item.id)" />
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import Detail from "@/assets/icons/eye.svg";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "Full Name", value: "fullName" },
        { text: "Card Number", value: "card_number" },
        { text: "From", value: "ordered_by" },
        { text: "Status", value: "status" },
        { text: "Action", value: "action" },
      ],
    };
  },

  components: {
    Detail,
  },

  created() {
    this.loadData();
  },

  computed: {
    ...mapState("prescription", ["prescriptionList"]),
  },

  methods: {
    ...mapActions("prescription", ["getPrescriptionList"]),

    async loadData() {
      await this.getPrescriptionList();
    },

    async detailPrescription(id) {
      this.$router.push({
        name: "prescriptionDetail",
        params: { prescriptionId: id },
      });
    },
  },
};
</script>

<style scoped>
.main {
  margin: 5%;
  margin-top: 2%;
}

.icon {
  cursor: pointer;
}
</style>
