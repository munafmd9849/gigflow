import axios, { AxiosError } from "axios";
import type { ApiErrorResponse } from "../types/api.types";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const rawAuth = localStorage.getItem("gigflow-auth");

  if (!rawAuth) {
    return config;
  }

  const auth = parseStoredAuth(rawAuth);

  if (auth?.state.token) {
    config.headers.Authorization = `Bearer ${auth.state.token}`;
  }

  return config;
});

interface StoredAuthState {
  state: {
    token: string | null;
  };
}

const parseStoredAuth = (value: string): StoredAuthState | null => {
  try {
    const parsed: unknown = JSON.parse(value);

    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "state" in parsed &&
      typeof parsed.state === "object" &&
      parsed.state !== null &&
      "token" in parsed.state
    ) {
      return parsed as StoredAuthState;
    }

    return null;
  } catch {
    return null;
  }
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
