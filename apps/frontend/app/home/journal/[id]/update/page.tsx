"use client";

import { use } from "react";

import { EditEntryForm, UpdateEntryBreadcrumb } from "@/components/journal";
import { Spinner } from "@/components/shared";
import { useGetEntryQuery } from "@/state/features/journal/journalApi";

type Params = Promise<{ id: string }>;

export default function UpdateEntry({ params }: { params: Params }) {
  const { id } = use(params);
  const { data: entry, isLoading } = useGetEntryQuery(id);

  if (isLoading) return <Spinner />;
  if (!entry) return null;

  return (
    <>
      <UpdateEntryBreadcrumb entry={entry} />
      <h1 className="text-3xl font-semibold my-4">Update entry</h1>
      <p className="text-sm text-neutral-500 mb-4">
        Modify your past entries to reflect new insights, track continued
        progress, or simply update your records. This space helps you refine and
        document your journey.
      </p>
      <EditEntryForm entry={entry} />
    </>
  );
}
