import { StatusCodes } from "http-status-codes";

import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import {
  createNewIssue,
  deleteExistingIssue,
  getIssue,
  getIssues,
  updateExistingIssue,
} from "./issue.service";
import {
  validateCreateIssueBody,
  validateIssueId,
  validateIssueQuery,
  validateUpdateIssueBody,
} from "./issue.validation";

export const createIssueHandler = asyncHandler(async (req, res) => {
  const data = validateCreateIssueBody(req.body as Record<string, unknown>);
  const issue = await createNewIssue(data.title, data.description, data.type, req.user!.id);

  sendResponse(res, StatusCodes.CREATED, {
    message: "Issue created successfully",
    data: issue,
  });
});

export const getIssuesHandler = asyncHandler(async (req, res) => {
  const query = validateIssueQuery(req.query as Record<string, unknown>);
  const issues = await getIssues(query.sort, query.type, query.status);

  sendResponse(res, StatusCodes.OK, {
    message: "Issues retrived successfully",
    data: issues,
  });
});

export const getIssueHandler = asyncHandler(async (req, res) => {
  const issueId = validateIssueId(req.params.id);
  const issue = await getIssue(issueId);

  sendResponse(res, StatusCodes.OK, {
    message: "Issue retrived successfully",
    data: issue,
  });
});

export const updateIssueHandler = asyncHandler(async (req, res) => {
  const issueId = validateIssueId(req.params.id);
  const data = validateUpdateIssueBody(req.body as Record<string, unknown>);
  const issue = await updateExistingIssue(
    issueId,
    req.user!.id,
    req.user!.role,
    data.title,
    data.description,
    data.type,
    data.status
  );

  sendResponse(res, StatusCodes.OK, {
    message: "Issue updated successfully",
    data: issue,
  });
});

export const deleteIssueHandler = asyncHandler(async (req, res) => {
  const issueId = validateIssueId(req.params.id);
  await deleteExistingIssue(issueId);

  sendResponse(res, StatusCodes.OK, {
    message: "Issue deleted successfully",
  });
});
