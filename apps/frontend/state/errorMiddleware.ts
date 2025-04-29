import { isRejectedWithValue } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const rtkQueryErrorLogger = () => (next: any) => (action: any) => {
  if (isRejectedWithValue(action)) {
    const error = action.payload;
    let message = "Something went wrong!";

    if (error?.data) {
      if (typeof error.data === "string") {
        message = error.data;
      } else if (typeof error.data === "object" && "message" in error.data) {
        message = (error.data as { message?: string }).message ?? message;
      }
    }

    toast.error(message);
  }

  return next(action);
};
