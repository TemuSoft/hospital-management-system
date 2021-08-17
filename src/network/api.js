import axios from "axios";
import { API_ROOT } from "./root";

// export default axios.create({
//   baseURL: "http://localhost:8080/api",
//   headers: {
//     "Content-type": "application/json"
//   }
// });

const request = axios.create({
  baseURL: API_ROOT !== undefined ? API_ROOT : "//trackerapp.local/",
});

request.CancelToken = axios.CancelToken;
request.isCancel = axios.isCancel;

/*
 * The interceptor here ensures that we check for the token in local storage every time an request is made
 */
request.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("authtoken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default request;
