"use client";

import { QuoteWidget, UserAnalytics } from "@/components/shared";
import { RootState, useAppSelector } from "@/state/store";

export default function Home() {
  const user = useAppSelector(
    (state: RootState) => state.auth.authenticatedUser,
  );

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>

      <QuoteWidget />
      <div className="my-6">
        <UserAnalytics />
      </div>
    </div>
  );
}
