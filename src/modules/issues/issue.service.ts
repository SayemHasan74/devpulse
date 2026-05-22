import { StatusCodes } from "http-status-codes";

import { IssueStatus, IssueType } from "../../types/common";
import { AppError } from "../../utils/AppError";
import {
  createIssue,
  deleteIssue,
  findIssueById,
  findIssues,
  findReportersByIds,
  updateIssue,
} from "./issue.repository";
import { IssueRow, IssueWithReporter, ReporterRow } from "./issue.types";

const addReporter = (issue: IssueRow, reporters: ReporterRow[]): IssueWithReporter => {
  const reporter = reporters.find((item) => item.id === issue.reporter_id) ?? null;

  return {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter,
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };
};

export const createNewIssue = async (
  title: string,
  description: string,
  type: IssueType,
  reporterId: number
) => {
  return createIssue(title, description, type, reporterId);
};

export const getIssues = async (
  sort: "newest" | "oldest",
  type?: IssueType,
  status?: IssueStatus
) => {
  const issues = await findIssues(sort, type, status);
  const reporterIds = [...new Set(issues.map((issue) => issue.reporter_id))];
  const reporters = await findReportersByIds(reporterIds);

  return issues.map((issue) => addReporter(issue, reporters));
};

export const getIssue = async (id: number) => {
  const issue = await findIssueById(id);

  if (!issue) {
    throw new AppError(StatusCodes.NOT_FOUND, "Issue not found");
  }

  const reporters = await findReportersByIds([issue.reporter_id]);

  return addReporter(issue, reporters);
};

export const updateExistingIssue = async (
  id: number,
  userId: number,
  userRole: string,
  title?: string,
  description?: string,
  type?: IssueType,
  status?: IssueStatus
) => {
  const issue = await findIssueById(id);

  if (!issue) {
    throw new AppError(StatusCodes.NOT_FOUND, "Issue not found");
  }

  if (userRole !== "maintainer") {
    if (issue.reporter_id !== userId) {
      throw new AppError(StatusCodes.FORBIDDEN, "Forbidden");
    }

    if (issue.status !== "open") {
      throw new AppError(StatusCodes.CONFLICT, "Only open issues can be updated");
    }

    if (!title || !description || !type || status) {
      throw new AppError(StatusCodes.FORBIDDEN, "Forbidden");
    }
  }

  return updateIssue(
    id,
    title,
    description,
    type,
    userRole === "maintainer" ? status : undefined
  );
};

export const deleteExistingIssue = async (id: number) => {
  const deletedIssue = await deleteIssue(id);

  if (!deletedIssue) {
    throw new AppError(StatusCodes.NOT_FOUND, "Issue not found");
  }

  return deletedIssue;
};
