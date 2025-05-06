import { Dispatch, SetStateAction } from "react";

import { DeleteInsightContent } from "@/components/insights";
import { ResponsiveDialog } from "@/components/ui";

export const DeleteInsightDialog = ({
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
    title="Delete insight"
    description="Are you sure you want to delete this insight?"
  >
    <DeleteInsightContent id={id} onDelete={onDelete} />
  </ResponsiveDialog>
);
