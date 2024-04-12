"use server";

import { getUserByEmail } from "@/app/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";
import { resetSchema } from "@/schema/schema";
import { z } from "zod";

export async function reset(values: z.infer<typeof resetSchema>) {
  const validationFieds = resetSchema.safeParse(values);

  if (!validationFieds.success) return { error: "Invalid Email!" };

  const { email } = validationFieds.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) return { error: "User not found!" };

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Email sent!" };
}
