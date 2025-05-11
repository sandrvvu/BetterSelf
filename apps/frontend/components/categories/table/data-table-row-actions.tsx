"use state";

import { Row } from "@tanstack/react-table";
import { Eye, MoreHorizontal, PencilOff, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  DeleteCategoryContent,
  EditCategoryForm,
} from "@/components/categories";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ResponsiveDialog,
} from "@/components/ui";

type CategoryRow = {
  id: string;
  name: string;
  description?: string;
};
type DataTableRowActionsProps<TData> = {
  row: Row<TData>;
};

export default function DataTableRowActions<TData extends CategoryRow>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditedOpen, setIsEditedOpen] = useState(false);

  const categoryId = row.original.id;

  const onDelete = () => {
    setIsDeleteOpen(false);
  };

  return (
    <>
      <ResponsiveDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Delete category"
        description="Are you sure you want to delete this category?"
      >
        <DeleteCategoryContent id={categoryId} onDelete={onDelete} />
      </ResponsiveDialog>

      <ResponsiveDialog
        isOpen={isEditedOpen}
        setIsOpen={setIsEditedOpen}
        title="Edit category"
        description='Modify the details of this category. Click "Save Changes" to update.'
      >
        <EditCategoryForm
          id={categoryId}
          name={row.original.name}
          description={row.original.description}
          setIsOpen={setIsEditedOpen}
        />
      </ResponsiveDialog>

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
          <DropdownMenuItem className="cursor-pointer">
            <Link
              href={`/home/categories/${categoryId}`}
              className="w-full flex gap-1"
            >
              <Eye size={18} />
              <span> View category </span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setIsEditedOpen(true);
            }}
          >
            <PencilOff />
            Edit category
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setIsDeleteOpen(true);
            }}
          >
            <Trash2 />
            Delete category
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
