import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { isTokenExpired } from "@/lib";
import { loadFromStorage, logout } from "@/state/features/auth/authSlice";

export const useAuthInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token && isTokenExpired(token)) {
      dispatch(logout());
    } else {
      dispatch(loadFromStorage());
    }
  }, [dispatch]);
};
