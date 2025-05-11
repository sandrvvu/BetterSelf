"use-client";

import { useEffect } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui";
import { useDeleteTaskMutation } from "@/state/features/tasks/taskApi";

export default function DeleteTaskContent({
  id,
  onDelete,
}: {
  id: string;
  onDelete: () => void;
}) {
  const [deleteGoal, { data, isLoading, isSuccess }] = useDeleteTaskMutation();

  async function handleDelete(id: string) {
    await deleteGoal(id);
    onDelete();
  }

  useEffect(() => {
    if (isSuccess && data) {
      toast.success("Task deleted successfully.");
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
