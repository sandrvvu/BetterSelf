import { Goal, MoreHorizontal, PencilOff, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import {
  DeleteCategoryDialog,
  EditCategoryDialog,
} from "@/components/categories";
import { AddGoalDialog } from "@/components/goals";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { Category } from "@/lib";

export const CategoryControls = ({
  category,
  onAdded,
  onDelete,
  isAddOpen,
  setIsAddOpen,
  isEditOpen,
  setIsEditOpen,
  isDeleteOpen,
  setIsDeleteOpen,
}: {
  category: Category;
  onAdded: () => void;
  onDelete: () => void;
  isAddOpen: boolean;
  setIsAddOpen: Dispatch<SetStateAction<boolean>>;
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
            onClick={() => setIsAddOpen(true)}
          >
            <Goal />
            Add goal
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsEditOpen(true)}
          >
            <PencilOff />
            Edit category
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsDeleteOpen(true)}
          >
            <Trash2 />
            Delete category
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditCategoryDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        id={category.id}
        name={category.name}
        description={category.description || ""}
      />

      <DeleteCategoryDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        id={category.id}
        onDelete={onDelete}
      />

      <AddGoalDialog
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
        categoryId={category.id}
        onAdded={onAdded}
      />
    </>
  );
};
