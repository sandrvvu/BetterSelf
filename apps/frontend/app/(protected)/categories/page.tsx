"use client";

import { useGetCategoriesQuery } from "@/state/features/categories/categoryApi";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { useState } from "react";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import CreateCategoryForm from "./components/create-category.form";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/spinner";

export default function Categories() {
  const { data, isLoading } = useGetCategoriesQuery();
  const [isAddOpen, setIsAddOpen] = useState(false);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-semibold text-purple-800">Categories</h1>
        <Button
          onClick={() => setIsAddOpen(true)}
          variant="default"
          className="border-2 text-md border-purple-600 bg-purple-600 text-white py-4 rounded-lg hover:bg-white hover:text-purple-800 shadow-lg"
        >
          Add category
        </Button>
        <ResponsiveDialog
          isOpen={isAddOpen}
          setIsOpen={setIsAddOpen}
          title="Add category"
          description=' Add a new category for your goals. Click "Add " to
            confirm.'
        >
          <CreateCategoryForm setIsOpen={setIsAddOpen} />
        </ResponsiveDialog>
      </div>
      <div className="rounded-2xl">
        <DataTable columns={columns} data={data ?? []} />
      </div>
    </>
  );
}
