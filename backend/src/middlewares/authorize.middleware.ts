import type { NextFunction, Request, Response } from "express";
import { UserRole } from "../types/user.types";
import { AppError } from "../utils/app-error";

export const authorize =
  (...roles: UserRole[]) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AppError("Unauthorized", 401));
      return;
    }

    if (!roles.includes(req.user.role)) {
      next(new AppError("Forbidden", 403));
      return;
    }

    next();
  };
