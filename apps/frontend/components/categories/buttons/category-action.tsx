import { PencilOff, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export const CategoryActions = ({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) => (
  <div className="flex gap-2">
    <Button
      onClick={onEdit}
      className="border-2 text-md border-neutral-500 bg-white text-neutral-800 py-4 rounded-lg hover:bg-purple-600 hover:text-white shadow-lg"
    >
      <PencilOff />
    </Button>
    <Button
      onClick={onDelete}
      className="border-2 text-md border-neutral-500 bg-white text-neutral-800 py-4 rounded-lg hover:bg-purple-600 hover:text-white shadow-lg"
    >
      <Trash2 />
    </Button>
  </div>
);
