"use-client";

import { useEffect } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui";
import { useDeleteVisionBoardMutation } from "@/state/features/vision-boards/visionBoardApi";

export default function DeleteVisionBoardContent({
  id,
  onDelete,
}: {
  id: string;
  onDelete: () => void;
}) {
  const [deleteVisionBoard, { data, isLoading, isSuccess }] =
    useDeleteVisionBoardMutation();

  async function handleDelete(id: string) {
    onDelete();
    await deleteVisionBoard(id);
  }

  useEffect(() => {
    if (isSuccess && data) {
      toast.success("Vision board deleted successfully.");
    }
  }, [data, isSuccess]);

  return (
    <Button
      onClick={() => {
        void handleDelete(id);
      }}
      className="w-full bg-violet-600 text-white py-4 rounded-lg hover:bg-violet-700"
      disabled={isLoading}
    >
      {isLoading ? "Deleting..." : "Delete"}
    </Button>
  );
}
