import { format } from "date-fns";
import Link from "next/link";

import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Progress,
} from "@/components/ui";
import { Goal, GoalStatus } from "@/lib";
import { cn } from "@/lib/utils";

type GoalCardProps = {
  goal: Goal;
};

const MAX_GOAL_TITLE_LENGTH = 20;

export default function GoalCard({ goal }: GoalCardProps) {
  const isPastTargetDate = goal.targetDate
  ? new Date(goal.targetDate) < new Date() && goal.status === GoalStatus.NEEDS_CORRECTION
  : false;
  
  const targetDateTextColor = isPastTargetDate
    ? "text-red-500"
    : "text-muted-foreground";

  return (
    <Link href={`/home/goals/${goal.id}`}>
      <Card
        className={cn(
          "rounded-xl shadow-sm transition hover:shadow-md",
          goal.status === GoalStatus.NEEDS_CORRECTION
            ? "border-red-400 bg-red-50"
            : "border-gray-200",
        )}
      >
        <CardHeader className="pb-3 px-4 pt-4">
          <div className="flex justify-between items-start">
            <CardTitle className="mb-1 text-md font-semibold text-purple-700 leading-snug">
              {goal.title?.length > MAX_GOAL_TITLE_LENGTH
                ? `${goal.title.slice(0, MAX_GOAL_TITLE_LENGTH)}...`
                : goal.title}
            </CardTitle>
            {goal.targetDate && (
              <span
                className={`text-sm whitespace-nowrap ${targetDateTextColor}`}
              >
                {format(new Date(goal.targetDate), "yyyy-MM-dd")}
              </span>
            )}
          </div>
          <div className="flex gap-2 mb-2">
            {goal.status === GoalStatus.NEEDS_CORRECTION && (
              <Badge className="bg-red-100 text-red-700 text-xs font-semibold rounded-full w-fit">
                Needs Correction
              </Badge>
            )}
            <Badge className="max-w-32 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-100 hover:text-gray-800">
              {goal.priority} priority
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="px-4 pb-4 space-y-2 text-sm text-gray-700">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-500 font-medium">
              <span>Progress</span>
              <span>{goal.progress}%</span>
            </div>
            <Progress
              value={goal.progress}
              className="h-2 rounded-full bg-gray-100"
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
