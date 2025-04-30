import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface ErrorData {
  message?: string;
  [key: string]: unknown;
}

interface RejectedAction {
  payload?: {
    data?: string | ErrorData;
    status?: number;
    [key: string]: unknown;
  };
  type: string;
}

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const error = action as RejectedAction;
    const errorData = error.payload?.data;
    let message = "Something went wrong!";

    if (typeof errorData === "string") {
      message = errorData;
    } else if (
      typeof errorData === "object" &&
      errorData &&
      "message" in errorData
    ) {
      message = errorData.message ?? message;
    }

    toast.error(message);
  }

  return next(action);
};
