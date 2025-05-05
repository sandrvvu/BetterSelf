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
    <Card className="border-pink-500 border-2 rounded-2xl shadow-sm w-full xl:max-w-sm">
      <Link href={`journal/${entry.id}`}>
        <CardContent className="p-4 flex flex-col h-full">
          <div className="flex-1 space-y-2">
            <h3 className="text-lg font-semibold">{entry.title}</h3>
            {entry.content ? (
              <p className="text-muted-foreground text-sm line-clamp-2">
                {striptags(entry.content)}
              </p>
            ) : (
              <p className="text-muted-foreground text-sm">Empty content.</p>
            )}
          </div>

          <div className="mt-4">
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
