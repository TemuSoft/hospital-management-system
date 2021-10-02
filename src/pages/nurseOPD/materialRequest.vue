<template>
  <div>
    <h2>Material Request</h2>
    <br />

    <v-form @submit.prevent="save" ref="save">
      <table>
        <tr>
          <th>NO</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Note</th>
          <th>Action</th>
        </tr>

        <tr v-for="(mri, i) in materialRequestInfo" :key="i">
          <td>{{ i + 1 }}</td>
          <td>
            <v-text-field
              class="tdCell"
              v-model="materialRequestInfo[i].name"
              :rules="inputRules"
              dense
              rounded
            />
          </td>
          <td>
            <v-text-field
              class="tdCell"
              type="Number"
              v-model="materialRequestInfo[i].quantity"
              :rules="inputRules"
              dense
              rounded
            />
          </td>
          <td>
            <v-text-field
              class="tdCell"
              v-model="materialRequestInfo[i].note"
              :rules="inputRules"
              dense
              rounded
            />
          </td>
          <td>
            <Delete @click="removeMaterialRequestInfo(i)" class="icon" />
          </td>
        </tr>
      </table>
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

      materialRequestInfo: [],
    };
  },

  created() {
    this.loadData();
  },

  components: {
    Delete,
  },

  computed: {
    ...mapState("medicalService", ["doneMaterialRequest"]),
  },

  methods: {
    ...mapActions("medicalService", ["sendMaterialRequest"]),

    async loadData() {
      this.addMaterialRequestInfo();
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
        await this.sendMaterialRequest(this.materialRequestInfo);

        if (this.doneMaterialRequest === true) {
          this.materialRequestInfo = [];
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
