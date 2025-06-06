"use client";

import { useState } from "react";

import { Spinner, TitleGoalFilter } from "@/components/shared";
import { Button } from "@/components/ui";
import { BoardsBreadcrumb, CreateVisionBoardDialog, VisionBoardCard } from "@/components/vision-boards";
import { useGetVisionBoardsQuery } from "@/state/features/vision-boards/visionBoardApi";

export default function VisionBoards() {
  const [filters, setFilters] = useState({ title: "", goalId: "" });

  const { data: boards, isLoading } = useGetVisionBoardsQuery(filters);
  const [isAddOpen, setIsAddOpen] = useState(false);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BoardsBreadcrumb />
      <div className="flex items-center justify-between my-4">
        <h1 className="text-3xl font-semibold">My vision boards</h1>
        <Button
          variant="default"
          className="border-2 text-md border-purple-700 bg-purple-700 text-white py-4 rounded-lg hover:bg-white hover:text-purple-700 shadow-lg"
          onClick={() => setIsAddOpen(true)}
        >
          Add board
        </Button>

        <CreateVisionBoardDialog isOpen={isAddOpen} setIsOpen={setIsAddOpen} />
      </div>

      <TitleGoalFilter onFilterChange={setFilters} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {boards?.map((board) => (
          <VisionBoardCard key={board.id} visionBoard={board} />
        ))}
      </div>
    </>
  );
}
