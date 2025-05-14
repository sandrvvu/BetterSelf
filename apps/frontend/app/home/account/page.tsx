"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { Spinner } from "@/components/shared";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";
import {
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/state/features/users/userApi";
import { useAppSelector } from "@/state/store";

const schema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  password: z
    .string()
    .min(6, "Minimum 6 characters")
    .regex(/[A-Z]/, "At least one uppercase letter")
    .regex(/[0-9]/, "At least one number")
    .regex(/[^A-Za-z0-9]/, "At least one special character")
    .optional(),
});

type FormValues = z.infer<typeof schema>;

export default function AccountPage() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.authenticatedUser);
  const { data, isLoading } = useGetUserQuery();

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name,
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await updateUser(values).unwrap();
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser().unwrap();
      toast.success("Account deleted");
      router.replace("/login");
    } catch {
      toast.error("Failed to delete account");
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Account</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-semibold">My account</h1>

      <div className="p-4 bg-violet-50 shadow-sm">
        <p className="text-sm text-gray-600">Current info:</p>
        <p className="font-semibold text-purple-700 text-center">
          {user?.name}
        </p>
        <p className="font-semibold text-purple-700 text-center">
          {user?.email}
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void form.handleSubmit(onSubmit)(e);
          }}
          className="space-y-4 bg-white p-6 border rounded-lg shadow"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="text-purple-800 rounded-lg focus:border-violet-500 focus:outline-none"
                    placeholder="Your name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="text-purple-800 rounded-lg focus:border-violet-500 focus:outline-none"
                    placeholder="New password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem className="flex justify-end">
            <Button
              type="submit"
              className="w-full bg-violet-600 text-white py-4 rounded-lg hover:bg-violet-700"
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </FormItem>
        </form>
      </Form>

      <div className="pt-6 border-t">
        <Button
          className="w-full bg-neutral-400 text-white py-4 rounded-lg hover:bg-violet-700"
          onClick={() => void handleDelete()}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete Account"}
        </Button>
      </div>
    </div>
  );
}
