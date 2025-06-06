"use client";

import { X } from "lucide-react";
import Image from "next/image";
import Masonry from "react-masonry-css";

import { Button } from "@/components/ui";

import { DuplicateImageButton } from "../ui-elements/duplicate-image";

type ImageData = {
  id: string;
  src: string;
  alt: string;
  onDelete?: () => void;
  onDuplicate?: () => void;
};

type PinterestLayoutProps = {
  isManageMode: boolean;
  boardId: string;
  images: ImageData[];
};

export const MasontryLayout = ({
  boardId,
  isManageMode,
  images,
}: PinterestLayoutProps) => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {images.map((img) => (
        <div key={img.id} className="relative group mb-4">
          <Image
            src={img.src}
            alt={img.alt}
            unoptimized
            width={0}
            height={0}
            className="w-full h-auto rounded-lg"
          />
          {isManageMode && (
            <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition">
              <DuplicateImageButton  imageId={img.id} currentBoardId={boardId} />
              <Button
                onClick={img.onDelete}
                className="bg-white text-red-600 rounded-full shadow p-1 hover:bg-whitebg-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      ))}
    </Masonry>
  );
};
