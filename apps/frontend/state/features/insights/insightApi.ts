import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  API_BASE_URL,
  ChatMessage,
  Reflection,
  ReflectionPreview,
  ReflectionPrompt,
  ReflectionWithMessages,
} from "@/lib";
import { RootState } from "@/state/store";

export const insightApi = createApi({
  reducerPath: "insightApi",
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
  tagTypes: ["Insight"],
  endpoints: (builder) => ({
    createInsightChat: builder.mutation<Reflection, void>({
      query: (body) => ({
        url: `/reflections`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Insight"],
    }),

    sendInsightPrompt: builder.mutation<
      ChatMessage,
      { id: string; data: ReflectionPrompt }
    >({
      query: ({ id, data }) => ({
        url: `reflections/${id}/chat`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Insight"],
    }),

    deleteInsightChat: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `reflections/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Insight"],
    }),

    getInsightsPreview: builder.query<ReflectionPreview[], void>({
      query: () => ({
        url: `/reflections`,
        method: "GET",
      }),
      providesTags: ["Insight"],
    }),

    getInsightChat: builder.query<ReflectionWithMessages, string>({
      query: (id) => ({
        url: `reflections/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Insight", id }],
    }),
  }),
});

export const {
  useCreateInsightChatMutation,
  useSendInsightPromptMutation,
  useDeleteInsightChatMutation,
  useGetInsightChatQuery,
  useGetInsightsPreviewQuery,
} = insightApi;
