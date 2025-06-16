"use client";

import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { useState } from "react";

import { TaskControls, TaskSheet } from "@/components/tasks";
import {
  Checkbox,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import { TaskStatus, TaskWithDependencies } from "@/lib";
import { cn } from "@/lib/utils";

type TaskCardProps = {
  task: TaskWithDependencies;
  onDelete: () => void;
  onEdit: () => void;
  onToggleStatus: (id: string) => void;
};

const MAX_TASK_TITLE_LENGTH = 100;
const MAX_TASK_DESC_LENGTH = 150;

export default function TaskCard({
  task,
  onDelete,
  onEdit,
  onToggleStatus,
}: TaskCardProps) {
  const isDone = task.status === TaskStatus.COMPLETED;

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handleDelete = () => {
    setIsDeleteOpen(false);
    onDelete();
  };

  const isPastTargetDate = task.targetDate
    ? new Date(task.targetDate) < new Date() && task.status === TaskStatus.OVERDUE 
    : false;
  const targetDateTextColor = isPastTargetDate
    ? "text-red-500"
    : "text-muted-foreground";

  return (
    <TaskSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} task={task}>
      <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
        <TooltipTrigger asChild>
          <div
            onClick={() => setIsSheetOpen(true)}
            className={cn(
              "border flex items-center justify-between p-2 rounded-lg cursor-pointer transition",
              task.status === TaskStatus.OVERDUE
                ? "border-red-400 bg-red-50 animate-pulse"
                : "shadow-sm bg-muted/50",
            )}
          >
            <div className="flex items-center gap-3 w-full">
              <div onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={isDone}
                  onCheckedChange={() => onToggleStatus(task.id)}
                  className="border-muted-foreground data-[state=checked]:bg-primary"
                />
              </div>

              <div className="flex flex-col gap-1 w-full overflow-hidden">
                <div className="flex items-center justify-between">
                  <div>
                    <h3
                      className={cn(
                        "font-medium text-sm truncate mb-1",
                        isDone
                          ? "line-through text-muted-foreground"
                          : "text-gray-700",
                      )}
                    >
                      {task.title.length > MAX_TASK_TITLE_LENGTH
                        ? `${task.title.slice(0, MAX_TASK_TITLE_LENGTH)}...`
                        : task.title}
                    </h3>
                    {task.description && (
                      <p className="text-xs text-neutral-400 line-clamp-1">
                        {task.description.length > MAX_TASK_DESC_LENGTH
                        ? `${task.description.slice(0, MAX_TASK_DESC_LENGTH)}...`
                        : task.description}
                      </p>
                    )}
                  </div>

                  <div
                    className="flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {task.targetDate && (
                      <div
                        className={`flex items-center gap-1 text-sm ${targetDateTextColor}`}
                      >
                        <Calendar className="w-4 h-4" />
                        {format(new Date(task.targetDate), "yyyy-MM-dd")}
                      </div>
                    )}
                    <TaskControls
                      task={{
                        ...task,
                        dependencies: task.dependencies.map((dep) => dep.id),
                      }}
                      onDelete={handleDelete}
                      onEdit={onEdit}
                      isEditOpen={isEditOpen}
                      setIsEditOpen={setIsEditOpen}
                      isDeleteOpen={isDeleteOpen}
                      setIsDeleteOpen={setIsDeleteOpen}
                      setIsTooltipOpen={setIsTooltipOpen}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TooltipTrigger>
        {task.status === TaskStatus.OVERDUE && (
          <TooltipContent side="top">
            <p>This task is overdue. You may want to update it.</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TaskSheet>
  );
}
