import { Dispatch, SetStateAction } from "react";

import { ResponsiveDialog } from "@/components/ui";
import { EditVisionBoardForm } from "@/components/vision-boards";
import { VisionBoard } from "@/lib";

export const EditVisionBoardDialog = ({
  isOpen,
  setIsOpen,
  board,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  board: VisionBoard;
}) => (
  <ResponsiveDialog
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    title="Edit vision board"
    description='Modify the details of this vision board. Click "Save Changes" to update.'
  >
    <EditVisionBoardForm board={board} setIsOpen={setIsOpen} />
  </ResponsiveDialog>
);
