"use client";

import { useState } from "react";

import {
  AccountBreadcrumb,
  AccountForm,
  CurrentUserInfo,
  DeleteAccountDialog,
  TopsisSettingsForm,
} from "@/components/account";
import { Spinner } from "@/components/shared";
import { Button } from "@/components/ui";
import { useGetTopsisSettingsQuery } from "@/state/features/users/userApi";

export default function AccountPage() {
  const { data: settings, isLoading } = useGetTopsisSettingsQuery();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-4">
      <AccountBreadcrumb />

      <h1 className="text-3xl font-semibold">My account</h1>

      <CurrentUserInfo />
      <AccountForm />
      {settings && (
        <TopsisSettingsForm
          settings={{
            ...settings,
            isBenefit: settings.isBenefit.map((val) => val === "true"),
          }}
        />
      )}

      <div className="pt-6 border-t">
        <h2 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h2>
        <Button
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
          onClick={() => setIsDeleteOpen(true)}
        >
          Delete Account
        </Button>
      </div>

      <DeleteAccountDialog isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen}/>
    </div>
  );
}
