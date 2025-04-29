"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { SignInSchema, SignInSchemaType } from "@/lib/validation/sign-in.shema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "@/state/features/auth/authApi";
import { setCredentials } from "@/state/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { setUser } from "@/state/features/user/userSlice";

export default function SignIn() {
  const dispatch = useDispatch();
  const [register] = useRegisterMutation();
  const router = useRouter();

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInSchemaType) {
    const res = await register(values).unwrap();
    dispatch(setCredentials(res));
    dispatch(setUser(res.user));
    router.push("/home");
  }

  return (
    <main>
      <div className="mb-6">
        <h1 className="font-bold text-violet-900 mb-2 text-xl lg:text-2xl font-gravitas textdrop-shadow-lg">
          Create an account
        </h1>
        <div className="flex gap-1 items-center text-sm">
          <p className="text-slate-600">Have an account?</p>
          <Link href="/login" className="text-violet-800 underline">
            Log in
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="w-full p-4 border rounded-lg focus:border-violet-500 focus:outline-none"
                    placeholder="Enter your name"
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
            Create Account
          </Button>
        </form>
      </Form>
    </main>
  );
}
