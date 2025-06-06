"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { Button } from "@/components/ui";
import { useDeleteUserMutation } from "@/state/features/users/userApi";

export function DeleteAccountButton() {
  const router = useRouter();
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleDelete = async () => {
    try {
      await deleteUser().unwrap();
      toast.success("Account deleted");
      router.replace("/login");
    } catch {
      toast.error("Failed to delete account");
    }
  };

  return (
      <Button
        className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
        onClick={() => void handleDelete()}
        disabled={isLoading}
      >
        {isLoading ? "Deleting..." : "Delete account"}
      </Button>
  );
}
