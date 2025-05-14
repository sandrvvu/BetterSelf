"use client";

import { notFound, useRouter } from "next/navigation";
import { use, useState } from "react";
import { validate as isValidUUID } from "uuid";

import { CategoryControls } from "@/components/categories";
import { CategoryBreadcrumb } from "@/components/categories/ui-elements/breadcrumbs";
import { GoalCard } from "@/components/goals";
import { AppCollapsible, Spinner } from "@/components/shared";
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
    <>
    <CategoryBreadcrumb/>
      <div className="mt-4 flex items-start justify-between gap-8">
        <div>
          <h1 className="text-3xl font-semibold break-all">
            {category.name}
          </h1>
        </div>
        <CategoryControls
          category={category}
          isAddOpen={isAddOpen}
          setIsAddOpen={setIsAddOpen}
          isEditOpen={isEditOpen}
          setIsEditOpen={setIsEditOpen}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          onAdded={() => void refetch()}
          onDelete={onDelete}
        />
      </div>

      <AppCollapsible description="Description">
          <p
            className="m-2 text-sm text-muted-foreground break-words"
            style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}
          >
            {category.description}
          </p>
        </AppCollapsible>

      {goals && goals.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">
          No goals in this category.
        </p>
      )}
    </>
  );
}
