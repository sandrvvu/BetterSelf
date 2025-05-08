import { Dispatch, SetStateAction } from "react";

import { ResponsiveDialog } from "@/components/ui";
import { EditVisionBoardForm } from "@/components/vision-boards";

export const EditVisionBoardDialog = ({
  isOpen,
  setIsOpen,
  id,
  title,
  description,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
  title: string;
  description: string;
}) => (
  <ResponsiveDialog
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    title="Edit vision board"
    description='Modify the details of this vision board. Click "Save Changes" to update.'
  >
    <EditVisionBoardForm
      id={id}
      setIsOpen={setIsOpen}
      title={title}
      description={description}
    />
  </ResponsiveDialog>
);
