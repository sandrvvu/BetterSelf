"use client";

import { AddEntryForm, CreateEntryBreadcrumb } from "@/components/journal";

export default function CreateEntry() {
  return (
    <>
      <CreateEntryBreadcrumb />
      <h1 className="text-3xl font-semibold my-4">Add entry</h1>
      <p className="text-sm text-neutral-500 mb-4">
        Reflect on your thoughts, experiences, or progress by creating a new
        entry. Write freely about anything that matters to you—whether it&apos;s
        a moment of insight, a step toward your goal, or just something you want
        to remember. This space is yours to grow, express, and track your
        journey.
      </p>
      <AddEntryForm />
    </>
  );
}
