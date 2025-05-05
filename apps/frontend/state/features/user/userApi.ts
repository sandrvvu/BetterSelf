import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL, User } from "@/lib";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getUserById: builder.query<User, number>({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const { useGetUserByIdQuery } = userApi;
