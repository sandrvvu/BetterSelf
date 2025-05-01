import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "@/lib/constants/api";
import {
  CreateGoalDto,
  Goal,
  GoalWithCategoryName,
  UpdateGoalDto,
} from "@/lib/types/goal";
import { RootState } from "@/state/store";

export const goalApi = createApi({
  reducerPath: "goalApi",
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
  tagTypes: ["Goal"],
  endpoints: (builder) => ({
    createGoal: builder.mutation<Goal, CreateGoalDto>({
      query: (body) => ({
        url: `/goals`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Goal"],
    }),

    deleteGoal: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `goals/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Goal"],
    }),

    getGoals: builder.query<GoalWithCategoryName[], void>({
      query: () => ({
        url: `/goals`,
        method: "GET",
      }),
      providesTags: ["Goal"],
    }),

    getGoal: builder.query<Goal, string>({
      query: (id) => ({
        url: `goals/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Goal", id }],
    }),

    updateGoal: builder.mutation<Goal, { id: string; data: UpdateGoalDto }>({
      query: ({ id, data }) => ({
        url: `goals/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Goal"],
    }),
  }),
});

export const {
  useCreateGoalMutation,
  useDeleteGoalMutation,
  useUpdateGoalMutation,
  useGetGoalQuery,
  useGetGoalsQuery,
} = goalApi;
