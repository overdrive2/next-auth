import { z } from "zod"

export const LoginSchema = z.object({
   email: z.string().email({
      message: "Email is required",
   }),
   password: z.string().min(6, {
      message: "Minimum 6 charecters required"
   })
});

export const RegisterSchema = z.object({
   email: z.string().email({
      message: "Email is required",
   }),
   password: z.string().min(6, {
      message: "Minimum 6 charecters required"
   }),
   name: z.string().min(1, {
      message: "Name is required"
   }),
});