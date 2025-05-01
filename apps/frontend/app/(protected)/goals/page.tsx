"use client";

import { GoalTabs } from "@/components/goals";
import { Spinner } from "@/components/shared";
import { useGetGoalsQuery } from "@/state/features/goals/goalApi";

export default function Goals() {
  const { data: goals, isLoading } = useGetGoalsQuery();
  // const [isAddOpen, setIsAddOpen] = useState(false);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">My Goals</h1>
      {goals && goals.length > 0 ? (
        <GoalTabs goals={goals} />
      ) : (
        <p className="text-center text-gray-500 mt-4">No goals.</p>
      )}
    </div>
  );
}
