import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/lib/constants/api";
import { RootState } from "@/state/store";
import { Category, CategoryWithGoalCount } from "./category.type";

type CreateCategoryDto = {
  name?: string;
  description?: string;
};

type UpdateCategoryDto = {
  name?: string;
  description?: string;
};

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
  tagTypes: ["Category", "CategoryWithGoalCount"],
  endpoints: (builder) => ({
    createCategory: builder.mutation<Category, CreateCategoryDto>({
      query: (body) => ({
        url: `/categories`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    getCategories: builder.query<CategoryWithGoalCount[], void>({
      query: () => ({
        url: `/categories`,
        method: "GET",
      }),
      providesTags: ["CategoryWithGoalCount"],
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
      invalidatesTags: ["Category"],
    }),
    //     getGoalsByCategory: builder.query<Goal[], string>({
    //     query: (id) => ({
    //       url: `/${id}/goals`,
    //       method: "GET",
    //     }),
    //     providesTags: ["Goals"],
    //   }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoryQuery,
} = categoryApi;
