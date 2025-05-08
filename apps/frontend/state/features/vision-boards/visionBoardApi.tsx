import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  API_BASE_URL,
  CreateVisionBoardDto,
  Image,
  UpdateVisionBoardDto,
  VisionBoard,
  VisionBoardWithImages,
  VisionBoardWithPreviewImage,
} from "@/lib";
import { RootState } from "@/state/store";

export const visionBoardApi = createApi({
  reducerPath: "visionBoardApi",
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
  tagTypes: ["VisionBoard"],
  endpoints: (builder) => ({
    createVisionBoard: builder.mutation<VisionBoard, CreateVisionBoardDto>({
      query: (body) => ({
        url: `/vision-boards`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["VisionBoard"],
    }),

    deleteVisionBoard: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `vision-boards/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["VisionBoard"],
    }),

    getVisionBoards: builder.query<VisionBoardWithPreviewImage[], void>({
      query: () => ({
        url: `/vision-boards`,
        method: "GET",
      }),
      providesTags: ["VisionBoard"],
    }),

    getVisionBoard: builder.query<VisionBoardWithImages, string>({
      query: (id) => ({
        url: `vision-boards/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "VisionBoard", id }],
    }),

    uploadImageToBoard: builder.mutation<Image, { id: string; file: File }>({
      query: ({ id, file }) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: `vision-boards/${id}/upload`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "VisionBoard", id },
        "VisionBoard",
      ],
    }),

    removeImageFromBoard: builder.mutation<
      boolean,
      { boardId: string; imageId: string }
    >({
      query: ({ boardId, imageId }) => ({
        url: `vision-boards/${boardId}/image/${imageId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { boardId }) => [
        { type: "VisionBoard", id: boardId },
        "VisionBoard",
      ],
    }),

    updateVisionBoard: builder.mutation<
      VisionBoard,
      { id: string; data: UpdateVisionBoardDto }
    >({
      query: ({ id, data }) => ({
        url: `vision-boards/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["VisionBoard"],
    }),
  }),
});

export const {
  useCreateVisionBoardMutation,
  useDeleteVisionBoardMutation,
  useUpdateVisionBoardMutation,
  useGetVisionBoardQuery,
  useGetVisionBoardsQuery,
  useUploadImageToBoardMutation,
  useRemoveImageFromBoardMutation,
} = visionBoardApi;
