"use client";

import { GoalsBreadcrumb, GoalTabs } from "@/components/goals";
import { Spinner } from "@/components/shared";
import { useGetGoalsQuery } from "@/state/features/goals/goalApi";

export default function Goals() {
  const { data: goals, isLoading } = useGetGoalsQuery();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <GoalsBreadcrumb />
      <h1 className="text-3xl font-semibold my-4">My goals</h1>
      {goals && goals.length > 0 ? (
        <GoalTabs goals={goals} />
      ) : (
        <p className="text-center text-gray-500 mt-4">No goals.</p>
      )}
    </>
  );
}
