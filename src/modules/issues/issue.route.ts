import { Router } from "express";

import { auth } from "../../middleware/auth";
import {
  createIssueHandler,
  getIssueHandler,
  getIssuesHandler,
} from "./issue.controller";

export const issueRouter = Router();

issueRouter.post("/", auth, createIssueHandler);
issueRouter.get("/", getIssuesHandler);
issueRouter.get("/:id", getIssueHandler);
