"use client";

import Link from "next/link";
import { useState } from "react";

import { EntryCard, JournalBreadcrumb } from "@/components/journal";
import { Spinner, TitleGoalFilter } from "@/components/shared";
import { Button } from "@/components/ui";
import { useGetEntriesQuery } from "@/state/features/journal/journalApi";

export default function Journal() {
  const [filters, setFilters] = useState({ title: "", goalId: "" });

  const { data: entries, isLoading } = useGetEntriesQuery(filters);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
    <JournalBreadcrumb/>
      <div className="flex items-center justify-between my-4">
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

      <TitleGoalFilter onFilterChange={setFilters} />
      
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
