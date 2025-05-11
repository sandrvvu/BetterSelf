import { Dispatch, SetStateAction } from "react";

import { CreateTaskForm } from "@/components/tasks";
import { ResponsiveDialog } from "@/components/ui";

export const AddTaskDialog = ({
  isOpen,
  setIsOpen,
  goalId,
  onAdded,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  goalId: string;
  onAdded: () => void;
}) => (
  <ResponsiveDialog
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    title="Add task"
    description="Specify the details of your new task. Click 'Add' to save it."
  >
    <CreateTaskForm
      goalId={goalId}
      setIsOpen={(val) => {
        setIsOpen(val);
        if (!val) onAdded();
      }}
    />
  </ResponsiveDialog>
);
