"use client";

import { notFound } from "next/navigation";
import { use } from "react";

import { Spinner } from "@/components/shared";
import { useGetGoalQuery } from "@/state/features/goals/goalApi";

type Params = Promise<{ id: string }>;

export default function Category(props: { params: Params }) {
  const { id } = use(props.params);

  const { data: goal, isLoading } = useGetGoalQuery(id);

  if (!goal && !isLoading) {
    notFound();
  }

  if (isLoading) {
    return <Spinner />;
  }

  return <h1>{goal?.title}</h1>;
}
