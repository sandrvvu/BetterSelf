import { Dispatch, SetStateAction } from "react";

import { ResponsiveDialog } from "@/components/ui";
import { CreateVisionBoardForm } from "@/components/vision-boards";

export const CreateVisionBoardDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => (
  <ResponsiveDialog
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    title="Add vision board"
    description='Add a new vision board for your goals. Click "Add" to
      confirm.'
  >
    <CreateVisionBoardForm setIsOpen={setIsOpen} />
  </ResponsiveDialog>
);