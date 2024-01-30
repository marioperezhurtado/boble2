import { eq } from "drizzle-orm";
import { db } from "$lib/db/db";
import { emailVerificationToken } from "$lib/db/schema";
import { nanoid } from "nanoid";

const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

export async function generateEmailVerificationToken(userId: string) {
  // Delete all previous tokens
  await db
    .delete(emailVerificationToken)
    .where(eq(emailVerificationToken.userId, userId))

  const token = nanoid(40);

  await db
    .insert(emailVerificationToken)
    .values({
      token,
      userId,
      expires: new Date(Date.now() + EXPIRES_IN),
    })

  return token;
};
