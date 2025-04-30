import { Dispatch, SetStateAction } from "react";

import { ResponsiveDialog } from "@/components/ui/responsive-dialog";

import CreateCategoryForm from "./content/create-category.form";

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
