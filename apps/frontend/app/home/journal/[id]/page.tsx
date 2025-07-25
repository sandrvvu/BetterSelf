"use client";

import { format } from "date-fns";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { use, useState } from "react";
import { validate as isValidUUID } from "uuid";

import { EntryBreadcrumb, EntryControls } from "@/components/journal";
import { Spinner } from "@/components/shared";
import { Badge, DropdownMenuSeparator } from "@/components/ui";
import { useGetEntryQuery } from "@/state/features/journal/journalApi";

type Params = Promise<{ id: string }>;

const MAX_GOAL_TITLE_LENGTH = 30;

export default function Entry({ params }: { params: Params }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: entry, isLoading } = useGetEntryQuery(id);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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
      <div className="flex items-start justify-between my-4 w-full">
        <div>
          <h1
            className="text-3xl font-semibold  break-words"
            style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}
          >
            {entry.title}
          </h1>
          {entry.goalTitle && (
            <Link href={`/home/goals/${entry.goalId}`}>
              <Badge
                className="mt-2 bg-violet-100 text-violet-700  hover:bg-violet-100 hover:text-violet-700"
                title={entry.goalTitle}
              >
                {entry.goalTitle?.length > MAX_GOAL_TITLE_LENGTH
                  ? `${entry.goalTitle.slice(0, MAX_GOAL_TITLE_LENGTH)}...`
                  : entry.goalTitle}
              </Badge>
            </Link>
          )}
        </div>
        <EntryControls
          entry={entry}
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
