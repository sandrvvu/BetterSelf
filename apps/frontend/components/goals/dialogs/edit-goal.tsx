import { Dispatch, SetStateAction } from "react";

import { EditGoalForm } from "@/components/goals";
import { ResponsiveDialog } from "@/components/ui";
import { Goal } from "@/lib";

export const EditGoalDialog = ({
  isOpen,
  setIsOpen,
  goal,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  goal: Goal;
}) => (
  <ResponsiveDialog
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    title="Edit goal"
    description='Modify the details of this goal. Click "Save Changes" to update.'
  >
    <EditGoalForm goal={goal} setIsOpen={setIsOpen} />
  </ResponsiveDialog>
);
