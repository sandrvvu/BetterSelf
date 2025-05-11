import { Dispatch, SetStateAction } from "react";

import { EditTaskForm } from "@/components/tasks";
import { ResponsiveDialog } from "@/components/ui";
import { Task } from "@/lib";

export const EditTaskDialog = ({
  isOpen,
  setIsOpen,
  task,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  task: Task;
}) => (
  <ResponsiveDialog
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    title="Edit task"
    description='Modify the details of this task. Click "Save Changes" to update.'
  >
    <EditTaskForm task={task} setIsOpen={setIsOpen} />
  </ResponsiveDialog>
);
