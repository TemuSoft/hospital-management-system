<template>
  <div class="main">
    <h3>Dispensary</h3>

    <v-card flat>
      <v-data-table
        :items="dispensaryList"
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
          <Detail class="icon" @click="dispensaryDetail(item.id)" />
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Detail from "@/assets/icons/eye.svg";
import AccountService from "@/network/accountService";

export default {
  data() {
    return {
      login_user: AccountService.getProfile(),
      inputRules: [(v) => !!v || "This field is required"],

      search: "",

      dispensaryHeaders: [
        { text: "Who ?", value: "name" },
        { text: "Total Medicine", value: "total_medicine" },
        { text: "Date", value: "request_date" },
        { text: "Action", value: "action", width: "17%" },
      ],
    };
  },

  components: {
    Detail,
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

    async dispensaryDetail(dispensary_id) {
      this.$router.push({
        name: "dispensaryDetail",
        params: { dispensary_id: dispensary_id },
      });
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
</style>
