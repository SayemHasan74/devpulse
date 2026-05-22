import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";

import { env } from "../../config/env";
import { Role } from "../../types/common";
import { AppError } from "../../utils/AppError";
import { createUser, findUserByEmail } from "./auth.repository";

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
