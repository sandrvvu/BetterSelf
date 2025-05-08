import { Dispatch, SetStateAction } from "react";

import { ResponsiveDialog } from "@/components/ui";
import { DeleteVisionBoardContent } from "@/components/vision-boards";

export const DeleteVisionBoardDialog = ({
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
    title="Delete visual board"
    description="Are you sure you want to delete this visual board?"
  >
    <DeleteVisionBoardContent id={id} onDelete={onDelete} />
  </ResponsiveDialog>
);
