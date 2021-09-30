<template>
  <div class="main">
    <v-card style="padding: 50px">
      <h1 style="color: green">Hospital Setting</h1>
      <br />

      <img class="card-image" :src="image" />
      <br />
      <br />

      <h3 style="color: green">{{ company[0].slogan }}</h3>
      <br />
      <v-layout>
        <v-text-field
          label="Hospital Name"
          dense
          outlined
          :readonly="true"
          v-model="company[0].name"
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <v-text-field
          label="Address"
          dense
          outlined
          :readonly="true"
          v-model="company[0].address"
        />
      </v-layout>
      <br />

      <v-layout>
        <v-text-field
          dense
          label="Country"
          outlined
          :readonly="true"
          v-model="company[0].country"
        ></v-text-field>
        <v-spacer />

        <v-text-field
          dense
          label="State"
          outlined
          :readonly="true"
          v-model="company[0].state"
        ></v-text-field>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <v-text-field
          dense
          label="City"
          outlined
          :readonly="true"
          v-model="company[0].city"
        ></v-text-field>
        <v-spacer />

        <v-text-field
          dense
          label="Postal Code"
          outlined
          :readonly="true"
          v-model="company[0].postal_code"
        ></v-text-field>
      </v-layout>
      <br />

      <v-layout>
        <v-text-field
          label="Email"
          dense
          outlined
          :readonly="true"
          v-model="company[0].email"
        ></v-text-field>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <v-text-field
          label="Mobile Number"
          dense
          outlined
          :readonly="true"
          v-model="company[0].mobile_number"
        ></v-text-field>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import { companyProfile } from "@/assets/company/companyProfile";
import image_url from "@/assets/company/company_logo.png";

export default {
  data() {
    return {
      image: "",
      company: [],
    };
  },

  created() {
    this.company = companyProfile;
    this.image = image_url;
    this.company[0].address = this.company[0].kebele;
  },
};
</script>

<style scoped>
.main {
  margin: 15%;
  margin-top: 5%;
}

.card-image {
  width: 150px;
  height: 150px;
  border-radius: 75px;
}
</style>
