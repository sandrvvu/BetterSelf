"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppSidebar, Spinner } from "@/components/shared";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { User } from "@/lib/types/user";
import { logout, setCredentials } from "@/state/features/auth/authSlice";
import { RootState } from "@/state/store";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.authenticatedUser);
  const isAuthenticated = !!token && !!user;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");

    if (accessToken && user) {
      dispatch(
        setCredentials({
          accessToken,
          user: JSON.parse(user) as User,
        }),
      );
    }
  }, [dispatch]);

  const handleSignOut = () => {
    dispatch(logout());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    router.replace("/login");
  };

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.replace("/login");
  //   }
  // }, [isAuthenticated, router]);

  if (!isAuthenticated) return <Spinner />;

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
          <div className="px-7">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
