import type { RequestHandler } from "express";
import { getUserById } from "../services/auth.service";
import type { AuthenticatedUser } from "../types/user.types";
import { AppError } from "../utils/app-error";
import { verifyToken } from "../utils/jwt";

const BEARER_SCHEME = "bearer";

export const authenticate: RequestHandler = async (req, _res, next): Promise<void> => {
  const authHeader = req.get("authorization");
  logAuthDebug("authorization header", authHeader ?? null);

  const token = extractBearerToken(authHeader);
  logAuthDebug("extracted token", token);

  if (!token) {
    next(new AppError("Unauthorized: token missing", 401));
    return;
  }

  try {
    const payload = verifyToken(token);
    logAuthDebug("decoded JWT payload", payload);

    const user = await getUserById(payload.userId);
    logFetchedUser(user);

    if (!user) {
      next(new AppError("Unauthorized: user not found", 401));
      return;
    }

    req.user = user;
    logAuthDebug("req.user assignment", req.user);
    next();
  } catch (error: unknown) {
    logAuthDebug("authentication failure", getErrorMessage(error));
    next(new AppError("Unauthorized: invalid token", 401));
  }
};

const extractBearerToken = (authHeader: string | undefined): string | null => {
  if (!authHeader) {
    return null;
  }

  const parts = authHeader.trim().split(/\s+/);
  const [scheme, token] = parts;

  if (parts.length !== 2 || scheme.toLowerCase() !== BEARER_SCHEME) {
    return null;
  }

  return token.length > 0 ? token : null;
};

const logFetchedUser = (user: AuthenticatedUser | null): void => {
  logAuthDebug("fetched user", user);
};

const logAuthDebug = (label: string, value: unknown): void => {
  console.log(`[auth] ${label}:`, value);
};

const getErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : "Unknown authentication error";
};
