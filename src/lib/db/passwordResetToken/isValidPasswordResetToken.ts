import { eq } from "drizzle-orm";
import { db } from "$lib/db/db";
import { passwordResetToken } from "$lib/db/schema";
import { isWithinExpiration } from "lucia/utils";

export async function isValidPasswordResetToken(token: string) {
  const storedToken = await db
    .select()
    .from(passwordResetToken)
    .where(eq(passwordResetToken.token, token));

  if (!storedToken.length) return false;

  const tokenExpires = Number(storedToken[0].expires);
  if (!isWithinExpiration(tokenExpires)) {
    return false;
  }
  return true;
}
