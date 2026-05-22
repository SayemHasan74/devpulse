import { Router } from "express";

import { requireRole } from "../../middleware/auth";
import { getMetricsHandler } from "./metrics.controller";

export const metricsRouter = Router();

metricsRouter.get("/", requireRole("maintainer"), getMetricsHandler);
