import { Dispatch, SetStateAction } from "react";

import { EditEntryForm } from "@/components/journal";
import { ResponsiveDialog } from "@/components/ui";

export const EditEntryDialog = ({
  isOpen,
  setIsOpen,
  id,
  title,
  content,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
  title: string;
  content?: string;
}) => (
  <ResponsiveDialog
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    title="Edit entry"
    description='Modify the details of this entry. Click "Save Changes" to update.'
  >
    <EditEntryForm
      id={id}
      title={title}
      content={content}
      setIsOpen={setIsOpen}
    />
  </ResponsiveDialog>
);
