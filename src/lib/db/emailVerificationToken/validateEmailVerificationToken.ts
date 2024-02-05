import { db } from "$lib/db/db";
import { eq } from "drizzle-orm";
import { emailVerificationToken } from "$lib/db/schema";
import { isWithinExpirationDate } from "oslo";

export async function validateEmailVerificationToken(token: string) {
  const storedTokenResult = await db
    .select()
    .from(emailVerificationToken)
    .where(eq(emailVerificationToken.token, token))
    .limit(1)

  const storedToken = storedTokenResult[0];

  if (!storedToken) {
    throw new Error('Invalid token');
  }

  // Delete all tokens
  await db
    .delete(emailVerificationToken)
    .where(eq(emailVerificationToken.userId, storedToken.userId))

  if (!isWithinExpirationDate(storedToken.expires)) {
    throw new Error('Expired token');
  }

  return storedToken.userId;
};
