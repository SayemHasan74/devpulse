import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import { env } from "../../config/env";
import { Role } from "../../types/common";
import { AppError } from "../../utils/AppError";
import { createUser, findUserByEmail } from "./auth.repository";
import { TokenPayload } from "./auth.types";

export const signupUser = async (
  name: string,
  email: string,
  password: string,
  role: Role
) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, env.bcryptSaltRounds);

  return createUser(name, email, hashedPassword, role);
};

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
  }

  const passwordMatched = await bcrypt.compare(password, user.password);

  if (!passwordMatched) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
  }

  const payload: TokenPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
  };

  const token = jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    },
  };
};
