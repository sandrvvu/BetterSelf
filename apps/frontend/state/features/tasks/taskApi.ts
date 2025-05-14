import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL, CreateTaskDto, Task, UpdateTaskDto } from "@/lib";
import { RootState } from "@/state/store";

export const taskApi = createApi({
  reducerPath: "taskApi",
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
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    createTask: builder.mutation<Task, CreateTaskDto>({
      query: (body) => ({
        url: `/tasks`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Task"],
    }),

    deleteTask: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),

    getTask: builder.query<Task, string>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Task", id }],
    }),

    getAvailableDependencies: builder.query<
      Task[],
      { goalId: string; taskId?: string }
    >({
      query: ({ goalId, taskId }) => {
        const params = new URLSearchParams({ goalId });
        if (taskId) params.append("taskId", taskId);

        return {
          url: `/tasks/available-dependencies?${params.toString()}`,
          method: "GET",
        };
      },
    }),

    updateTask: builder.mutation<Task, { id: string; data: UpdateTaskDto }>({
      query: ({ id, data }) => ({
        url: `tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useGetTaskQuery,
  useGetAvailableDependenciesQuery,
} = taskApi;
