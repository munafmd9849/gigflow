import bcrypt from "bcrypt";
import { UserModel } from "../models/user.model";
import type { AuthenticatedUser } from "../types/user.types";
import { AppError } from "../utils/app-error";
import { generateToken } from "../utils/jwt";
import { toAuthenticatedUser } from "../utils/user-response";
import type { LoginInput, RegisterInput } from "../validators/auth.validator";

interface AuthResult {
  user: AuthenticatedUser;
  token: string;
}

const SALT_ROUNDS = 12;

export const registerUser = async (input: RegisterInput): Promise<AuthResult> => {
  const existingUser = await UserModel.exists({ email: input.email });

  if (existingUser) {
    throw new AppError("Email is already registered", 409);
  }

  const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);

  const user = await UserModel.create({
    name: input.name,
    email: input.email,
    password: hashedPassword,
    role: input.role,
  });

  return buildAuthResult(toAuthenticatedUser(user));
};

export const loginUser = async (input: LoginInput): Promise<AuthResult> => {
  const user = await UserModel.findOne({ email: input.email }).select("+password");

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordMatches = await bcrypt.compare(input.password, user.password);

  if (!passwordMatches) {
    throw new AppError("Invalid credentials", 401);
  }

  return buildAuthResult(toAuthenticatedUser(user));
};

export const getUserById = async (userId: string): Promise<AuthenticatedUser> => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return toAuthenticatedUser(user);
};

const buildAuthResult = (user: AuthenticatedUser): AuthResult => {
  return {
    user,
    token: generateToken({ userId: user.id }),
  };
};
