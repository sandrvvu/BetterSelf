"use client";

import { format } from "date-fns";
import Link from "next/link";
import striptags from "striptags";

import { Card, CardContent, Separator } from "@/components/ui";
import { Entry } from "@/lib";

type EntryCardProps = {
  entry: Entry;
}

export default function EntryCard({ entry }: EntryCardProps) {
  return (
    <Card className="border-2 shadow-sm w-full p-2 rounded-xl border-gray-200 transition hover:shadow-md">
      <Link href={`/home/journal/${entry.id}`}>
        <CardContent className="p-2 flex flex-col h-full">
          <div className="flex-1 space-y-2">
            <h3 className="text-lg text-purple-700 font-semibold">{entry.title}</h3>
            {entry.content ? (
              <p className="text-muted-foreground text-sm line-clamp-2">
                {striptags(entry.content)}
              </p>
            ) : (
              <p className="text-muted-foreground text-sm">Empty content.</p>
            )}
          </div>

          <div className="mt-2">
            <Separator />
            <p className="text-xs text-muted-foreground text-right mt-2">
              {format(new Date(entry.createdAt), "PPP")}
            </p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
