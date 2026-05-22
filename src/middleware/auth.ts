import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { RequestHandler } from "express";

import { env } from "../config/env";
import { Role } from "../types/common";
import { AppError } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";

interface JwtPayload {
  id: number;
  name: string;
  role: Role;
}

export const auth = asyncHandler(async (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;

    req.user = {
      id: decoded.id,
      name: decoded.name,
      role: decoded.role,
    };

    next();
  } catch {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Unauthorized");
  }
});

export const requireRole = (...roles: Role[]) => {
  const roleGuard: RequestHandler = (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      next(new AppError(StatusCodes.FORBIDDEN, "Forbidden"));
      return;
    }

    next();
  };

  return [auth, roleGuard];
};
