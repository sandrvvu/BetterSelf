import { Dispatch, SetStateAction } from "react";

import { DeleteTaskContent } from "@/components/tasks";
import { ResponsiveDialog } from "@/components/ui";

export const DeleteTaskDialog = ({
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
    title="Delete task"
    description="Are you sure you want to delete this task?"
  >
    <DeleteTaskContent id={id} onDelete={onDelete} />
  </ResponsiveDialog>
);
