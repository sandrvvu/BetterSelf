"use client";

import { ArrowDownUp, Bot, Plus, SquarePen } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

import { AddTaskDialog } from "@/components/tasks";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";

import { GenerateTasksModal } from "../dialogs/generate-tasks";

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
  const [sorting, setSorting] = useState("topsis");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <ArrowDownUp className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={sorting} onValueChange={setSorting}>
            <DropdownMenuRadioItem value="topsis">
              TOPSIS Priority
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

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
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <Bot />
            Generate tasks
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <GenerateTasksModal
        goalId={goalId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onAdded={onAdded}
      />

      <AddTaskDialog
        goalId={goalId}
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
        onAdded={onAdded}
      />
    </div>
  );
};
