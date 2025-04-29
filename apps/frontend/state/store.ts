import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./features/user/userApi";
import userReducer from "./features/user/userSlice";
import { authApi } from "./features/auth/authApi";
import authReducer from "./features/auth/authSlice";
import { categoryApi } from "./features/categories/categoryApi";
import { rtkQueryErrorLogger } from "./errorMiddleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      rtkQueryErrorLogger,
      userApi.middleware,
      authApi.middleware,
      categoryApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

