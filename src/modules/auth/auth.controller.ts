import { StatusCodes } from "http-status-codes";

import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { signupUser } from "./auth.service";
import { validateSignupBody } from "./auth.validation";

export const signup = asyncHandler(async (req, res) => {
  const data = validateSignupBody(req.body as Record<string, unknown>);
  const user = await signupUser(data.name, data.email, data.password, data.role);

  sendResponse(res, StatusCodes.CREATED, {
    message: "User registered successfully",
    data: user,
  });
});
