import { Router } from "express";

import { auth, requireRole } from "../../middleware/auth";
import {
  createIssueHandler,
  deleteIssueHandler,
  getIssueHandler,
  getIssuesHandler,
  updateIssueHandler,
} from "./issue.controller";

export const issueRouter = Router();

issueRouter.post("/", auth, createIssueHandler);
issueRouter.get("/", getIssuesHandler);
issueRouter.get("/:id", getIssueHandler);
issueRouter.patch("/:id", auth, updateIssueHandler);
issueRouter.delete("/:id", requireRole("maintainer"), deleteIssueHandler);
