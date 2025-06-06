import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL, UserAnalytics } from "@/lib";
import { RootState } from "@/state/store";

export const analyticsApi = createApi({
  reducerPath: "analyticsApi",
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
  tagTypes: ["Analytics"],
  endpoints: (builder) => ({
    getUserAnalytics: builder.query<UserAnalytics, { months: number }>({
      query: ({ months }) => ({
        url: `analytics/overview?months=${months}`,
        method: "GET",
      }),
      providesTags: ["Analytics"],
    }),
  }),
});

export const { useGetUserAnalyticsQuery } = analyticsApi;
