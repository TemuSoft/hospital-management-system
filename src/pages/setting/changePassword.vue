<template>
  <div class="main">
    <v-card flat>
      <h3>Change Password</h3>
      <br />
      <br />

      <v-layout>
        <v-text-field
          label="Old Password"
          dense
          outlined
          v-model="item.oldPassword"
        ></v-text-field>
      </v-layout>

      <v-layout>
        <v-text-field
          label="New Password"
          dense
          outlined
          v-model="item.newPassword"
        ></v-text-field>
        <v-spacer></v-spacer>

        <v-text-field
          dense
          label="Confirm Password"
          outlined
          v-model="item.confirmPassword"
        ></v-text-field>
      </v-layout>
      <br />

      <v-layout>
        <v-btn small>Change Password</v-btn>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: [],
    };
  },
};
</script>

<style scoped>
.main {
  margin: 30%;
  margin-top: 5%;
}
</style>
