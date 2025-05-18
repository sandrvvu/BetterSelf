import { Dispatch, SetStateAction } from "react";

import { EditEntryForm } from "@/components/journal";
import { ResponsiveDialog } from "@/components/ui";
import { Entry } from "@/lib";

export const EditEntryDialog = ({
  isOpen,
  setIsOpen,
  entry,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  entry: Entry;
}) => (
  <ResponsiveDialog
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    title="Edit entry"
    description='Modify the details of this entry. Click "Save Changes" to update.'
  >
    <EditEntryForm entry={entry} setIsOpen={setIsOpen} />
  </ResponsiveDialog>
);
