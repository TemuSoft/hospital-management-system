<template>
  <v-app class="cover">
    <div class="mainDiv">
      <div class="innerMainDiv">
        <div class="leftDiv">
          <img src="@/assets/logo.png" width="60%" alt="alt" />
        </div>

        <div class="rightDiv">
          <v-flex xs12 pa-1>
            <v-row>
              <v-spacer />
              <img src="@/assets/logo.png" width="20%" alt="alt" />
              <v-spacer />
            </v-row>
          </v-flex>

          <v-flex xs12 pa-1>
            <v-row>
              <v-spacer />
              <h3 class="primary--text text-left py-2">Login</h3>
              <v-spacer />
            </v-row>
          </v-flex>

          <v-form @submit.prevent="login" class="pa-3">
            <v-alert v-if="authError" :value="true" type="error">{{
              authError
            }}</v-alert>
            <v-layout row wrap justify-center>
              <v-flex xs12 pa-1>
                <v-text-field
                  label="User Name"
                  outlined
                  dense
                  v-model="user.userName"
                  type="text"
                />
              </v-flex>
              <v-flex xs12 pa-1>
                <v-text-field
                  label="Password"
                  outlined
                  dense
                  v-model="user.password"
                  type="password"
                />
              </v-flex>
              <v-flex xs12 pa-1>
                <v-btn
                  :loading="loading"
                  block
                  outlined
                  rounded
                  color="green"
                  type="submit"
                  @click="login"
                  >Sign In</v-btn
                >
              </v-flex>
            </v-layout>
          </v-form>
        </div>
      </div>
      <v-btn text color="green" id="textLogin" class="text-lowercase">
        Powered by: Temesgen Kefie and Robel Milashu.
      </v-btn>
    </div>
  </v-app>
</template>

<script>
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
    login() {},
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
