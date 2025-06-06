"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Button, Card, CardContent, Skeleton } from "@/components/ui";

type Quote = {
  q: string;
  a: string;
};

const DEFAULT_QUOTE: Quote = {
  q: "The only person you should try to be better than is the person you were yesterday.",
  a: "Anonymous",
};

export default function QuoteWidget() {
  const [quote, setQuote] = useState<Quote>(DEFAULT_QUOTE);
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/quote");
      const data = (await res.json()) as Quote;
      setQuote(data);
    } catch (error) {
      console.error("Failed to fetch quote:", error);
      toast.error("Failed to fetch quote. Try again later");
      setQuote(DEFAULT_QUOTE);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchQuote();
  }, []);

  return (
    <Card className="bg-purple-700 text-white shadow-lg">
      <CardContent className="py-6">
        {loading ? (
          <Skeleton className="h-20 w-full" />
        ) : (
          <blockquote className="text-xl">
            “{quote?.q}”
            <footer className="italic mt-2 text-sm">— {quote?.a}</footer>
          </blockquote>
        )}
        <div className="flex justify-end mt-4">
          <Button
            variant="outline"
            onClick={() => void fetchQuote()}
            className="border-violet-500 text-violet-600 hover:bg-violet-100"
          >
            New Quote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
