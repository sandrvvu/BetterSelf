import { Dispatch, SetStateAction } from "react";

import { EditCategoryForm } from "@/components/categories";
import { ResponsiveDialog } from "@/components/ui";

export const EditCategoryDialog = ({
  isOpen,
  setIsOpen,
  id,
  name,
  description,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
  name: string;
  description: string;
}) => (
  <ResponsiveDialog
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    title="Edit category"
    description='Modify the details of this category. Click "Save Changes" to update.'
  >
    <EditCategoryForm
      id={id}
      setIsOpen={setIsOpen}
      name={name}
      description={description}
    />
  </ResponsiveDialog>
);
