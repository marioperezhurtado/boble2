import { eq } from 'drizzle-orm';
import { db } from '$lib/db/db';
import { passwordResetToken } from "$lib/db/schema";
import { isWithinExpirationDate } from 'oslo';

export async function isValidPasswordResetToken(token: string) {
  const storedToken = db
    .select()
    .from(passwordResetToken)
    .where(eq(passwordResetToken.token, token))
    .limit(1)
    .get();

  if (!storedToken) return false;

  if (!isWithinExpirationDate(storedToken.expires)) {
    return false;
  }
  return true;
};
