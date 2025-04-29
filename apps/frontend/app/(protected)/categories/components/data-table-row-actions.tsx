"use state";

import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useDeleteCategoryMutation } from "@/state/features/categories/categoryApi";
import { useEffect, useState } from "react";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import Link from "next/link";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditCategoryForm from "./edit-category.form";

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

  const categoryId = row.original.id as string;

  const [deleteCategory, { data, isLoading, isSuccess }] =
    useDeleteCategoryMutation();

  async function onDelete(id: string) {
    await deleteCategory(id);
    setIsDeleteOpen(false);
  }

  useEffect(() => {
    if (isSuccess && data) {
      toast.success("Category deleted successfully.");
    }
  }, [categoryId, data, isSuccess]);

  return (
    <>
      <ResponsiveDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Delete category"
        description="Are you sure you want to delete this category?"
      >
        <Button
          className="bg-violet-600 text-white py-4 rounded-lg hover:bg-violet-700"
          onClick={() => onDelete(categoryId)}
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
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
