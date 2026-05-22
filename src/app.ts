import cors from "cors";
import express from "express";
import { StatusCodes } from "http-status-codes";

import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFoundHandler";
import { authRouter } from "./modules/auth/auth.route";
import { issueRouter } from "./modules/issues/issue.route";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: "DevPulse API is running",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/issues", issueRouter);

app.use(notFoundHandler);
app.use(errorHandler);
