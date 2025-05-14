"use client";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { InsightCard, InsightsBreadcrumb } from "@/components/insights";
import { Spinner } from "@/components/shared";
import { Button } from "@/components/ui";
import {
  useCreateInsightChatMutation,
  useGetInsightsPreviewQuery,
} from "@/state/features/insights/insightApi";

export default function Insights() {
  const { data: previews, isLoading } = useGetInsightsPreviewQuery();

  const [createInsightChat, { data: chat, isLoading: isCreated, isSuccess }] =
    useCreateInsightChatMutation();

  useEffect(() => {
    if (isSuccess && chat) {
      toast.success("Insight chat added successfully.");
    }
  }, [isSuccess, chat]);

  if (isLoading || isCreated) {
    return <Spinner />;
  }

  return (
    <>
      <InsightsBreadcrumb />
      <div className="flex items-center justify-between my-4">
        <h1 className="text-3xl font-semibold">My insights</h1>
        <Button
          onClick={() => {
            void createInsightChat();
          }}
          className="border-2 text-md border-purple-700 bg-purple-700 text-white py-4 rounded-lg hover:bg-white hover:text-purple-700 shadow-lg"
        >
          Add insight
        </Button>
      </div>

      {previews && previews.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {previews.map((preview) => (
            <InsightCard key={preview.id} preview={preview} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg mt-10">
          You don&apos;t have any insights yet. Start your first reflection
          today!
        </p>
      )}
    </>
  );
}
