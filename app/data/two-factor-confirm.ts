import db from "@/prisma/client";

export async function getTwoFactorTokenConfirmationByUserId(userId: string) {
  try {
    const tokenConfirmation = await db.twoFactorConfirmation.findUnique({
      where: { userId },
    });
    return tokenConfirmation;
  } catch (err) {
    return null;
  }
}
