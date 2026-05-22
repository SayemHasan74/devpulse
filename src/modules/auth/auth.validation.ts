import { StatusCodes } from "http-status-codes";

import { Role } from "../../types/common";
import { AppError } from "../../utils/AppError";
import { emailIsValid, oneOf, requiredString, roles } from "../../utils/validators";

export const validateSignupBody = (body: Record<string, unknown>) => {
  const name = requiredString(body.name, "name");
  const email = requiredString(body.email, "email").toLowerCase();
  const password = requiredString(body.password, "password");
  const roleValue = body.role === undefined ? "contributor" : requiredString(body.role, "role");

  if (!emailIsValid(email)) {
    throw new AppError(StatusCodes.BAD_REQUEST, "email is invalid");
  }

  const role = oneOf(roleValue, roles, "role") as Role;

  return {
    name,
    email,
    password,
    role,
  };
};

export const validateLoginBody = (body: Record<string, unknown>) => {
  const email = requiredString(body.email, "email").toLowerCase();
  const password = requiredString(body.password, "password");

  if (!emailIsValid(email)) {
    throw new AppError(StatusCodes.BAD_REQUEST, "email is invalid");
  }

  return {
    email,
    password,
  };
};
