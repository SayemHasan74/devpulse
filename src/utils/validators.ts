import { StatusCodes } from "http-status-codes";

import { IssueStatus, IssueType, Role } from "../types/common";
import { AppError } from "./AppError";

export const roles: Role[] = ["contributor", "maintainer"];
export const issueTypes: IssueType[] = ["bug", "feature_request"];
export const issueStatuses: IssueStatus[] = ["open", "in_progress", "resolved"];

export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

export const requiredString = (value: unknown, field: string) => {
  if (!isString(value) || value.trim().length === 0) {
    throw new AppError(StatusCodes.BAD_REQUEST, `${field} is required`);
  }

  return value.trim();
};

export const optionalString = (value: unknown, field: string) => {
  if (value === undefined) {
    return undefined;
  }

  if (!isString(value) || value.trim().length === 0) {
    throw new AppError(StatusCodes.BAD_REQUEST, `${field} is invalid`);
  }

  return value.trim();
};

export const oneOf = <T extends string>(value: string, allowed: T[], field: string) => {
  if (!allowed.includes(value as T)) {
    throw new AppError(StatusCodes.BAD_REQUEST, `${field} is invalid`);
  }

  return value as T;
};

export const optionalOneOf = <T extends string>(
  value: unknown,
  allowed: T[],
  field: string
) => {
  if (value === undefined) {
    return undefined;
  }

  if (!isString(value)) {
    throw new AppError(StatusCodes.BAD_REQUEST, `${field} is invalid`);
  }

  return oneOf(value, allowed, field);
};

export const emailIsValid = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
