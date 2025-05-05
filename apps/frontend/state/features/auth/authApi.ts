import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "@/lib/constants/api";
import { AuthResponse, LoginRequest, RegisterRequest } from "@/lib/types/auth";

console.log(API_BASE_URL)
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (info) => ({
        url: "/auth/register",
        method: "POST",
        body: info,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
