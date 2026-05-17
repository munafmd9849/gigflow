import type { RequestHandler } from "express";
import { getUserById } from "../services/auth.service";
import { AppError } from "../utils/app-error";
import { verifyToken } from "../utils/jwt";

const BEARER_SCHEME = "bearer";

export const authenticate: RequestHandler = async (req, _res, next): Promise<void> => {
  const authHeader = req.get("authorization");
  const token = extractBearerToken(authHeader);

  if (!token) {
    next(new AppError("Unauthorized: token missing", 401));
    return;
  }

  try {
    const payload = verifyToken(token);
    const user = await getUserById(payload.userId);

    if (!user) {
      next(new AppError("Unauthorized: user not found", 401));
      return;
    }

    req.user = user;
    next();
  } catch {
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
