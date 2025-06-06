import { Dispatch, SetStateAction } from "react";

import { DeleteGoalContent } from "@/components/goals";
import { ResponsiveDialog } from "@/components/ui";

export const DeleteGoalDialog = ({
  isOpen,
  setIsOpen,
  id,
  onDelete,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
  onDelete: () => void;
}) => (
  <ResponsiveDialog
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    title="Delete goal"
    description="Are you sure you want to delete this goal?"
  >
    <DeleteGoalContent id={id} onDelete={onDelete} />
  </ResponsiveDialog>
);
