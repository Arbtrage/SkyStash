import axios from "axios";
import { backendUrl } from "./config";

export const axiosInstance = axios.create({
  baseURL: backendUrl,
});