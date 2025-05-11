import { MoreHorizontal, PencilOff, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import {
  DeleteVisionBoardDialog,
  EditVisionBoardDialog,
} from "@/components/vision-boards";
import { VisionBoardWithImages } from "@/lib";

export const BoardControls = ({
  board,
  onDelete,
  isEditOpen,
  setIsEditOpen,
  isDeleteOpen,
  setIsDeleteOpen,
}: {
  board: VisionBoardWithImages;
  onDelete: () => void;
  isEditOpen: boolean;
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
  isDeleteOpen: boolean;
  setIsDeleteOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsEditOpen(true)}
          >
            <PencilOff />
            Edit board
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsDeleteOpen(true)}
          >
            <Trash2 />
            Delete board
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditVisionBoardDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        id={board.id}
        title={board.title}
        description={board.description}
      />

      <DeleteVisionBoardDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        id={board.id}
        onDelete={onDelete}
      />
    </>
  );
};
