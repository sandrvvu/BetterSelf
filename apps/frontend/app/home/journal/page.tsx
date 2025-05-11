"use client";

import Link from "next/link";

import { EntryCard } from "@/components/journal";
import { Spinner } from "@/components/shared";
import { Button } from "@/components/ui";
import { useGetEntriesQuery } from "@/state/features/journal/journalApi";

export default function Journal() {
  const { data: entries, isLoading } = useGetEntriesQuery();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">My journal</h1>
        <Link href="/home/journal/create">
          <Button
            variant="default"
            className="border-2 text-md border-purple-600 bg-purple-600 text-white py-4 rounded-lg hover:bg-white hover:text-purple-600 shadow-lg"
          >
            Add entry
          </Button>
        </Link>
      </div>
      {entries && entries.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {entries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No entries.</p>
      )}
    </>
  );
}
