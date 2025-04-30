import { Dispatch, SetStateAction } from "react";

import { ResponsiveDialog } from "@/components/ui/responsive-dialog";

import EditCategoryForm from "./content/edit-category.form";

export const EditCategoryDialog = ({
  isOpen,
  setIsOpen,
  id,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
}) => (
  <ResponsiveDialog
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    title="Edit category"
    description='Modify the details of this category. Click "Save Changes" to update.'
  >
    <EditCategoryForm id={id} setIsOpen={setIsOpen} />
  </ResponsiveDialog>
);