"use-client";

import { useEffect } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui";
import { useDeleteCategoryMutation } from "@/state/features/categories/categoryApi";

export default function DeleteCategoryContent({
  id,
  onDelete,
}: {
  id: string;
  onDelete: () => void;
}) {
  const [deleteCategory, { data, isLoading, isSuccess }] =
    useDeleteCategoryMutation();

  async function handleDelete(id: string) {
    onDelete();
    await deleteCategory(id);
  }

  useEffect(() => {
    if (isSuccess && data) {
      toast.success("Category deleted successfully.");
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
