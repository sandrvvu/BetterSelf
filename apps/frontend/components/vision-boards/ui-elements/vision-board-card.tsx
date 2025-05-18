import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui";
import { VisionBoardWithPreviewImage } from "@/lib";

type VisionBoardCardProps = {
  visionBoard: VisionBoardWithPreviewImage;
};
const MAX_GOAL_TITLE_LENGTH = 15;

export default function VisionBoardCard({ visionBoard }: VisionBoardCardProps) {
  return (
    <Link
      href={`/home/vision-boards/${visionBoard.id}`}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition duration-300"
    >
      <div className="h-40 w-full relative bg-gray-100">
        {visionBoard.goalTitle && (
          <div className="absolute top-2 left-2 z-10">
            <Badge className="bg-violet-100 text-violet-700 hover:bg-violet-100 hover:text-violet-700">
              {visionBoard.goalTitle?.length > MAX_GOAL_TITLE_LENGTH
                ? `${visionBoard.goalTitle.slice(0, MAX_GOAL_TITLE_LENGTH)}...`
                : visionBoard.goalTitle}
            </Badge>
          </div>
        )}
        {visionBoard.previewImage?.source ? (
          <Image
            src={visionBoard.previewImage.source}
            alt={visionBoard.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold text-purple-700 group-hover:underline">
          {visionBoard.title}
        </h2>
        {visionBoard.description && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {visionBoard.description}
          </p>
        )}
      </div>
    </Link>
  );
}
