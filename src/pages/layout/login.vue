<template>
  <v-app class="cover">
    <div style="margin-top: 5%">
      <center><h1>Hospital Management System</h1></center>
    </div>
    <v-card width="650" class="mx-auto mt-5">
      <v-card-title>Login</v-card-title>
      <v-content style="padding: 10%">
        <div class="rightDiv">
          <v-form @submit.prevent="login" ref="login">
            <v-alert v-if="authError" :value="true" type="error">{{
              authError
            }}</v-alert>
            <v-text-field
              label="User Name"
              outlined
              dense
              required
              placeholder="username"
              prepend-inner-icon="mdi-account-circle"
              v-model="user.email"
              type="text"
            />

            <v-text-field
              label="Password"
              outlined
              prepend-inner-icon="mdi-lock"
              dense
              v-model="user.password"
              type="password"
            />

            <v-btn
              :loading="loading"
              block
              outlined
              rounded
              color="grey"
              type="submit"
              @click="login"
              >Sign In</v-btn
            >
          </v-form>
        </div>
      </v-content>
    </v-card>
  </v-app>
</template>

<script>
import AccountService from "@/network/accountService";

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      authError: false,
      user: {},
    };
  },
  methods: {
    login() {
      if (this.$refs.login.validate()) {
        AccountService.login(this.user.email, this.user.password).then(() => {
          this.$router.go();
        });
      }
    },
  },
};
</script>

<style scoped>
.cover {
  background-image: url("../../assets/images/icon.png");
  background-position: fit;
  background-size: cover;
}
.mainDiv {
  width: 34%;
  padding: 2%;
  margin: 33%;
  margin-top: 10%;
  border-radius: 30px;
  background-color: rgb(218, 217, 212);
}
.innerMainDiv {
  display: flex;
}
.leftDiv {
  width: 25%;
}
.leftDiv img {
  margin-top: 45%;
  height: 30vh;
  width: 5vw;
}
.rightDiv {
  width: 75%;
}
#textLogin {
  margin-top: 5%;
  margin-left: 3%;
  width: 95%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
