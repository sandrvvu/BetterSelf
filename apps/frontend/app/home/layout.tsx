"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { AppSidebar, Spinner } from "@/components/shared/";
import { SidebarProvider, SidebarTrigger } from "@/components/ui";
import { useAuthInit } from "@/hooks";
import { logout } from "@/state/features/auth/authSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/state/store";

export default function Layout({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useAuthInit();
  const { token, authenticatedUser, isLoaded } = useAppSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (!isLoaded) return;

    if (!token || !authenticatedUser) {
      router.replace("/login");
    }
  }, [token, authenticatedUser, isLoaded, router]);

  const handleSignOut = () => {
    dispatch(logout());
    router.replace("/login");
  };

  if (!isLoaded) return <Spinner />;

  return (
    <SidebarProvider>
      <div className="flex w-full h-screen">
        <AppSidebar
          name={authenticatedUser?.name || ""}
          email={authenticatedUser?.email || ""}
          onSignOut={handleSignOut}
        />
        <main className="flex-1 p-3">
          <SidebarTrigger />
          <div className="px-24 pb-4">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
