import { format } from "date-fns";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Goal, GoalPriority, GoalStatus } from "@/lib/types/goal";

interface GoalCardProps {
  goal: Goal;
}

const priorityVariants: Record<
  GoalPriority,
  { text: string; className: string }
> = {
  [GoalPriority.HIGH]: { text: "High", className: "bg-red-100 text-red-700" },
  [GoalPriority.MEDIUM]: {
    text: "Medium",
    className: "bg-yellow-100 text-yellow-700",
  },
  [GoalPriority.LOW]: { text: "Low", className: "bg-green-100 text-green-700" },
};

const statusVariants: Record<GoalStatus, { text: string; className: string }> =
  {
    [GoalStatus.PENDING]: {
      text: "Pending",
      className: "bg-gray-100 text-gray-800",
    },
    [GoalStatus.IN_PROGRESS]: {
      text: "In Progress",
      className: "bg-blue-100 text-blue-800",
    },
    [GoalStatus.COMPLETED]: {
      text: "Completed",
      className: "bg-green-100 text-green-800",
    },
  };

export default function GoalCard({ goal }: GoalCardProps) {
  const statusInfo = statusVariants[goal.status];
  const priorityInfo = priorityVariants[goal.priority];

  return (
    <Link href={`/goals/${goal.id}`}>
      <Card className="shadow-lg border border-t-4 border-purple-400">
        <CardHeader className="pb-2 space-y-2">
          <div className="flex gap-2">
            <Badge
              className={`px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-100 hover:text-gray-800`}
            >
              {statusInfo.text}
            </Badge>
            <Badge
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityInfo.className} bg-pink-400 hover:bg-pink-400 text-white`}
            >
              {priorityInfo.text} Priority
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <CardTitle className="text-base font-semibold text-gray-800">
              {goal.title}
            </CardTitle>
            {goal.targetDate && (
              <span className="text-sm text-gray-400">
                {format(new Date(goal.targetDate), "yyyy-MM-dd")}
              </span>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-2 text-sm">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Progress</span>
              <span>{goal.progress}%</span>
            </div>
            <Progress value={goal.progress} className="h-2 bg-gray-100" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
