import { configureStore } from "@reduxjs/toolkit";

import { rtkQueryErrorLogger } from "./errorMiddleware";
import { authApi } from "./features/auth/authApi";
import authReducer from "./features/auth/authSlice";
import { categoryApi } from "./features/categories/categoryApi";
import { goalApi } from "./features/goals/goalApi";
import { userApi } from "./features/user/userApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [goalApi.reducerPath]: goalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      rtkQueryErrorLogger,
      userApi.middleware,
      authApi.middleware,
      categoryApi.middleware,
      goalApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
