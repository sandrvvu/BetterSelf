"use-client";

import { useEffect } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui";
import { useDeleteInsightChatMutation } from "@/state/features/insights/insightApi";

export default function DeleteInsightContent({
  id,
  onDelete,
}: {
  id: string;
  onDelete: () => void;
}) {
  const [deleteInsightChat, { data, isLoading, isSuccess }] =
    useDeleteInsightChatMutation();

  async function handleDelete(id: string) {
    onDelete();
    await deleteInsightChat(id);
  }

  useEffect(() => {
    if (isSuccess && data) {
      toast.success("Insight chat deleted successfully.");
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
