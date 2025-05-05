import { Dispatch, SetStateAction } from "react";

import { CreateGoalForm } from "@/components/goals";
import { ResponsiveDialog } from "@/components/ui";

export const AddGoalDialog = ({
  isOpen,
  setIsOpen,
  categoryId,
  onAdded,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  categoryId: string;
  onAdded: () => void;
}) => (
  <ResponsiveDialog
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    title="Add goal"
    description="Specify the details of your new goal. Click 'Add' to save it."
  >
    <CreateGoalForm
      categoryId={categoryId}
      setIsOpen={(val) => {
        setIsOpen(val);
        if (!val) onAdded();
      }}
    />
  </ResponsiveDialog>
);
