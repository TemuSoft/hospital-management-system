<template>
  <div>
    <v-card class="main">
      <v-toolbar dense flat>
        <v-btn
          text
          class="text-capitalize"
          @click="$router.push({ name: 'staff' })"
        >
          <v-icon class="mx-3">mdi-arrow-left</v-icon>
          Go Back
        </v-btn>
        <v-spacer />
        Register Staff
        <v-spacer />
      </v-toolbar>
      <v-divider></v-divider>
      <br />

      <div>
        <v-layout>
          <v-flex xs12 sm1> </v-flex>
          <v-flex xs12 sm1> Full Name</v-flex>
          <v-flex xs12 sm4>
            <v-text-field dense outlined v-model="item.fullName"></v-text-field>
          </v-flex>
          <v-flex xs12 sm1> </v-flex>
          <v-flex xs12 sm1> Mobile</v-flex>
          <v-flex xs12 sm4>
            <v-text-field dense outlined v-model="item.mobile"></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs12 sm1> </v-flex>
          <v-flex xs12 sm1> Address</v-flex>
          <v-flex xs12 sm4>
            <v-text-field dense outlined v-model="item.address"></v-text-field>
          </v-flex>
          <v-flex xs12 sm1> </v-flex>
          <v-flex xs12 sm1> Email</v-flex>
          <v-flex xs12 sm4>
            <v-text-field dense outlined v-model="item.emial"></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs12 sm1> </v-flex>
          <v-flex xs12 sm1> Department</v-flex>
          <v-flex xs12 sm4>
            <v-autocomplete
              outlined
              dense
              :items="positionList"
              label="Positions"
              v-model="item.position"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12 sm1> </v-flex>
          <v-flex xs12 sm1> Date Birth</v-flex>
          <v-flex xs12 sm4>
            <v-text-field
              dense
              outlined
              v-model="item.dateBirth"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs12 sm2> </v-flex>
          <v-flex xs12 sm10>
            <v-btn small>Save</v-btn>
          </v-flex>
        </v-layout>
      </div>
      <br />
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: [],
      positionList: [
        "Adminstrator",
        "Human Resource",
        "Labratory",
        "Labratory Head",
        "OPD",
        "Medical Doctor",
        "Nurse",
        "Pharmacy",
        "Store",
      ],
    };
  },
};
</script>

<style scoped>
.main {
  margin: 7%;
  margin-top: 2%;
}
</style>
