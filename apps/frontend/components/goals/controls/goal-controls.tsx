import { MoreHorizontal, PencilOff, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { DeleteGoalDialog, EditGoalDialog } from "@/components/goals";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { Goal } from "@/lib";

export const GoalControls = ({
  goal,
  onDelete,
  isEditOpen,
  setIsEditOpen,
  isDeleteOpen,
  setIsDeleteOpen,
}: {
  goal: Goal;
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
            Edit goal
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsDeleteOpen(true)}
          >
            <Trash2 />
            Delete goal
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditGoalDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        goal={goal}
      />

      <DeleteGoalDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        id={goal.id}
        onDelete={onDelete}
      />
    </>
  );
};
