import { z } from "zod"

export const logInSchema = z.object({
    email: z.string().trim().email({ message: "Invalid email address." }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters." })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
        .regex(/[0-9]/, { message: "Password must contain at least one digit." })
        .regex(/[\W_]/, { message: "Password must contain at least one special character." }),
})

export const signUpSchema = z.object({
    name: z.string().trim().min(2, { message: "Full name must be at least 2 characters." }),
    email: z.string().trim().email({ message: "Invalid email address." }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters." })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
        .regex(/[0-9]/, { message: "Password must contain at least one digit." })
        .regex(/[\W_]/, { message: "Password must contain at least one special character." }),
})

export type LogInFormValues = z.infer<typeof logInSchema>
export type SignUpFormValues = z.infer<typeof signUpSchema>