"use client";

import { useState } from "react";

import { TaskControls, TaskSheet } from "@/components/tasks";
import { Checkbox } from "@/components/ui/checkbox";
import { TaskStatus,TaskWithDependencies } from "@/lib";
import { cn } from "@/lib/utils";

type TaskCardProps = {
  task: TaskWithDependencies;
  onDelete: () => void;
  onEdit: () => void;
  onToggleStatus: (id: string) => void;
};

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

  const handleDelete = () => {
    setIsDeleteOpen(false);
    onDelete();
  };

  return (
    <TaskSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} task={task}>
      <div
        onClick={() => setIsSheetOpen(true)}
        className="border flex items-center justify-between p-2 rounded-lg shadow-sm bg-muted/50 cursor-pointer"
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
                  {task.title}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-1">
                  {task.description}
                </p>
              </div>

              <div onClick={(e) => e.stopPropagation()}>
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
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </TaskSheet>
  );
}
