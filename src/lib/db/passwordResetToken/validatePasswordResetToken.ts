import { db } from "$lib/db/db";
import { eq } from "drizzle-orm";
import { passwordResetToken } from "$lib/db/schema";
import { isWithinExpirationDate } from "oslo";

export async function validatePasswordResetToken(token: string) {
  const storedToken = db
    .select()
    .from(passwordResetToken)
    .where(eq(passwordResetToken.token, token))
    .limit(1)
    .get();
  
  if (!storedToken) {
    throw new Error('Invalid token');
  }

  if (!isWithinExpirationDate(storedToken.expires)) {
    throw new Error('Expired token');
  }
  return storedToken.userId;
};
