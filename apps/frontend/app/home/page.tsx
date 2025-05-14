"use client";

import QuoteWidget from "@/components/widgets/quote-widget";
import { RootState, useAppSelector } from "@/state/store";

export default function Home() {
  const user = useAppSelector(
    (state: RootState) => state.auth.authenticatedUser,
  );

  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold text-purple-700">
        Welcome back, {user?.name}!
      </h1>
      
      <QuoteWidget />
    </div>
  );
}
