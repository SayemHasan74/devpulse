import { StatusCodes } from "http-status-codes";

import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { getMetrics } from "./metrics.service";

export const getMetricsHandler = asyncHandler(async (_req, res) => {
  const metrics = await getMetrics();

  sendResponse(res, StatusCodes.OK, {
    message: "Metrics retrieved successfully",
    data: metrics,
  });
});
