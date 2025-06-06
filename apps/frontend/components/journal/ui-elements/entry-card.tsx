"use client";

import { format } from "date-fns";
import Link from "next/link";
import striptags from "striptags";

import { Badge, Card, CardContent, Separator } from "@/components/ui";
import { Entry } from "@/lib";

type EntryCardProps = {
  entry: Entry;
};
const MAX_GOAL_TITLE_LENGTH = 15;

export default function EntryCard({ entry }: EntryCardProps) {
  return (
    <Card className="border-2 shadow-sm w-full p-1 rounded-xl border-gray-200 transition hover:shadow-md">
      <Link href={`/home/journal/${entry.id}`}>
        <CardContent className="p-2 flex flex-col h-full">
          <div className="flex-1 space-y-1">
            <div className="flex justify-end min-h-5">
              {entry.goalTitle && (
                <Badge
                  className="shrink-0 max-w-[50%] truncate bg-violet-100 text-violet-700 hover:bg-violet-100 hover:text-violet-700"
                  title={entry.goalTitle}
                >
                  {entry.goalTitle?.length > MAX_GOAL_TITLE_LENGTH
                    ? `${entry.goalTitle.slice(0, MAX_GOAL_TITLE_LENGTH)}...`
                    : entry.goalTitle}
                </Badge>
              )}
            </div>
            <h3 className="text-lg text-purple-700 font-semibold line-clamp-1">
              {entry.title}
            </h3>
          </div>

          {entry.content ? (
            <p className="text-muted-foreground text-sm line-clamp-2">
              {striptags(entry.content)}
            </p>
          ) : (
            <p className="text-muted-foreground text-sm">Empty content.</p>
          )}

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
