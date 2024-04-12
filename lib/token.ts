import { getVerificationTokenByEmail } from "@/app/data/verification-token";
import db from "@/prisma/client";
import { v4 as uuidv4 } from "uuid";

export async function generateVerificationToken(email: string) {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const newVerificationToken = await db.verificationToken.create({
    data: { token, expires, email },
  });

  return newVerificationToken;
}
