"use client";

import { format } from "date-fns";
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  Flag,
  Tag,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

import { Progress } from "@/components/ui";
import { GoalWithFullInfo, TaskStatus, TaskWithDependencies } from "@/lib";

import { GoalBreadcrumb } from "./breadcrumbs";

export default function ArchivedGoalDetails({
  goal,
}: {
  goal: GoalWithFullInfo;
}) {
  const completedTasks = goal.tasks.filter(
    (t) => t.status === TaskStatus.COMPLETED,
  );
  const pendingTasks = goal.tasks.filter(
    (t) => t.status === TaskStatus.PENDING,
  );
  const overdueTasks = goal.tasks.filter(
    (t) => t.status === TaskStatus.OVERDUE,
  );

  const renderTaskList = (
    tasks: TaskWithDependencies[],
    label: string,
    icon: JSX.Element,
  ) => (
    <>
      <h3 className="text-lg font-semibold mt-4 mb-2 flex items-center gap-2">
        {icon}
        {label} ({tasks.length})
      </h3>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No {label.toLowerCase()} tasks.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="w-full border border-gray-200 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <h4 className="font-semibold text-gray-800 text-base mb-1">
                  {task.title}
                </h4>
                <p className="text-sm text-gray-600 whitespace-pre-wrap mb-2">
                  {task.description || "No description"}
                </p>

                <ul className="text-xs text-gray-500 space-y-1">
                  <li>
                    <span className="font-medium text-gray-700">
                      Importance:
                    </span>{" "}
                    {task.importance}
                  </li>
                  <li>
                    <span className="font-medium text-gray-700">Urgency:</span>{" "}
                    {task.urgency}
                  </li>
                  <li>
                    <span className="font-medium text-gray-700">
                      Difficulty:
                    </span>{" "}
                    {task.difficulty}
                  </li>
                  <li>
                    <span className="font-medium text-gray-700">
                      Success Probability:
                    </span>{" "}
                    {task.successProbability}%
                  </li>
                  <li>
                    <span className="font-medium text-gray-700">
                      Estimated Time:
                    </span>{" "}
                    {task.estimatedTime
                      ? `${task.estimatedTime} ${task.estimatedTimeUnit}`
                      : "Not set"}
                  </li>
                  {task.targetDate && (
                    <li>
                      <span className="font-medium text-gray-700">
                        Target Date:
                      </span>{" "}
                      {format(new Date(task.targetDate), "yyyy-MM-dd")}
                    </li>
                  )}
                </ul>
              </div>

              <p className="mt-3 text-[10px] text-gray-400">
                Created: {format(new Date(task.createdAt), "yyyy-MM-dd")}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );

  return (
    <div className="flex flex-col gap-6">
      <GoalBreadcrumb goal={goal} />

      <div>
        <h1 className="text-4xl font-bold break-words">{goal.title}</h1>

        <div className="flex flex-wrap gap-4 text-sm text-gray-700 items-center mt-2">
          <div className="flex items-center gap-1">
            <Tag className="w-4 h-4 text-gray-500" />
            <Link href={`/home/categories/${goal.categoryId}`}>
              {goal.categoryName}
            </Link>
          </div>

          <div className="flex items-center gap-1">
            <Flag className="w-4 h-4 text-gray-500" />
            <span>{goal.priority} priority</span>
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

      <div className="p-4 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
        <h2 className="font-semibold mb-1 text-lg">This goal is archived</h2>
        <p>This goal has been archived and can no longer be edited.</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
          {goal.description || "No description provided."}
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Progress</h2>
        <div className="border border-gray-200 shadow-sm rounded-xl p-4 bg-white">
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
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Tasks Summary</h2>
        {renderTaskList(
          completedTasks,
          "Completed Tasks",
          <CheckCircle className="w-5 h-5 text-green-600" />,
        )}
        {renderTaskList(
          pendingTasks,
          "Pending Tasks",
          <Clock className="w-5 h-5 text-blue-600" />,
        )}
        {renderTaskList(
          overdueTasks,
          "Overdue Tasks",
          <AlertTriangle className="w-5 h-5 text-red-500" />,
        )}
      </div>
    </div>
  );
}
