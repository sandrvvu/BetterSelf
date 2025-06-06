"use client";

import { useState } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import {
  useDuplicateImageToBoardMutation,
  useGetVisionBoardOptionsQuery,
} from "@/state/features/vision-boards/visionBoardApi";

export function DuplicateImageButton({
  imageId,
  currentBoardId,
}: {
  imageId: string;
  currentBoardId: string;
}) {
  const { data: options = [] } = useGetVisionBoardOptionsQuery();
  const [duplicateImage] = useDuplicateImageToBoardMutation();

  const [targetBoardId, setTargetBoardId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleDuplicate = async () => {
    if (!targetBoardId) return;
    console.log(targetBoardId)
    await duplicateImage({
      currentBoardId: currentBoardId,
      imageId,
      boardId: targetBoardId,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Duplicate
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>Select Board to Duplicate</DialogTitle>
        <Select onValueChange={(val) => setTargetBoardId(val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select board..." />
          </SelectTrigger>
          <SelectContent>
            {options
              .filter((b) => b.id !== currentBoardId)
              .map((board) => (
                <SelectItem key={board.id} value={board.id}>
                  {board.title}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Button
          className="mt-4"
          onClick={() => void handleDuplicate()}
          disabled={!targetBoardId}
        >
          Duplicate Image
        </Button>
      </DialogContent>
    </Dialog>
  );
}
