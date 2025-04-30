"use state";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";

import DeleteCategoryContent from "../dialogs/content/delete-category-content";
import EditCategoryForm from "../dialogs/content/edit-category.form";

interface WithId<T> {
  id: T;
}
interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export default function DataTableRowActions<TData extends WithId<string>>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditedOpen, setIsEditedOpen] = useState(false);

  const categoryId = row.original.id ;

  const onDelete = () => {
    setIsDeleteOpen(false);
  }

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
        <EditCategoryForm id={categoryId} setIsOpen={setIsEditedOpen} />
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
            <Link href={`/categories/${categoryId}`}>View category</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setIsEditedOpen(true);
            }}
          >
            Edit category
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setIsDeleteOpen(true);
            }}
          >
            Delete category
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
