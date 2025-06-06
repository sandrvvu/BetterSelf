import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { rtkQueryErrorLogger } from "./errorMiddleware";
import { analyticsApi } from "./features/analytics/analyticsApi";
import { authApi } from "./features/auth/authApi";
import authReducer from "./features/auth/authSlice";
import { categoryApi } from "./features/categories/categoryApi";
import { goalApi } from "./features/goals/goalApi";
import { insightApi } from "./features/insights/insightApi";
import { journalApi } from "./features/journal/journalApi";
import { taskApi } from "./features/tasks/taskApi";
import { userApi } from "./features/users/userApi";
import { visionBoardApi } from "./features/vision-boards/visionBoardApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [goalApi.reducerPath]: goalApi.reducer,
    [journalApi.reducerPath]: journalApi.reducer,
    [insightApi.reducerPath]: insightApi.reducer,
    [visionBoardApi.reducerPath]: visionBoardApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [analyticsApi.reducerPath]: analyticsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(rtkQueryErrorLogger)
      .concat(userApi.middleware)
      .concat(authApi.middleware)
      .concat(categoryApi.middleware)
      .concat(goalApi.middleware)
      .concat(journalApi.middleware)
      .concat(insightApi.middleware)
      .concat(visionBoardApi.middleware)
      .concat(taskApi.middleware)
      .concat(analyticsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
