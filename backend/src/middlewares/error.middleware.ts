import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import type { ApiResponse } from "../types/api.types";
import { AppError } from "../utils/app-error";

interface ErrorWithCode extends Error {
  code?: number;
}

interface MongooseCastError extends Error {
  name: "CastError";
  path?: string;
}

export const notFound = (req: Request, _res: Response, next: NextFunction): void => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
};

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response<ApiResponse<never>>,
  _next: NextFunction,
): void => {
  if (error instanceof AppError) {
    logError(error, req);
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
    return;
  }

  if (error instanceof ZodError) {
    console.warn(`[error] 400 ${req.method} ${req.originalUrl}: ${error.issues[0]?.message ?? "Validation failed"}`);
    res.status(400).json({
      success: false,
      message: error.issues[0]?.message ?? "Validation failed",
    });
    return;
  }

  if (isDuplicateKeyError(error)) {
    console.warn(`[error] 409 ${req.method} ${req.originalUrl}: duplicate key`);
    res.status(409).json({
      success: false,
      message: "Email is already registered",
    });
    return;
  }

  if (isCastError(error)) {
    console.warn(`[error] 400 ${req.method} ${req.originalUrl}: invalid ${error.path ?? "id"}`);
    res.status(400).json({
      success: false,
      message: "Invalid resource id",
    });
    return;
  }

  console.error(`[error] 500 ${req.method} ${req.originalUrl}:`, error);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

const isDuplicateKeyError = (error: unknown): error is ErrorWithCode => {
  return error instanceof Error && "code" in error && (error as ErrorWithCode).code === 11000;
};

const isCastError = (error: unknown): error is MongooseCastError => {
  return error instanceof Error && error.name === "CastError";
};

const logError = (error: AppError, req: Request): void => {
  const logMessage = `[error] ${error.statusCode} ${req.method} ${req.originalUrl}: ${error.message}`;

  if (error.statusCode >= 500) {
    console.error(logMessage);
    return;
  }

  console.warn(logMessage);
};
