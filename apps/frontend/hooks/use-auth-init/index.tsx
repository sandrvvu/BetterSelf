import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { loadFromStorage } from "@/state/features/auth/authSlice";

export const useAuthInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);
};
