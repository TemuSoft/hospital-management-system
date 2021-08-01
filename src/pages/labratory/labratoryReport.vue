<template>
  <div>
    <v-card class="main">
      <v-toolbar dense flat>
        <v-btn
          text
          class="text-capitalize"
          @click="$router.push({ name: 'labratory' })"
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
