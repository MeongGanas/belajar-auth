"use server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { signupSchema } from "@/lib/schema";
import db from "@/prisma/client";
import { getUserByEmail } from "@/app/data/user";

export default async function signup(values: z.infer<typeof signupSchema>) {
  const validFields = signupSchema.safeParse(values);

  if (!validFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password, name } = validFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already taken!" };
  }

  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return { success: "User created!" };
}
