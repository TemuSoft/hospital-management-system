<template>
  <div class="main">
    <v-card flat>
      <h3>Change Password</h3>
      <br />
      <br />

      <v-form @submit.prevent="change" ref="change">
        <v-layout>
          <v-text-field
            label="Old Password"
            dense
            outlined
            v-model="passwordInfo.old_password"
            :rules="inputRule"
          />
        </v-layout>

        <v-layout>
          <v-text-field
            label="New Password"
            dense
            outlined
            v-model="passwordInfo.new_password"
            :rules="inputRule"
          />
          <v-spacer />

          <v-text-field
            dense
            label="Confirm Password"
            outlined
            v-model="passwordInfo.confirm_password"
            :rules="inputRule"
          />
        </v-layout>
        <br />

        <v-layout>
          <v-btn small class="green text-capitalize" @click="change()">
            Change Password
          </v-btn>
        </v-layout>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import AccountService from "@/network/accountService";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      login_user: AccountService.getProfile(),
      inputRule: [(v) => !!v || "This field is required!"],

      passwordInfo: {},
    };
  },

  computed: {
    ...mapState("security", ["changedPassword"]),
  },

  methods: {
    ...mapActions("security", ["changePassword"]),

    async change() {
      if (this.$refs.change.validate()) {
        this.passwordInfo.user_id = this.login_user.id;
        let olp = this.passwordInfo.new_password;
        let np = this.passwordInfo.confirm_password;

        if (olp.toString() != np.toString())
          this.$fire({
            title: "Password Change!",
            text: "New password is not the same",
            type: "error",
            timer: 7000,
          });
        else {
          await this.changePassword(this.passwordInfo);

          if (this.changedPassword.st === true) {
            this.passwordInfo = {};
            this.$router.push({ name: "dashboard" });
          } else {
            this.$fire({
              title: "Password Change!",
              text: this.changedPassword.msg,
              type: "error",
              timer: 7000,
            });
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.main {
  margin: 30%;
  margin-top: 5%;
}
</style>
