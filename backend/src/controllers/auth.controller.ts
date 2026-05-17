import type { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";
import type { ApiResponse } from "../types/api.types";
import type { AuthenticatedUser } from "../types/user.types";
import { AppError } from "../utils/app-error";
import type { LoginInput, RegisterInput } from "../validators/auth.validator";

interface AuthResponseData {
  user: AuthenticatedUser;
  token: string;
}

type RegisterRequest = Request<Record<string, never>, ApiResponse<AuthResponseData>, RegisterInput>;
type LoginRequest = Request<Record<string, never>, ApiResponse<AuthResponseData>, LoginInput>;

export const register = async (req: RegisterRequest, res: Response<ApiResponse<AuthResponseData>>): Promise<void> => {
  const result = await registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "Registration successful",
    data: result,
  });
};

export const login = async (req: LoginRequest, res: Response<ApiResponse<AuthResponseData>>): Promise<void> => {
  const result = await loginUser(req.body);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
};

export const me = async (req: Request, res: Response<ApiResponse<{ user: AuthenticatedUser }>>): Promise<void> => {
  if (!req.user) {
    throw new AppError("Unauthorized", 401);
  }

  res.status(200).json({
    success: true,
    message: "Authenticated user fetched successfully",
    data: {
      user: req.user,
    },
  });
};
