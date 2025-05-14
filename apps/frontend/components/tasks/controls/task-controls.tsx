import { MoreVertical, PencilOff, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { DeleteTaskDialog, EditTaskDialog } from "@/components/tasks";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { Task } from "@/lib";

export const TaskControls = ({
  task,
  onDelete,
  onEdit,
  isEditOpen,
  setIsEditOpen,
  isDeleteOpen,
  setIsDeleteOpen,
}: {
  task: Task;
  onDelete: () => void;
  onEdit: () => void;
  isEditOpen: boolean;
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
  isDeleteOpen: boolean;
  setIsDeleteOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={(e) => e.preventDefault()}
          >
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              setIsEditOpen(true);
            }}
          >
            <PencilOff />
            Edit task
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              setIsDeleteOpen(true);
            }}
          >
            <Trash2 />
            Delete task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditTaskDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        task={task}
        onEdit={onEdit}
      />

      <DeleteTaskDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        id={task.id}
        onDelete={onDelete}
      />
    </>
  );
};
