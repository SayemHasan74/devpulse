import { Response } from "express";

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  payload: {
    message?: string;
    data?: T;
  }
) => {
  const response: {
    success: true;
    message?: string;
    data?: T;
  } = {
    success: true,
  };

  if (payload.message) {
    response.message = payload.message;
  }

  if (payload.data !== undefined) {
    response.data = payload.data;
  }

  res.status(statusCode).json(response);
};
