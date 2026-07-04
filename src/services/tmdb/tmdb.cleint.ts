import axios, { AxiosInstance } from "axios";
import Logger from "@ptkdev/logger";
import { config } from "../../config";

const logger = new Logger();

export const tmdbClient: AxiosInstance = axios.create({
  baseURL: config.tmdb.baseUrl,
  headers: {
    Authorization: `Bearer ${config.tmdb.apiToken}`,
    "Content-Type": "application/json",
  },
  timeout: 1000,
  params: {
    language: "uk-UA",
  },
});

tmdbClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;
    logger.error(`[TMDB] ${status} ${url}.`);
    return Promise.reject(error);
  },
);
