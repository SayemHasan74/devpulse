import dotenv from "dotenv";
import { SignOptions } from "jsonwebtoken";

dotenv.config();

const required = (key: string) => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`${key} is required`);
  }

  return value;
};

const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS ?? 10);

if (!Number.isInteger(saltRounds) || saltRounds < 8 || saltRounds > 12) {
  throw new Error("BCRYPT_SALT_ROUNDS must be between 8 and 12");
}

export const env = {
  port: Number(process.env.PORT ?? 5000),
  databaseUrl: required("DATABASE_URL"),
  jwtSecret: required("JWT_SECRET"),
  jwtExpiresIn: (process.env.JWT_EXPIRES_IN ?? "7d") as SignOptions["expiresIn"],
  bcryptSaltRounds: saltRounds,
};
