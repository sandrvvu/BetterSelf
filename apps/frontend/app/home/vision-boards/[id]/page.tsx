"use client";

import { PencilOff, Trash2 } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { use, useState } from "react";
import { validate as isValidUUID } from "uuid";

import { Spinner } from "@/components/shared";
import { Button } from "@/components/ui";
import {
  DeleteVisionBoardDialog,
  EditVisionBoardDialog,
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

  const handleDelete = () => {
    setIsDeleteOpen(false);
    router.replace("/home/vision-boards");
  };

  const handleDeleteImage = async (imageId: string) => {
    try {
      await deleteImage({ boardId: id, imageId });
    } catch (err) {
      console.error("Failed to delete image:", err);
    }
  };

  if ((!board && !isLoading) || !isValidUUID(id)) {
    notFound();
  }

  if (isLoading) return <Spinner />;
  if (!board) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div className="">
          <h1 className="text-4xl font-bold text-purple-800 break-words">
            {board.title}
          </h1>
          <p className="text-muted-foreground mt-2 break-words w-5/6">
            {board.description}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            className="border text-md border-neutral-500 bg-white text-neutral-800 py-4 rounded-lg hover:bg-purple-600 hover:text-white shadow-lg"
            onClick={() => setIsEditOpen(true)}
          >
            <PencilOff />
          </Button>
          <Button
            className="border text-md border-neutral-500 bg-white text-neutral-800 py-4 rounded-lg hover:bg-purple-600 hover:text-white shadow-lg"
            onClick={() => setIsDeleteOpen(true)}
          >
            <Trash2 />
          </Button>
        </div>
      </div>

      <ImageControls
        isDeleteMode={isDeleteMode}
        onToggleDeleteMode={() => setIsDeleteMode((prev) => !prev)}
        boardId={board.id}
        uploadImage={uploadImage}
      />

      <MasontryLayout
        images={board.images.map((img) => ({
          id: img.id,
          src: img.source,
          alt: board.title,
          onDelete: isDeleteMode ? () => handleDeleteImage(img.id) : undefined,
        }))}
      />

      <EditVisionBoardDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        id={board.id}
        title={board.title}
        description={board.description}
      />

      <DeleteVisionBoardDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        id={board.id}
        onDelete={handleDelete}
      />
    </div>
  );
}
