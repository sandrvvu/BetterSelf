"use client";

import { format } from "date-fns";
import { notFound, useRouter } from "next/navigation";
import { use, useState } from "react";
import { validate as isValidUUID } from "uuid";

import { EntryBreadcrumb,EntryControls } from "@/components/journal";
import { Spinner } from "@/components/shared";
import { DropdownMenuSeparator } from "@/components/ui";
import { useGetEntryQuery } from "@/state/features/journal/journalApi";

type Params = Promise<{ id: string }>;

export default function Entry({ params }: { params: Params }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: entry, isLoading } = useGetEntryQuery(id);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  if ((!entry && !isLoading) || !isValidUUID(id)) {
    notFound();
  }

  const onDelete = () => {
    setIsDeleteOpen(false);
    router.replace("/home/journal");
  };

  if (isLoading) return <Spinner />;
  if (!entry) return null;

  return (
    <>
      <EntryBreadcrumb />
      <div className="flex items-center justify-between my-4">
        <h1 className="text-3xl font-semibold">{entry.title}</h1>
        <EntryControls
          entry={entry}
          isEditOpen={isEditOpen}
          setIsEditOpen={setIsEditOpen}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          onDelete={onDelete}
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="italic text-muted-foreground">
          {format(new Date(entry.createdAt), "PPP")}
        </p>
        <DropdownMenuSeparator />
        {entry.content && (
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: entry.content }}
          />
        )}
      </div>
    </>
  );
}
