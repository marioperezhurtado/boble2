import { eq } from 'drizzle-orm';
import { db } from '$lib/db/db';
import { passwordResetToken } from "$lib/db/schema";
import { isWithinExpirationDate } from 'oslo';

export async function isValidPasswordResetToken(token: string) {
  const storedTokenResult = await db
    .select()
    .from(passwordResetToken)
    .where(eq(passwordResetToken.token, token))
    .limit(1)

  const storedToken = storedTokenResult[0];

  if (!storedToken) return false;

  if (!isWithinExpirationDate(storedToken.expires)) {
    return false;
  }
  return true;
};
