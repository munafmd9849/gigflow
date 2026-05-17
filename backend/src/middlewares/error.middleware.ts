import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import type { ApiResponse } from "../types/api.types";
import { AppError } from "../utils/app-error";

interface ErrorWithCode extends Error {
  code?: number;
}

export const notFound = (req: Request, _res: Response, next: NextFunction): void => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
};

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response<ApiResponse<never>>,
  _next: NextFunction,
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: error.issues[0]?.message ?? "Validation failed",
    });
    return;
  }

  if (isDuplicateKeyError(error)) {
    res.status(409).json({
      success: false,
      message: "Email is already registered",
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

const isDuplicateKeyError = (error: unknown): error is ErrorWithCode => {
  return error instanceof Error && "code" in error && (error as ErrorWithCode).code === 11000;
};
