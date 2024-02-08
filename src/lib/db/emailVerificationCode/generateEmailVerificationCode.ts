import { eq } from "drizzle-orm";
import { db } from "$lib/db/db";
import { emailVerificationCode } from "$lib/db/schema";
import { generateRandomString, alphabet } from "oslo/crypto";

const EXPIRES_IN = 1000 * 60 * 10; // 10 minutes

export async function generateEmailVerificationCode(userId: string) {
  // Delete previous codes
  await db
    .delete(emailVerificationCode)
    .where(eq(emailVerificationCode.userId, userId))

  const code = generateRandomString(6, alphabet("0-9", "A-Z"));

  await db
    .insert(emailVerificationCode)
    .values({
      userId,
      code,
      expires: new Date(Date.now() + EXPIRES_IN),
    })

  return code;
};
