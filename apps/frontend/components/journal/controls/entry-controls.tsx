import { MoreHorizontal, PencilOff, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { DeleteEntryDialog, EditEntryDialog } from "@/components/journal";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { Entry } from "@/lib";

export const EntryControls = ({
  entry,
  onDelete,
  isEditOpen,
  setIsEditOpen,
  isDeleteOpen,
  setIsDeleteOpen,
}: {
  entry: Entry;
  onDelete: () => void;
  isEditOpen: boolean;
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
  isDeleteOpen: boolean;
  setIsDeleteOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={(event) => {
              event.preventDefault();
              setIsEditOpen(true);
            }}
          >
            <PencilOff />
            Edit entry
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={(event) => {
              event.preventDefault();
              setIsDeleteOpen(true);
            }}
          >
            <Trash2 />
            Delete entry
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteEntryDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        id={entry.id}
        onDelete={onDelete}
      />

      <EditEntryDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        entry={entry}
      />
    </>
  );
};
