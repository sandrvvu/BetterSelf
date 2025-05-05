"use client";

import { RootState, useAppSelector } from "@/state/store";

export default function Home() {
  const user = useAppSelector((state: RootState) => state.auth.authenticatedUser);

  return (
    <>
      <h1 className="text-4xl font-semibold text-purple-800">
        Welcome back, {user?.name}!
      </h1>
      <p>home page</p>
    </>
  );
}
