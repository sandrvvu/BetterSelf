"use client";

import { format } from "date-fns";
import { Calendar, Flag, Tag, TrendingUp } from "lucide-react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { use, useState } from "react";

import {
  GoalBreadcrumb,
  GoalControls,
  TasksControls,
} from "@/components/goals";
import ArchivedGoalDetails from "@/components/goals/ui-elements/archived-goal-details";
import { AppCollapsible, Spinner } from "@/components/shared";
import { TaskCard } from "@/components/tasks";
import { DropdownMenuSeparator, Progress } from "@/components/ui";
import { GoalStatus, TaskStatus } from "@/lib";
import { cn } from "@/lib/utils";
import { useGetGoalQuery, useUpdateGoalMutation } from "@/state/features/goals/goalApi";
import { useUpdateTaskMutation } from "@/state/features/tasks/taskApi";

type Params = Promise<{ id: string }>;

export default function Goal(props: { params: Params }) {
  const { id } = use(props.params);

  const router = useRouter();

  const {
    data: goal,
    isLoading,
    refetch,
  } = useGetGoalQuery(id, {
    pollingInterval: 60 * 60 * 1000,
  });

  const [updateGoal] = useUpdateGoalMutation();
  const [updateTask] = useUpdateTaskMutation();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const onDelete = () => {
    setIsDeleteOpen(false);
    router.replace("/home/goals");
  };

  const onEditTask = () => {
    void refetch();
  };

  const onDeleteTask = () => {
    void refetch();
  };

  const onToggleStatus = (taskId: string) => {
    const task = goal?.tasks.find((t) => t.id === taskId);
    if (!task) return;

    let newStatus: TaskStatus;

    if (task.status === TaskStatus.COMPLETED) {
      const now = new Date();
      const targetDate = task.targetDate ? new Date(task.targetDate) : null;

      newStatus =
        targetDate && targetDate < now
          ? TaskStatus.OVERDUE
          : TaskStatus.PENDING;
    } else {
      newStatus = TaskStatus.COMPLETED;
    }

    updateTask({ id: task.id, data: { status: newStatus } })
      .unwrap()
      .then(() => {
        void refetch();
      })
      .catch((error) => {
        console.error("Failed to update task status", error);
      });
  };

  if (!goal && !isLoading) {
    notFound();
  }

  if (isLoading) {
    return <Spinner />;
  }
  if (!goal) return null;

  if (goal.status === GoalStatus.ARCHIVED) {
    return <ArchivedGoalDetails goal={goal} />;
  }

  const isNeedsCorrection = goal.status === GoalStatus.NEEDS_CORRECTION;

  return (
    <div className="flex flex-col gap-2 mb-2">
      <GoalBreadcrumb goal={goal} />
      <div className="flex items-start justify-between gap-8 mb-4">
        <div className="flex flex-col gap-2">
          <h1
            className="text-4xl font-bold break-words"
            style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}
          >
            {goal.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-700 items-center">
            <div className="flex items-center gap-1">
              <Tag className="w-4 h-4 text-gray-500" />
              <Link href={`/home/categories/${goal.categoryId}`}>
                {goal.categoryName}
              </Link>
            </div>

            <div className="flex items-center gap-1">
              <Flag className="w-4 h-4 text-gray-500" />
              <span className="">{goal.priority} priority</span>
            </div>

            {goal.targetDate && (
              <div className="flex items-center gap-1">
                <Calendar
                  className={`w-4 h-4 ${isNeedsCorrection ? "text-red-500" : "text-gray-500"}`}
                />
                <span className={isNeedsCorrection ? "text-red-500" : ""}>
                  {format(new Date(goal.targetDate), "yyyy-MM-dd")}
                </span>
              </div>
            )}

            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-gray-500" />
              <span>{goal.progress.progressPercentage}% done</span>
            </div>
          </div>
        </div>

        <GoalControls
          goal={goal}
          isEditOpen={isEditOpen}
          setIsEditOpen={setIsEditOpen}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          onDelete={onDelete}
        />
      </div>

      <AppCollapsible description="Description">
        <p
          className="m-2 text-sm text-muted-foreground break-words"
          style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}
        >
          {goal.description}
        </p>
      </AppCollapsible>

      <AppCollapsible description="Progress" defaultValue={true}>
        <div className="m-3 border border-gray-200 shadow-sm rounded-xl p-4 hover:shadow-md transition-all duration-200 bg-white">
          <p className="font-semibold text-sm text-gray-700 mb-3">
            Target: {goal.progress.completedTasksCount}/
            {goal.progress.allTasksCount} tasks
          </p>

          <div className="flex items-center gap-4 justify-between text-xs text-gray-500 font-medium">
            <Progress
              value={goal.progress.progressPercentage}
              className="h-2 rounded-full bg-gray-100"
            />
            <span className="text-end">
              {goal.progress.progressPercentage}%
            </span>
          </div>
        </div>
      </AppCollapsible>

      {isNeedsCorrection && (
        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-300 rounded-md text-yellow-800">
          <h2 className="font-semibold mb-2">This goal needs correction</h2>
          <p className="mb-2">
            To continue managing this goal, please either update its details
            (e.g., extend the target date) or archive it.
          </p>
          <button
            onClick={() => setIsEditOpen(true)}
            className="mr-2 px-3 py-1 bg-yellow-200 rounded hover:bg-yellow-300"
          >
            Edit Goal
          </button>
          <button
            onClick={() => void updateGoal({id, data: {status: GoalStatus.ARCHIVED}})}
            className="px-3 py-1 bg-red-200 rounded hover:bg-red-300"
          >
            Archive Goal
          </button>
        </div>
      )}

      <DropdownMenuSeparator />

      <div
        className={cn(
          "flex items-center justify-between px-4",
          isNeedsCorrection ? "pointer-events-none opacity-50 select-none" : "",
        )}
      >
        <p className="font-semibold">Action plan</p>

        <TasksControls
          goalId={goal.id}
          onAdded={() => void refetch()}
          isAddOpen={isAddTaskOpen}
          setIsAddOpen={setIsAddTaskOpen}
        />
      </div>

      {goal.tasks.length > 0 ? (
        <div
          className={cn(
            "flex flex-col gap-2",
            isNeedsCorrection
              ? "pointer-events-none opacity-50 select-none"
              : "",
          )}
        >
          {goal.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleStatus={onToggleStatus}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No tasks.</p>
      )}
    </div>
  );
}
