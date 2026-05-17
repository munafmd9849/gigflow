import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import { getEnvConfig } from "../config/env";
import { AppError } from "./app-error";

interface TokenPayload {
  userId: string;
}

export const generateToken = (payload: TokenPayload): string => {
  const { jwtSecret, jwtExpiresIn } = getEnvConfig();
  const options: SignOptions = { expiresIn: jwtExpiresIn };

  return jwt.sign(payload, jwtSecret, options);
};

export const verifyToken = (token: string): TokenPayload => {
  const { jwtSecret } = getEnvConfig();
  const decoded = jwt.verify(token, jwtSecret);

  if (typeof decoded === "string" || !isTokenPayload(decoded)) {
    throw new AppError("Invalid token", 401);
  }

  return {
    userId: decoded.userId,
  };
};

const isTokenPayload = (payload: JwtPayload): payload is JwtPayload & TokenPayload => {
  return typeof payload.userId === "string" && payload.userId.length > 0;
};
