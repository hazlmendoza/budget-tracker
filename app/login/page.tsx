"use client"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LogInFormValues, logInSchema } from "../schemas/logInSchema"
import Link from "next/link"
import { useContext } from "react"
import { useRouter } from "next/navigation"
import { AuthContext } from "../context/AuthContext"
import LoadingOverlay from "../layout/LoadingOverlay"



export default function LogIn() {
  const form = useForm<LogInFormValues>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const authContext = useContext(AuthContext)
   const router = useRouter()

  if (!authContext) {
    throw new Error("LogIn must be used within an AuthProvider")
  }

  const { loading, login } = authContext

  const onSubmit = async (data: LogInFormValues) => {
    try {
      await login({ email: data.email, password: data.password })
      router.push("/dashboard") 
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  if (loading) return <LoadingOverlay/>

  return (
    <div className="flex flex-row h-screen bg-background w-full">
      <div className="w-[50%] justify-center items-center flex bg-gradient-to-tr from-blue-950 via-purple-900 to-pink-900 text-white rounded-r-3xl"></div>
      <section className="justify-center items-center flex flex-col mx-auto my-20 p-10 w-full max-w-1/2 bg-surface-1 ">
        <h1 className="text-3xl font-semibold my-4">Welcome</h1>
        <p className="text-md my-6">
          Please log in to your account to continue
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 min-w-[400px]"
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
        <span className="my-4">
          {`Don't have an account? `}
          <Link href="/signup">Sign Up</Link>
        </span>
      </section>
    </div>
  )
}
