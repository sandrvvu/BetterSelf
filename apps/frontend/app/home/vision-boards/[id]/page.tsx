"use client";

import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { use, useState } from "react";
import { validate as isValidUUID } from "uuid";

import { AppCollapsible, Spinner } from "@/components/shared";
import { Badge } from "@/components/ui";
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
  const [isManageMode, setIsManageMode] = useState(false);

  const onDelete = () => {
    setIsDeleteOpen(false);
    router.replace("/home/vision-boards");
  };

  const handleDeleteImage = async (imageId: string) => {
    await deleteImage({ boardId: id, imageId });
  };

  const handleDuplicateImage = async (imageId: string) => {
    await deleteImage({ boardId: id, imageId });
  };

  if ((!board && !isLoading) || !isValidUUID(id)) {
    notFound();
  }

  if (isLoading) return <Spinner />;
  if (!board) return null;

  return (
    <>
      <BoardBreadcrumb />
      <div className="mt-4 flex items-start justify-between gap-8">
        <div>
          {board.goalTitle && (
            <Link href={`/home/goals/${board.goalId}`}>
              <Badge
                className="mb-2 bg-violet-100 text-violet-700  hover:bg-violet-100 hover:text-violet-700"
                title={board.goalTitle}
              >
                {board.goalTitle}
              </Badge>
            </Link>
          )}
          <h1 className="text-3xl font-semibold all-break break-words">
            {board.title}
          </h1>
        </div>
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
          isManageMode={isManageMode}
          onToggleMode={() => setIsManageMode((prev) => !prev)}
          boardId={board.id}
          uploadImage={uploadImage}
        />
      </div>
      <MasontryLayout
        isManageMode={isManageMode}
        boardId={board.id}
        images={board.images.map((img) => ({
          id: img.id,
          src: img.source,
          alt: board.title,
          onDelete: () => handleDeleteImage(img.id),
          onDuplicate: () => handleDuplicateImage(img.id),
        }))}
      />
    </>
  );
}
