import { db } from "$lib/db/db";
import { passwordResetToken } from "$lib/db/schema";
import { eq } from "drizzle-orm";
import { generateRandomString, isWithinExpiration } from "lucia/utils";

const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

export async function generatePasswordResetToken(userId: string) {
  const storedUserTokens = await db
    .select()
    .from(passwordResetToken)
    .where(eq(passwordResetToken.userId, userId));

  if (storedUserTokens.length > 0) {
    const reusableStoredToken = storedUserTokens.find((token) => {
      // check if expiration is within 1 hour
      // and reuse the token if true
      return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
    });
    if (reusableStoredToken) return reusableStoredToken.token;
  }
  const token = generateRandomString(63);
  await db
    .insert(passwordResetToken)
    .values({
      token,
      userId,
      expires: new Date(Date.now() + EXPIRES_IN),
    })
  return token;
};
