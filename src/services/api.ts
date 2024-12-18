import { createRequestAuthObj } from "@/lib/auth/auth";
import axios from "axios";

const baseApiUrl = process.env.NEXT_URL_API;

export const api = axios.create({
  baseURL: baseApiUrl,
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const request = await createRequestAuthObj();
  if (request.headers) {
    config.headers.Authorization = request.headers.Authorization;
  }
  return config;
});
