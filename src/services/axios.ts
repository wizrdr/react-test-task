import axios from "axios";
import { BASE_URL } from "../config";

export const axiosService = axios.create({
  baseURL: `${BASE_URL}`,
  headers: { "Content-Type": "application/json" },
  timeout: 0,
  maxRedirects: 0,
});
