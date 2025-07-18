"use client";

import { useState } from "react";

import {
  CategoriesBreadcrumb,
  columns,
  CreateCategoryDialog,
} from "@/components/categories";
import { DataTable, Spinner } from "@/components/shared";
import { Button } from "@/components/ui";
import { useGetCategoriesQuery } from "@/state/features/categories/categoryApi";

export default function Categories() {
  const { data, isLoading } = useGetCategoriesQuery();
  const [isAddOpen, setIsAddOpen] = useState(false);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <CategoriesBreadcrumb />
      <div className="mt-4 flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">My categories</h1>
        <Button
          onClick={() => setIsAddOpen(true)}
          variant="default"
          className="border-2 text-md border-purple-700 bg-purple-700 text-white py-4 rounded-lg hover:bg-white hover:text-purple-700 shadow-lg"
        >
          Add category
        </Button>

        <CreateCategoryDialog isOpen={isAddOpen} setIsOpen={setIsAddOpen} />
      </div>
      <div className="rounded-2xl">
        <DataTable columns={columns} data={data ?? []} />
      </div>
    </>
  );
}
