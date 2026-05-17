import { api } from "../lib/api";
import type { ApiResponse } from "../types/api.types";
import type { AuthenticatedUser, AuthResponse, LoginInput, RegisterInput } from "../types/auth.types";

interface CurrentUserData {
  user: AuthenticatedUser;
}

export const login = async (input: LoginInput): Promise<AuthResponse> => {
  const response = await api.post<ApiResponse<AuthResponse>>("/auth/login", input);
  return response.data.data;
};

export const register = async (input: RegisterInput): Promise<AuthResponse> => {
  const response = await api.post<ApiResponse<AuthResponse>>("/auth/register", input);
  return response.data.data;
};

export const getCurrentUser = async (): Promise<AuthenticatedUser> => {
  const response = await api.get<ApiResponse<CurrentUserData>>("/auth/me");
  return response.data.data.user;
};
