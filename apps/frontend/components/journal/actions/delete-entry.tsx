"use-client";

import { useEffect } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui";
import { useDeleteEntryMutation } from "@/state/features/journal/journalApi";

export default function DeleteEntryContent({
  id,
  onDelete,
}: {
  id: string;
  onDelete: () => void;
}) {
  const [deleteEntry, { data, isLoading, isSuccess }] =
    useDeleteEntryMutation();

  async function handleDelete(id: string) {
    onDelete();
    await deleteEntry(id);
  }

  useEffect(() => {
    if (isSuccess && data) {
      toast.success("Entry deleted successfully.");
    }
  }, [onDelete, data, isSuccess]);

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
