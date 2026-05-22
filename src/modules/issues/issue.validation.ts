import { StatusCodes } from "http-status-codes";

import { IssueStatus, IssueType } from "../../types/common";
import { AppError } from "../../utils/AppError";
import {
  issueStatuses,
  issueTypes,
  oneOf,
  optionalOneOf,
  requiredString,
} from "../../utils/validators";

export const validateCreateIssueBody = (body: Record<string, unknown>) => {
  const title = requiredString(body.title, "title");
  const description = requiredString(body.description, "description");
  const type = oneOf(requiredString(body.type, "type"), issueTypes, "type") as IssueType;

  if (title.length > 150) {
    throw new AppError(StatusCodes.BAD_REQUEST, "title must be at most 150 characters");
  }

  if (description.length < 20) {
    throw new AppError(StatusCodes.BAD_REQUEST, "description must be at least 20 characters");
  }

  return {
    title,
    description,
    type,
  };
};

export const validateIssueQuery = (query: Record<string, unknown>) => {
  const sortValue = query.sort === undefined ? "newest" : query.sort;

  if (typeof sortValue !== "string" || !["newest", "oldest"].includes(sortValue)) {
    throw new AppError(StatusCodes.BAD_REQUEST, "sort is invalid");
  }

  const type = optionalOneOf(query.type, issueTypes, "type") as IssueType | undefined;
  const status = optionalOneOf(query.status, issueStatuses, "status") as IssueStatus | undefined;

  return {
    sort: sortValue as "newest" | "oldest",
    type,
    status,
  };
};

export const validateIssueId = (id: string | string[]) => {
  if (Array.isArray(id)) {
    throw new AppError(StatusCodes.BAD_REQUEST, "id is invalid");
  }

  const issueId = Number(id);

  if (!Number.isInteger(issueId) || issueId < 1) {
    throw new AppError(StatusCodes.BAD_REQUEST, "id is invalid");
  }

  return issueId;
};
