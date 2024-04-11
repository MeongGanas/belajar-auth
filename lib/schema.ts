import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Password is required" }).max(50),
});

export const signupSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Password is required" }).max(50),
  name: z.string().min(2, { message: "Name is required" }).max(100),
});
