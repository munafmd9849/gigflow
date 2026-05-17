import { api } from "../lib/api";
import type { ApiResponse } from "../types/api.types";
import type { AuthResponse, LoginInput, RegisterInput } from "../types/auth.types";

export const login = async (input: LoginInput): Promise<AuthResponse> => {
  const response = await api.post<ApiResponse<AuthResponse>>("/auth/login", input);
  return response.data.data;
};

export const register = async (input: RegisterInput): Promise<AuthResponse> => {
  const response = await api.post<ApiResponse<AuthResponse>>("/auth/register", input);
  return response.data.data;
};
