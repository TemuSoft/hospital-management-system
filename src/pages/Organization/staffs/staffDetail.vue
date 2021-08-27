<template>
  <div class="main">
    <v-card>
      <v-toolbar dense>
        <v-btn
          text
          class="text-capitalize"
          @click="$router.push({ name: 'staff' })"
        >
          <v-icon class="mx-3">mdi-arrow-left</v-icon>
          Go Back
        </v-btn>
        <v-spacer />
        <h2>Staff Details</h2>
        <v-spacer />
        <v-spacer />
      </v-toolbar>
      <v-divider></v-divider>
      <br />
      <br />
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      staffId: "",
    };
  },

  created() {
    const { staffId } = this.$route.params;
    this.staffId = staffId;
  },
};
</script>

<style scoped>
.main {
  margin: 7%;
  margin-top: 3%;
}
</style>
