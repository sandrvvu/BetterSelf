"use client";

import { format } from "date-fns";
import { PencilOff, Trash2 } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { use, useState } from "react";
import { validate as isValidUUID } from "uuid";

import { DeleteEntryDialog, EditEntryDialog } from "@/components/journal";
import { Spinner } from "@/components/shared";
import { Button } from "@/components/ui";
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

  const handleDelete = () => {
    setIsDeleteOpen(false);
    router.replace("/home/journal");
  };

  if (isLoading) return <Spinner />;
  if (!entry) return null;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold mb-4">{entry.title}</h1>
        <div className="flex gap-2">
          {[
            { icon: <PencilOff />, onClick: () => setIsEditOpen(true) },
            { icon: <Trash2 />, onClick: () => setIsDeleteOpen(true) },
          ].map(({ icon, onClick }, i) => (
            <Button
              key={i}
              onClick={onClick}
              className="border-2 text-md border-neutral-500 bg-white text-neutral-800 py-4 rounded-lg hover:bg-purple-600 hover:text-white shadow-lg"
            >
              {icon}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="italic">{format(new Date(entry.createdAt), "PPP")}</p>
        {entry.content && (
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: entry.content }}
          />
        )}
      </div>

      <DeleteEntryDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        id={id}
        onDelete={handleDelete}
      />

      <EditEntryDialog
        isOpen={isEditOpen}
        title={entry.title}
        content={entry.content}
        setIsOpen={setIsEditOpen}
        id={id}
      />
    </>
  );
}
