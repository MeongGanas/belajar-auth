"use server";

import { getUserByEmail } from "@/app/data/user";
import db from "@/prisma/client";
import { newPassSchema } from "@/schema/schema";
import { z } from "zod";
import bcrypt from "bcryptjs";

export async function newPassword(
  values: z.infer<typeof newPassSchema>,
  token?: string | null
) {
  if (!token) return { error: "Token does not exist!" };

  const validFields = newPassSchema.safeParse(values);
  if (!validFields.success) return { error: "Invalid fields" };

  const existingToken = await db.passwordResetToken.findUnique({
    where: { token },
  });
  if (!existingToken) return { error: "Token not valid!" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token has expired!" };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: "User does not exist" };

  const { password } = validFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({ where: { id: existingToken.id } });

  return { success: "Password is updated!" };
}
