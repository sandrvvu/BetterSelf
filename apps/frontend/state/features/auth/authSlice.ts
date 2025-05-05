import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthResponse, User } from "@/lib";

export type AuthState = {
  token: string | null;
  authenticatedUser: User | null;
  isLoaded: boolean;
}

const initialState: AuthState = {
  token: null,
  authenticatedUser: null,
  isLoaded: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<AuthResponse>) {
      state.token = action.payload.accessToken;
      state.authenticatedUser = action.payload.user;
      state.isLoaded = true;

      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.token = null;
      state.authenticatedUser = null;
       state.isLoaded = true;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
    loadFromStorage: (state) => {
      const token = localStorage.getItem("accessToken");
      const user = localStorage.getItem("user");

      if (token && user) {
        state.token = token;
        state.authenticatedUser = JSON.parse(user) as User;
      }

      state.isLoaded = true;
    },
  },
});

export const { setCredentials, logout, loadFromStorage } = authSlice.actions;
export default authSlice.reducer;
