<template>
  <div class="main">
    <v-card flat>
      <h3>Hospital Setting</h3>
      <br />
      <br />

      <v-layout>
        <v-text-field
          label="Hospital Name"
          dense
          outlined
          v-model="item.hospitalName"
        ></v-text-field>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <v-text-field
          label="Address"
          dense
          outlined
          v-model="item.address"
        ></v-text-field>
      </v-layout>
      <br />

      <v-layout>
        <v-text-field
          dense
          label="Country"
          outlined
          v-model="item.country"
        ></v-text-field>
        <v-spacer />

        <v-text-field
          dense
          label="State"
          outlined
          v-model="item.state"
        ></v-text-field>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <v-text-field
          dense
          label="City"
          outlined
          v-model="item.city"
        ></v-text-field>
        <v-spacer />

        <v-text-field
          dense
          label="Postal Code"
          outlined
          v-model="item.postalCode"
        ></v-text-field>
      </v-layout>
      <br />

      <v-layout>
        <v-text-field
          label="Email"
          dense
          outlined
          v-model="item.email"
        ></v-text-field>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <v-text-field
          label="Mobile Number"
          dense
          outlined
          v-model="item.mobileNumber"
        ></v-text-field>
      </v-layout>
      <br />

      <v-layout>
        <v-btn small>Save Profile</v-btn>
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
  margin: 20%;
  margin-top: 5%;
}
</style>
