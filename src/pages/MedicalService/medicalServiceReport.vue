<template>
  <div class="main">
    <v-card flat>
      <v-toolbar flat dense>
        <v-btn
          text
          class="text-capitalize"
          @click="$router.push({ name: 'medicalServices' })"
        >
          <v-icon class="mx-3">mdi-arrow-left</v-icon>
          Go Back
        </v-btn>
        <v-spacer />

        Labratory Report
      </v-toolbar>

      <v-divider></v-divider>
      <br />

      Main Display
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.main {
  margin: 7%;
  margin-top: 2%;
}
</style>
