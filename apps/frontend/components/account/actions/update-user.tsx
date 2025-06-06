"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import {
Button,  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage, Input } from "@/components/ui";
import { useUpdateUserMutation } from "@/state/features/users/userApi";
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

export function AccountForm() {
  const user = useAppSelector((state) => state.auth.authenticatedUser);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name ?? "",
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

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4 border">
    <h2 className="text-lg font-semibold text-purple-800">Update Profile</h2>
    <p className="text-sm text-gray-500">Change your name or password</p>

    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit(onSubmit)(e);
        }}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  className="rounded-lg focus:border-violet-500 text-purple-800"
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
                  className="rounded-lg focus:border-violet-500 text-purple-800"
                  placeholder="New password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  </div>
  );
}
