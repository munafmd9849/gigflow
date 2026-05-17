import type { NextFunction, Request, Response } from "express";
import { getUserById } from "../services/auth.service";
import { AppError } from "../utils/app-error";
import { verifyToken } from "../utils/jwt";

export const authenticate = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    next(new AppError("Unauthorized", 401));
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    next(new AppError("Unauthorized", 401));
    return;
  }

  try {
    const payload = verifyToken(token);
    req.user = await getUserById(payload.userId);
    next();
  } catch {
    next(new AppError("Unauthorized", 401));
  }
};
