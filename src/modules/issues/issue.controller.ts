import { StatusCodes } from "http-status-codes";

import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { createNewIssue, getIssue, getIssues } from "./issue.service";
import {
  validateCreateIssueBody,
  validateIssueId,
  validateIssueQuery,
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
    data: issues,
  });
});

export const getIssueHandler = asyncHandler(async (req, res) => {
  const issueId = validateIssueId(req.params.id);
  const issue = await getIssue(issueId);

  sendResponse(res, StatusCodes.OK, {
    data: issue,
  });
});
