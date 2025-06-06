import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL, CreateEntryDto, Entry, UpdateEntryDto } from "@/lib/";
import { RootState } from "@/state/store";

export const journalApi = createApi({
  reducerPath: "journalApi",
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
  tagTypes: ["Entry"],
  endpoints: (builder) => ({
    createEntry: builder.mutation<Entry, CreateEntryDto>({
      query: (body) => ({
        url: `/entries`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Entry"],
    }),

    deleteEntry: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `entries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Entry"],
    }),

    getEntries: builder.query<Entry[], { title?: string; goalId?: string }>({
      query: (filters) => ({
        url: `/entries`,
        method: "GET",
        params: filters,
      }),
      providesTags: ["Entry"],
    }),

    getEntry: builder.query<Entry, string>({
      query: (id) => ({
        url: `entries/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Entry", id }],
    }),

    updateEntry: builder.mutation<Entry, { id: string; data: UpdateEntryDto }>({
      query: ({ id, data }) => ({
        url: `entries/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Entry"],
    }),
  }),
});

export const {
  useCreateEntryMutation,
  useDeleteEntryMutation,
  useUpdateEntryMutation,
  useGetEntryQuery,
  useGetEntriesQuery,
} = journalApi;
