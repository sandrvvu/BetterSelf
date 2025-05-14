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
import { Goal } from "@/lib";

type GoalCardProps = {
  goal: Goal;
};

export default function GoalCard({ goal }: GoalCardProps) {
  return (
    <Link href={`/home/goals/${goal.id}`}>
      <Card className="border border-gray-200 shadow-sm rounded-xl transition hover:shadow-md">
        <CardHeader className="pb-3 px-4 pt-4">
          <div className="flex justify-between items-start">
            <CardTitle className="mb-1 text-lg font-semibold text-purple-700 leading-snug">
              {goal.title}
            </CardTitle>
            {goal.targetDate && (
              <span className="text-sm text-gray-500 whitespace-nowrap">
                {format(new Date(goal.targetDate), "yyyy-MM-dd")}
              </span>
            )}
          </div>
          <Badge className="max-w-32 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-100 hover:text-gray-800">
            {goal.priority} priority
          </Badge>
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
