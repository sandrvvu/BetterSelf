"use client";

import Link from "next/link";
import { LoginSchema } from "@/utils/validation/login.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/state/features/auth/authApi";
import { setCredentials } from "@/state/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { setUser } from "@/state/features/user/userSlice";
import { toast } from "react-toastify";

export default function Login() {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    try {
      const res = await login(values).unwrap();
      dispatch(setCredentials(res));
      dispatch(setUser(res.user));
      router.push("/home");
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Invalid credentials. Please try again.",
      );
    }
  }

  return (
    <main>
      <div className="mb-6">
        <h1 className="font-bold text-violet-900 mb-2 text-xl lg:text-2xl font-gravitas textdrop-shadow-lg">
          Welcome back
        </h1>
        <div className="flex gap-1 items-center text-sm">
          <p className="text-slate-600">Don&apos;t have an account?</p>
          <Link href="/sign-in" className="text-violet-800 underline">
            Create new
          </Link>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 text-violet-900"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="w-full p-4 border rounded-lg focus:border-violet-500 focus:outline-none"
                    placeholder="Enter your email"
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="w-full p-4 border rounded-lg focus:border-violet-500 focus:outline-none"
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full text-md bg-violet-600 text-white py-4 rounded-lg hover:bg-violet-700"
          >
            Log in
          </Button>
        </form>
      </Form>
    </main>
  );
}
