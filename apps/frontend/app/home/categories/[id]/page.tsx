"use client";

import { notFound, useRouter } from "next/navigation";
import { use, useState } from "react";
import { validate as isValidUUID } from "uuid";

import {
  CategoryActions,
  DeleteCategoryDialog,
  EditCategoryDialog,
} from "@/components/categories";
import { AddGoalDialog, GoalCard } from "@/components/goals";
import { Spinner } from "@/components/shared";
import { Button } from "@/components/ui";
import {
  useGetCategoryQuery,
  useGetGoalsByCategoryQuery,
} from "@/state/features/categories/categoryApi";

type Params = Promise<{ id: string }>;

export default function Category(props: { params: Params }) {
  const { id } = use(props.params);

  const router = useRouter();
  const { data: category, isLoading } = useGetCategoryQuery(id);
  const { data: goals, refetch } = useGetGoalsByCategoryQuery(id);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const onDelete = () => {
    setIsDeleteOpen(false);
    router.replace("/home/categories");
  };

  if ((!category && !isLoading) || !isValidUUID(id)) {
    notFound();
  }

  if (isLoading) {
    return <Spinner />;
  }
  if (!category) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-purple-800 w-5/6">
            {category.name}
          </h1>
          {category.description && (
            <p
              className="text-muted-foreground mt-2 w-5/6  break-all"
              style={{ wordBreak: "break-word" }}
            >
              {category.description}
            </p>
          )}
        </div>
        <CategoryActions
          onEdit={() => setIsEditOpen(true)}
          onDelete={() => setIsDeleteOpen(true)}
        />
      </div>

      <div className="text-right">
        <Button
          variant="default"
          className="border-2 text-md border-purple-600 bg-purple-600 text-white py-4 rounded-lg hover:bg-white hover:text-purple-800 shadow-lg"
          onClick={() => setIsAddOpen(true)}
        >
          Add goal
        </Button>
      </div>

      <EditCategoryDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        id={id}
        name={category.name}
        description={category.description || ""}
      />
      <DeleteCategoryDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        id={id}
        onDelete={onDelete}
      />
      <AddGoalDialog
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
        categoryId={id}
        onAdded={() => {
          void refetch();
        }}
      />

      {goals && goals.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">
          No goals in this category.
        </p>
      )}
    </div>
  );
}
