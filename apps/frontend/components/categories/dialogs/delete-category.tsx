import { Dispatch, SetStateAction } from "react";

import { DeleteCategoryContent } from "@/components/categories";
import { ResponsiveDialog } from "@/components/ui";

export const DeleteCategoryDialog = ({
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
    title="Delete category"
    description="Are you sure you want to delete this category?"
  >
    <DeleteCategoryContent id={id} onDelete={onDelete} />
  </ResponsiveDialog>
);
