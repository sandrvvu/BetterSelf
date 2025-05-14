import { format } from "date-fns";
import Link from "next/link";

import { Button } from "@/components/ui";
import { ReflectionPreview } from "@/lib";

type InsightCardProps = {
  preview: ReflectionPreview;
};

export const InsightCard = ({ preview }: InsightCardProps) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-200 flex flex-col justify-between">
      <div>
        <p className="text-gray-800 text-sm mb-3 line-clamp-3">
          {preview.previewText}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-500">
          {format(new Date(preview.createdAt), "dd MMM yyyy")}
        </span>
        <Link href={`/home/insights/${preview.id}`}>
        <Button
          variant="outline"
          className="text-purple-700 border-purple-700 hover:bg-purple-700 hover:text-white"
        >
          View
        </Button>
        </Link>
      </div>
    </div>
  );
};
