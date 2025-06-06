"use client";

import { useEffect, useState } from "react";

import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useDebounce } from "@/hooks";
import { Info } from "@/lib";
import { useGetGoalOptionsQuery } from "@/state/features/goals/goalApi";

import Spinner from "../spinner";

type Props = {
  onFilterChange: (filters: { title: string; goalId: string }) => void;
  initialTitle?: string;
  initialGoalId?: string;
};

const ALL_GOALS = "all";

export default function TitleGoalFilter({
  onFilterChange,
  initialTitle = "",
  initialGoalId = "",
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [goalId, setGoalId] = useState(initialGoalId);
  const debouncedTitle = useDebounce(title, 300);

  const { data: goalOptions = [], isLoading } = useGetGoalOptionsQuery();

  useEffect(() => {
    onFilterChange({
      title: debouncedTitle.trim(),
      goalId: goalId === ALL_GOALS ? "" : goalId,
    });
  }, [debouncedTitle, goalId, onFilterChange]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="my-3 flex flex-col md:flex-row gap-3 items-start md:items-end">
      <div className="flex flex-col gap-1 w-full md:w-1/2">
        <Input
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1 w-full md:w-1/2">
        <Select value={goalId} onValueChange={setGoalId}>
          <SelectTrigger>
            <SelectValue placeholder="All goals" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_GOALS}>All goals</SelectItem>
            {goalOptions.map((goal: Info) => (
              <SelectItem key={goal.id} value={goal.id}>
                {goal.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
