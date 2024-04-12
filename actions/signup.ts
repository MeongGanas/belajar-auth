"use server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { signupSchema } from "@/schema/schema";
import db from "@/prisma/client";
import { getUserByEmail } from "@/app/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

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

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
}
