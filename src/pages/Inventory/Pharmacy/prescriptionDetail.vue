<template>
  <div class="main"></div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },

  created() {
    const { prescriptionId } = this.$route.params;
    this.prescriptionId = prescriptionId;

    if (prescriptionId === undefined) this.back();

    this.loadData();
  },

  computed: {
    ...mapState("prescription", ["singlePrescription"]),
  },

  methods: {
    ...mapActions("prescription", ["getSinglePrescription"]),

    async loadData() {
      await this.getSinglePrescription(this.prescriptionId);
    },

    async back() {
      this.$router.push({ name: "prescription" });
    },
  },
};
</script>

<style scoped>
.main {
  margin: 5%;
  margin-top: 2%;
}
</style>
