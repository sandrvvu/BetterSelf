"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

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
import { LoginSchema, LoginSchemaType } from "@/lib/validation/login.schema";
import { useLoginMutation } from "@/state/features/auth/authApi";
import { setCredentials } from "@/state/features/auth/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const [login, { data, isLoading, isSuccess }] = useLoginMutation();
  const router = useRouter();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginSchemaType) {
    await login(values);
  }

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setCredentials(data));
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/home");
      toast.success("Logined.");
    }
  }, [isSuccess, data, dispatch, router]);

  return (
    <main>
      <div className="mb-6">
        <h1 className="font-bold mb-2 text-xl lg:text-2xl font-gravitas textdrop-shadow-lg">
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
          onSubmit={(event) => {
            event.preventDefault();
            void form.handleSubmit(onSubmit)(event);
          }}
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
            {isLoading ? "Loginning..." : "Log in"}
          </Button>
        </form>
      </Form>
    </main>
  );
}
