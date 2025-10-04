"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import LoadingOverlay from "../layout/LoadingOverlay";
import { LogInFormValues, logInSchema } from "../api/auth/schema";

export default function LogIn() {
  const form = useForm<LogInFormValues>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const authContext = useContext(AuthContext);
  const router = useRouter();

  if (!authContext) {
    throw new Error("LogIn must be used within an AuthProvider");
  }

  const { loading, login } = authContext;

  const onSubmit = async (data: LogInFormValues) => {
    try {
      await login({ email: data.email, password: data.password });
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (loading) return <LoadingOverlay />;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-background w-full">
      <div className="w-full md:w-1/2 flex justify-center items-center bg-gradient-to-tr from-blue-950 via-purple-900 to-pink-900 text-white rounded-b-3xl md:rounded-r-3xl md:rounded-b-none">
        {/* Optional: Add content or image here for larger screens */}
      </div>
      <section className="flex flex-col justify-center items-center mx-auto my-10 p-6 w-full max-w-md bg-surface-1 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold my-4">Welcome</h1>
        <p className="text-md mb-6 text-center">
          Please log in to your account to continue
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Log In
            </Button>
          </form>
        </Form>
        <span className="my-4 text-center">
          {`Don't have an account? `}
          <Link href="/signup" className="text-blue-500 underline">Sign Up</Link>
        </span>
      </section>
    </div>
  );
}
