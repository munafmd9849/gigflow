import type { SignOptions } from "jsonwebtoken";

interface EnvConfig {
  jwtSecret: string;
  jwtExpiresIn: SignOptions["expiresIn"];
  port: number;
}

const parsePort = (value: string | undefined): number => {
  if (!value) {
    return 5000;
  }

  const port = Number(value);

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("PORT must be a positive integer");
  }

  return port;
};

export const getEnvConfig = (): EnvConfig => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is required");
  }

  return {
    jwtSecret,
    jwtExpiresIn: (process.env.JWT_EXPIRES_IN ?? "7d") as SignOptions["expiresIn"],
    port: parsePort(process.env.PORT),
  };
};
