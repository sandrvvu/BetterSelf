import { Dispatch, SetStateAction } from "react";

import { CreateCategoryForm } from "@/components/categories";
import { ResponsiveDialog } from "@/components/ui";

export const CreateCategoryDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => (
  <ResponsiveDialog
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    title="Add category"
    description='Add a new category for your goals. Click "Add" to
      confirm.'
  >
    <CreateCategoryForm setIsOpen={setIsOpen} />
  </ResponsiveDialog>
);
