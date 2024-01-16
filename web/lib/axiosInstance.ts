import axios from "axios";
import { backendUrl } from "./config";

export const axiosInstance = axios.create({
  baseURL: backendUrl,
});

axiosInstance.interceptors.request.use((req) => {
  const accessToken: string = localStorage.getItem("accessToken") || "";

  req.headers.Authorization = "Bearer " + accessToken;

  return req;
});
