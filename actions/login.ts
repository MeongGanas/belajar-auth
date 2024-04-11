"use server";
import { z } from "zod";
import { signinSchema } from "@/lib/schema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export default async function login(values: z.infer<typeof signinSchema>) {
  const validFields = signinSchema.safeParse(values);

  if (!validFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password } = validFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email or Password wrong!" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
}
