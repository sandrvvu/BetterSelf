"use client";

import { format } from "date-fns";
import { Dispatch, SetStateAction } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Task } from "@/lib";

type TaskSheetProps = {
  task: Task;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

export default function TaskSheet({
  task,
  children,
  open,
  onOpenChange,
}: TaskSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[500px]">
        <SheetHeader>
          <SheetTitle className="break-words">{task.title}</SheetTitle>
          {task.description && (
            <SheetDescription className="text-sm whitespace-pre-wrap text-muted-foreground">
              {task.description}
            </SheetDescription>
          )}
        </SheetHeader>

        <div className="mt-6 space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Importance:</span>
            <Badge variant="outline">{task.importance}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Urgency:</span>
            <Badge variant="outline">{task.urgency}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Difficulty:</span>
            <Badge variant="outline">{task.difficulty}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Success probability:</span>
            <Badge variant="outline">{task.successProbability}%</Badge>
          </div>

          {task.targetDate && (
            <div className="flex justify-between">
              <span className="text-gray-600">Target date:</span>
              <span>{format(new Date(task.targetDate), "yyyy-MM-dd")}</span>
            </div>
          )}

          {task.estimatedTime && (
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated time:</span>
              <span>
                {task.estimatedTime} {task.estimatedTimeUnit}
              </span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <Badge>{task.status}</Badge>
          </div>

          {/* {task.dependencies?.length > 0 && (
            <div>
              <span className="text-gray-600">Dependencies:</span>
              <ul className="list-disc ml-6 mt-1 text-muted-foreground text-xs">
                {task.dependencies.map((dep) => (
                  <li key={dep}>{dep}</li>
                ))}
              </ul>
            </div>
          )} */}
        </div>
      </SheetContent>
    </Sheet>
  );
}
