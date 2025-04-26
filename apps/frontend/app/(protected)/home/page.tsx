"use client";

import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state: RootState) => state.auth.authenticatedUser);

  return (
    <>
      <h1 className="text-4xl font-semibold text-purple-800">
        Welcome back, {user?.name}!
      </h1>
      <p>home page</p>
    </>
  );
}
