"use client";

import { Mail, UserCircleIcon } from "lucide-react";

import { useAppSelector } from "@/state/store";

export function CurrentUserInfo() {
  const user = useAppSelector((state) => state.auth.authenticatedUser);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md text-center space-y-4 border border-purple-100">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-purple-900">My Profile</h2>
        <p className="text-sm text-neutral-500">Personal information</p>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-center space-x-3">
          <UserCircleIcon className="h-5 w-5 text-purple-500" />
          <p className="text-lg font-medium">{user?.name}</p>
        </div>

        <div className="flex items-center justify-center space-x-3">
          <Mail className="h-5 w-5 text-purple-500" />
          <p className="text-lg font-medium">{user?.email}</p>
        </div>
      </div>
    </div>
  );
}
