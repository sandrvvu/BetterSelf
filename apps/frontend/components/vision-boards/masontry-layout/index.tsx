"use client";

import { X } from 'lucide-react'
import Image from "next/image";
import Masonry from "react-masonry-css";

type ImageData = {
  id: string;
  src: string;
  alt: string;
  onDelete?: () => void;
};

type PinterestLayoutProps = {
  images: ImageData[];
};

export const MasontryLayout = ({ images }: PinterestLayoutProps) => {
  const breakpointColumnsObj = {
    default: 4,
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
          {img.onDelete && (
            <button
              onClick={img.onDelete}
              className="absolute top-2 right-2 bg-white text-red-600 rounded-full shadow p-1 opacity-0 group-hover:opacity-100 transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
    </Masonry>
  );
};
