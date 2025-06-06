import { GoalItem } from "@/components/goals";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { GoalStatus, GoalWithCategoryName } from "@/lib";

type GoalTabsProps = {
  goals: GoalWithCategoryName[];
};

export default function GoalTabs({ goals }: GoalTabsProps) {
  return (
    <Tabs defaultValue="pending" className="w-full">
      <TabsList className="grid grid-cols-5 w-full">
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="needs_correction">Needs correction</TabsTrigger>
        <TabsTrigger value="in-progress">In Progress</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="archived">Archieved</TabsTrigger>
      </TabsList>

      <TabsContent value="pending" className="space-y-4 mt-4">
        {goals
          .filter((goal) => goal.status === GoalStatus.PENDING)
          .map((goal) => (
            <GoalItem key={goal.id} goal={goal} />
          ))}
      </TabsContent>

      <TabsContent value="needs_correction" className="space-y-4 mt-4">
        {goals
          .filter((goal) => goal.status === GoalStatus.NEEDS_CORRECTION)
          .map((goal) => (
            <GoalItem key={goal.id} goal={goal} />
          ))}
      </TabsContent>

      <TabsContent value="in-progress" className="space-y-4 mt-4">
        {goals
          .filter((goal) => goal.status === GoalStatus.IN_PROGRESS)
          .map((goal) => (
            <GoalItem key={goal.id} goal={goal} />
          ))}
      </TabsContent>

      <TabsContent value="completed" className="space-y-4 mt-4">
        {goals
          .filter((goal) => goal.status === GoalStatus.COMPLETED)
          .map((goal) => (
            <GoalItem key={goal.id} goal={goal} />
          ))}
      </TabsContent>

      <TabsContent value="archived" className="space-y-4 mt-4">
        {goals
          .filter((goal) => goal.status === GoalStatus.ARCHIVED)
          .map((goal) => (
            <GoalItem key={goal.id} goal={goal} />
          ))}
      </TabsContent>
    </Tabs>
  );
}
