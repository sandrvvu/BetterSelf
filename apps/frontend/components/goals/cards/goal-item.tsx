import { format } from "date-fns";
import { Calendar, ListChecks } from "lucide-react";
import Link from "next/link";

import { Badge, Card, Progress } from "@/components/ui";
import { GoalWithCategoryName } from "@/lib";

type GoalItemProps = {
  goal: GoalWithCategoryName;
};

export default function GoalItem({ goal }: GoalItemProps) {
  const isPastTargetDate = goal.targetDate
    ? new Date(goal.targetDate) < new Date()
    : false;
  const targetDateTextColor = isPastTargetDate
    ? "text-red-500"
    : "text-muted-foreground";

  return (
    <Card className="w-full p-4 rounded-2xl shadow-sm flex flex-col gap-2 border border-purple-600">
      <Link href={`goals/${goal.id}`}>
        <div className="flex gap-2">
          <Badge
            className={`px-2 py-0.5 rounded-full text-xs font-medium bg-pink-400 hover:bg-pink-400 text-white cursor-pointer`}
          >
            {goal.categoryName}
          </Badge>
          <Badge
            className={`px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-100 hover:text-gray-800`}
          >
            {goal.priority}
          </Badge>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="font-medium text-base truncate">{goal.title}</span>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {goal.targetDate && (
              <div className={`flex items-center gap-1 ${targetDateTextColor}`}>
                <Calendar className="w-4 h-4" />
                {format(new Date(goal.targetDate), "yyyy-MM-dd")}
              </div>
            )}

            <div className="flex items-center gap-1 w-20">
              <Progress value={goal.progress} className="h-2" />
              <span>{goal.progress}%</span>
            </div>

            <div className="flex items-center gap-1">
              <ListChecks className="w-4 h-4" />
              {/* <span>{goal.tasks}</span> */}
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
