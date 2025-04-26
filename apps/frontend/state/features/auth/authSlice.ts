import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse } from "./auth.type";
import { User } from "../user/userSlice";

export interface AuthState {
  token: string | null;
  authenticatedUser: User | null;
}

const initialState: AuthState = {
  token: null,
  authenticatedUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<AuthResponse>) {
      state.token = action.payload.accessToken;
      state.authenticatedUser = action.payload.user;
    },
    logout(state) {
      state.token = null;
      state.authenticatedUser = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
