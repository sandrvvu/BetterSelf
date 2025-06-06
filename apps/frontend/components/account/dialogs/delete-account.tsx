import { Dispatch, SetStateAction } from "react";

import { DeleteAccountButton } from "@/components/account";
import { ResponsiveDialog } from "@/components/ui";

export const DeleteAccountDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => (
  <ResponsiveDialog
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    title="Delete account"
    description="Are you sure you want to delete your account?"
  >
    <DeleteAccountButton />
  </ResponsiveDialog>
);
