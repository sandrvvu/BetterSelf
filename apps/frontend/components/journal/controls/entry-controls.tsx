import { MoreHorizontal, PencilOff, Trash2 } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

import { DeleteEntryDialog } from "@/components/journal";
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
  isDeleteOpen,
  setIsDeleteOpen,
}: {
  entry: Entry;
  onDelete: () => void;
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
           <DropdownMenuItem className="cursor-pointer">
            <Link
              href={`/home/journal/${entry.id}/update`}
              className="w-full flex gap-1"
            >
              <PencilOff size={18} />
              <span> Edit entry </span>
            </Link>
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
    </>
  );
};
