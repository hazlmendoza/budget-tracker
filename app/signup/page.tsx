"use client"
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
import LoadingOverlay from "../layout/LoadingOverlay"
import { SignUpFormValues, signUpSchema } from "../api/auth/schema"

export default function SignUp() {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
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
      await signup({
        username: data.name,
        email: data.email,
        password: data.password,
      })
      router.push("/login")
    } catch (error) {
      console.error("SignUp failed:", error)
    }
  }

  if (loading) return <LoadingOverlay />

  return (
    <div className="flex flex-col md:flex-row h-screen bg-background w-full">
      <div className="w-full md:w-1/2 flex justify-center items-center bg-gradient-to-tr from-blue-950 via-purple-900 to-pink-900 text-white rounded-b-3xl md:rounded-r-3xl md:rounded-b-none">
        {/* Optional: Add content or image here for larger screens */}
      </div>
      <section className="flex flex-col justify-center items-center mx-auto my-10 p-6 w-full max-w-md bg-surface-1 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold my-4">Hi there!</h1>{" "}
        <p className="text-md mb-6 text-center">Please create an account to continue</p>
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
                    <Input placeholder="Name" {...field} />
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
        <span className="my-4 text-center">
          {`Already have an account? `}
          <Link href="/login" className="text-blue-500 underline">Log In</Link>
        </span>
      </section>
    </div>
  )
}
