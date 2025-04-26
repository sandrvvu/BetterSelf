"use client";

import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/state/store";
import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { logout } from "@/state/features/auth/authSlice";
import { clearUser } from "@/state/features/user/userSlice";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.authenticatedUser);
  const isAuthenticated = !!token && !!user;

  const handleSignOut = () => {
    dispatch(logout());
    dispatch(clearUser());
    router.replace("/login");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return <p>Loading..</p>;

  return (
    <SidebarProvider>
      <div className="flex w-full h-screen">
        <AppSidebar
          name={user.name}
          email={user.email}
          onSignOut={handleSignOut}
        />
        <main className="flex-1 p-3">
          <SidebarTrigger />
          <div className="pl-7">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
