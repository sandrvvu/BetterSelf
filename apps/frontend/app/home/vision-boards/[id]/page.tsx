"use client";

import { notFound, useRouter } from "next/navigation";
import { use, useState } from "react";
import { validate as isValidUUID } from "uuid";

import { AppCollapsible, Spinner } from "@/components/shared";
import {
  BoardBreadcrumb,
  BoardControls,
  ImageControls,
  MasontryLayout,
} from "@/components/vision-boards";
import {
  useGetVisionBoardQuery,
  useRemoveImageFromBoardMutation,
  useUploadImageToBoardMutation,
} from "@/state/features/vision-boards/visionBoardApi";

type Params = Promise<{ id: string }>;

export default function VisionBoard({ params }: { params: Params }) {
  const { id } = use(params);

  const router = useRouter();

  const { data: board, isLoading } = useGetVisionBoardQuery(id);
  const [uploadImage] = useUploadImageToBoardMutation();
  const [deleteImage] = useRemoveImageFromBoardMutation();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const onDelete = () => {
    setIsDeleteOpen(false);
    router.replace("/home/vision-boards");
  };

  const handleDeleteImage = async (imageId: string) => {
    await deleteImage({ boardId: id, imageId });
  };

  if ((!board && !isLoading) || !isValidUUID(id)) {
    notFound();
  }

  if (isLoading) return <Spinner />;
  if (!board) return null;

  return (
    <>
    <BoardBreadcrumb/>
      <div className="mt-4 flex items-start justify-between gap-8">
          <h1 className="text-3xl font-semibold all-break break-words">
            {board.title}
          </h1>
        <BoardControls
          board={board}
          isEditOpen={isEditOpen}
          setIsEditOpen={setIsEditOpen}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          onDelete={onDelete}
        />
      </div>

      <AppCollapsible description="Description">
          <p
            className="m-2 text-sm text-muted-foreground break-words"
            style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}
          >
            {board.description}
          </p>
        </AppCollapsible>

      <div className="flex justify-end mb-4">
        <ImageControls
          isDeleteMode={isDeleteMode}
          onToggleDeleteMode={() => setIsDeleteMode((prev) => !prev)}
          boardId={board.id}
          uploadImage={uploadImage}
        />
      </div>
      <MasontryLayout
        images={board.images.map((img) => ({
          id: img.id,
          src: img.source,
          alt: board.title,
          onDelete: isDeleteMode ? () => handleDeleteImage(img.id) : undefined,
        }))}
      />
    </>
  );
}
