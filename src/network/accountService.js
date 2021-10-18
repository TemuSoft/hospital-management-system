import { api, path } from "./";
import Router from "@/router";
export const ACCESS_TOKEN_KEY = "token";

export const PROFILE_KEY = "profile";

const AccountService = {
  login(email, password) {
    return api
      .login(email, password, path.login)
      .then((res) => {
        res = res.data;

        if (res && res.token) {
          localStorage.setItem(ACCESS_TOKEN_KEY, res.token);
          localStorage.setItem(PROFILE_KEY, JSON.stringify(res));
          return Promise.resolve(true);
        } else return Promise.resolve(false);
      })
      .catch(() => {
        return Promise.resolve(false);
      });
  },

  async logout() {
    // clear local storage
    this.logoutClientOnly();

    // logout the user on the API
    await api.logout(path.logout);
  },

  logoutClientOnly() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(PROFILE_KEY);
    Router.push({
      name: "login",
    });
    Router.go();
  },

  updateToken(token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),

  getProfile: () => JSON.parse(localStorage.getItem(PROFILE_KEY)),

  getRole() {
    return this.getProfile() && this.getProfile().role;
  },

  isAuthenticated: () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token !== null && token !== "undefined";
  },
};

export default AccountService;
