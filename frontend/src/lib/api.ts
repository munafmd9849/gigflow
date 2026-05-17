import axios, { AxiosError } from "axios";
import { useAuthStore } from "../stores/auth.store";
import type { ApiErrorResponse } from "../types/api.types";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (error instanceof AxiosError && error.response?.status === 401) {
      useAuthStore.getState().logout();

      if (window.location.pathname !== "/login" && window.location.pathname !== "/register") {
        window.location.assign("/login");
      }
    }

    return Promise.reject(error);
  },
);

export const isUnauthorizedError = (error: unknown): boolean => {
  return error instanceof AxiosError && error.response?.status === 401;
};

export const getApiErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const response = error.response?.data as ApiErrorResponse | undefined;
    return response?.message ?? error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
};
