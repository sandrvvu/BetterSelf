import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL, UpdateUserDto, User } from "@/lib";
import { RootState } from "@/state/store";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => `auth/profile`,
    }),

    updateUser: builder.mutation<User, UpdateUserDto>({
      query: (data) => ({
        url: "users",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation<boolean, void>({
      query: () => ({
        url: "users",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
