import { getPasswordResetTokenByEmail } from "@/app/data/password-reset-token";
import { getVerificationTokenByEmail } from "@/app/data/verification-token";
import db from "@/prisma/client";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { getTwoFactorTokenByEmail } from "@/app/data/two-factor-token";

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

export async function generatePasswordResetToken(email: string) {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const newVerificationToken = await db.passwordResetToken.create({
    data: { token, expires, email },
  });

  return newVerificationToken;
}

export async function generateTwoFactorToken(email: string) {
  // 100_000 sama ji dengan 100000 (tanpa underscore)
  const token = crypto.randomInt(100_000, 1_000_000).toString();

  // TODO: change to 15 minutes
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await db.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: { email, expires, token },
  });
  return twoFactorToken;
}
