import axios from "axios";
import { BASE_URL } from "../utils/constants";

const api = axios.create({
  baseURL: BASE_URL,
});

const values = localStorage.getItem("authValues");

if (values) {
  const data = JSON.parse(values!);
  api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
}

export default api;
