import axios from "axios";
import { API_ROOT } from "./root";

export default axios.create({
  baseURL: API_ROOT,
  headers: {
    "Content-type": "application/json",
  },
});
