import { Bot, Plus, SquarePen } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { AddTaskDialog } from "@/components/tasks";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";

export const TasksControls = ({
  goalId,
  onAdded,
  isAddOpen,
  setIsAddOpen,
}: {
  goalId: string;
  onAdded: () => void;
  isAddOpen: boolean;
  setIsAddOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <Plus className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsAddOpen(true)}
          >
            <SquarePen />
            Create task
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Bot />
            Generate task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddTaskDialog
        goalId={goalId}
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
        onAdded={onAdded}
      />
    </>
  );
};
