import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  API_BASE_URL,
  Category,
  CategoryWithGoalCount,
  CreateCategoryDto,
  Goal,
  UpdateCategoryDto,
} from "@/lib";
import { RootState } from "@/state/store";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
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
  tagTypes: ["Category", "CategoryWithGoalCount", "Goals"],
  endpoints: (builder) => ({
    createCategory: builder.mutation<Category, CreateCategoryDto>({
      query: (body) => ({
        url: `/categories`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Category", "CategoryWithGoalCount"],
    }),

    deleteCategory: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category", "CategoryWithGoalCount"],
    }),

    getCategories: builder.query<CategoryWithGoalCount[], void>({
      query: () => ({
        url: `/categories`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    getCategory: builder.query<Category, string>({
      query: (id) => ({
        url: `categories/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Category", id }],
    }),

    updateCategory: builder.mutation<
      Category,
      { id: string; data: UpdateCategoryDto }
    >({
      query: ({ id, data }) => ({
        url: `categories/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Category", "CategoryWithGoalCount"],
    }),
    getGoalsByCategory: builder.query<Goal[], string>({
      query: (id) => ({
        url: `categories/${id}/goals`,
        method: "GET",
      }),
      providesTags: ["Goals"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoryQuery,
  useGetGoalsByCategoryQuery,
} = categoryApi;
