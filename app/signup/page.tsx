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
import Link from "next/link"
import { useContext } from "react"
import { useRouter } from "next/navigation"
import { AuthContext } from "../context/AuthContext"
import { SignUpFormValues, signUpSchema } from "../schemas/signUpSchema"
import LoadingOverlay from "../layout/LoadingOverlay"

export default function SignUp() {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: "",
      password: "",
    },
  })

  const authContext = useContext(AuthContext)
   const router = useRouter()

  if (!authContext) {
    throw new Error("SignUp must be used within an AuthProvider")
  }

  const { loading, signup } = authContext

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      await signup({ username: data.name, email: data.email, password: data.password })
      router.push("/login") 
    } catch (error) {
      console.error("SignUp failed:", error)
    }
  }

  if (loading) return <LoadingOverlay/>

  return (
    <div className="flex flex-row h-screen bg-background w-full">
      <div className="w-[50%] justify-center items-center flex bg-gradient-to-tr from-blue-950 via-purple-900 to-pink-900 text-white rounded-r-3xl"></div>
      <section className="justify-center items-center flex flex-col mx-auto my-20 p-10 w-full max-w-1/2 bg-surface-1 ">
        <h1 className="text-3xl font-semibold my-4">Welcome</h1>
        <p className="text-md my-6">
          Please create an account to continue
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 min-w-[400px]"
          >
             {/* Email Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              Sign Up
            </Button>
          </form>
        </Form>
        <span className="my-4">
          {`Don't have an account? `}
          <Link href="/login">Log In</Link>
        </span>
      </section>
    </div>
  )
}
