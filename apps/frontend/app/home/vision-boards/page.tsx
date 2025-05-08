"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Spinner } from "@/components/shared";
import { Button } from "@/components/ui";
import { CreateVisionBoardDialog } from "@/components/vision-boards";
import { useGetVisionBoardsQuery } from "@/state/features/vision-boards/visionBoardApi";

export default function VisionBoards() {
  const { data: boards, isLoading } = useGetVisionBoardsQuery();
  const [isAddOpen, setIsAddOpen] = useState(false);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-semibold text-purple-800">
          My vision boards
        </h1>
        <Button
          variant="default"
          className="border-2 text-md border-purple-600 bg-purple-600 text-white py-4 rounded-lg hover:bg-white hover:text-purple-800 shadow-lg"
          onClick={() => setIsAddOpen(true)}
        >
          Add board
        </Button>

        <CreateVisionBoardDialog isOpen={isAddOpen} setIsOpen={setIsAddOpen}/>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {boards?.map((board) => (
          <Link
            key={board.id}
            href={`/home/vision-boards/${board.id}`}
            className="bg-white shadow-lg rounded-2xl overflow-hidden transition hover:shadow-xl cursor-pointer"
          >
            <div className="h-40 w-full relative bg-gray-100">
              {board.previewImage?.source && (
                <Image
                  src={board.previewImage.source}
                  alt={board.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-purple-900">
                {board.title}
              </h2>
              {board.description && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                  {board.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
