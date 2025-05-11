"use client";

import { format } from "date-fns";
import { Calendar, Flag, Tag, TrendingUp } from "lucide-react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { use, useState } from "react";

import { GoalControls, TasksControls } from "@/components/goals";
import { AppCollapsible, Spinner } from "@/components/shared";
import { TaskCard } from "@/components/tasks";
import { DropdownMenuSeparator, Progress } from "@/components/ui";
import { TaskStatus } from "@/lib";
import { useGetGoalQuery } from "@/state/features/goals/goalApi";
import { useUpdateTaskMutation } from "@/state/features/tasks/taskApi";

type Params = Promise<{ id: string }>;

export default function Goal(props: { params: Params }) {
  8;
  const { id } = use(props.params);

  const router = useRouter();

  const { data: goal, isLoading, refetch } = useGetGoalQuery(id);
  const [updateTask] = useUpdateTaskMutation();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const onDelete = () => {
    setIsDeleteOpen(false);
    router.replace("/home/goals");
  };

  const onDeleteTask = () => {
    void refetch();
  };

  const onToggleStatus = (taskId: string) => {
    const task = goal?.tasks.find((t) => t.id === taskId);
    if (!task) return;

    const newStatus =
      task.status === TaskStatus.COMPLETED
        ? TaskStatus.PENDING
        : TaskStatus.COMPLETED;

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

  return (
    <>
      <div className="flex flex-col gap-2 mb-2">
        <div className="flex items-start justify-between gap-8 mb-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-gray-900 break-words">
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
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>{format(new Date(goal.targetDate), "yyyy-MM-dd")}</span>
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

        <DropdownMenuSeparator />

        <div className="flex items-center justify-between px-4">
          <p className="font-semibold">Action plan</p>

          <TasksControls
            goalId={goal.id}
            onAdded={() => void refetch()}
            isAddOpen={isAddTaskOpen}
            setIsAddOpen={setIsAddTaskOpen}
          />
        </div>

        {goal.tasks.length > 0 ? (
          <div className="flex flex-col gap-2">
            {goal.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleStatus={onToggleStatus}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">No tasks.</p>
        )}
      </div>
    </>
  );
}
