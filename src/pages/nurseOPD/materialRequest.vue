<template>
  <div>
    <h2>Material Request</h2>
    <br />

    <v-layout>
      <v-spacer />

      <v-btn
        v-if="addMaterialRequest"
        small
        class="text-capitalize"
        outlined
        color="green"
        @click="addMaterialRequest = !addMaterialRequest"
        >View Lest</v-btn
      >

      <v-btn
        v-else
        class="text-capitalize"
        small
        outlined
        color="green"
        @click="addMaterialRequest = !addMaterialRequest"
        >Add New</v-btn
      >
    </v-layout>
    <v-data-table
      v-if="!addMaterialRequest"
      :items="singleMaterialRequets"
      :headers="materialRequestHeader"
      :items-per-page="10"
    >
    </v-data-table>

    <v-form @submit.prevent="save" ref="save" v-else>
      <v-layout v-for="(mri, i) in materialRequestInfo" :key="i">
        <v-text-field
          label="Material Name"
          v-model="materialRequestInfo[i].name"
          :rules="inputRules"
          dense
          rounded
          solo
        />
        <v-spacer />

        <v-text-field
          label="Quantity"
          type="Number"
          v-model="materialRequestInfo[i].quantity"
          :rules="inputRules"
          dense
          rounded
          solo
        />
        <v-spacer />

        <v-text-field
          label="Note"
          v-model="materialRequestInfo[i].note"
          :rules="inputRules"
          dense
          rounded
          solo
        />
        <v-spacer />

        <Delete @click="removeMaterialRequestInfo(i)" class="icon" />
      </v-layout>
      <br />

      <v-layout>
        <v-btn
          outlined
          small
          text
          @click="addMaterialRequestInfo"
          color="blue"
          class="text-capitalize"
        >
          Add More
        </v-btn>
        <v-spacer />

        <v-btn
          outlined
          small
          text
          @click="save()"
          color="green"
          class="text-capitalize"
        >
          Send Request
        </v-btn>
        <v-spacer />
        <v-spacer />
      </v-layout>
    </v-form>
  </div>
</template>

<script>
import Delete from "@/assets/icons/delete.svg";
import { mapActions, mapState } from "vuex";

export default {
  props: ["service_id", "patientId"],

  data() {
    return {
      inputRules: [(v) => !!v || "This field is required"],
      login_user: { id: 4, name: "Temesgen Kefie", role: "Nurse" },

      addMaterialRequest: false,
      materialRequestInfo: [],
      materialRequestHeader: [
        { text: "Name", value: "name" },
        { text: "Quantity", value: "quantity" },
        { text: "Note", value: "note" },
        { text: "Action", value: "action" },
      ],
    };
  },

  created() {
    this.loadData();
  },

  components: {
    Delete,
  },

  computed: {
    ...mapState("medicalService", [
      "doneMaterialRequest",
      "singleMaterialRequets",
    ]),
  },

  methods: {
    ...mapActions("medicalService", [
      "sendMaterialRequest",
      "getSingleMaterialRequest",
    ]),

    async loadData() {
      this.addMaterialRequestInfo();
      await this.getSingleMaterialRequest(this.service_id);
    },

    async addMaterialRequestInfo() {
      this.materialRequestInfo.push({
        name: "",
        quantity: 0,
        note: "",
      });
    },

    async removeMaterialRequestInfo(i) {
      this.materialRequestInfo.splice(i, 1);
    },

    async save() {
      if (this.$refs.save.validate()) {
        let data = {};
        data.service_id = this.service_id;
        data.request_user_id = this.login_user.id;
        data.items = this.materialRequestInfo;

        await this.sendMaterialRequest(data);

        if (this.doneMaterialRequest === true) {
          this.materialRequestInfo = [];

          this.$fire({
            title: "Material Request Registeration",
            text: "Successfuly done!!!",
            type: "sccess",
            timer: 7000,
          });

          this.loadData();
        } else
          this.$fire({
            title: "Material Request Registeration",
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
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}
td {
  justify-content: center;
  text-align: center;
}

.tdCell {
  height: 50px;
}

.icon {
  cursor: pointer;
}
</style>
