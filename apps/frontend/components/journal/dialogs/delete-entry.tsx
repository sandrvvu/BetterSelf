import { Dispatch, SetStateAction } from "react";

import { DeleteEntryContent } from "@/components/journal";
import { ResponsiveDialog } from "@/components/ui";

export const DeleteEntryDialog = ({
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
    title="Delete entry"
    description="Are you sure you want to delete this entry?"
  >
    <DeleteEntryContent id={id} onDelete={onDelete} />
  </ResponsiveDialog>
);
