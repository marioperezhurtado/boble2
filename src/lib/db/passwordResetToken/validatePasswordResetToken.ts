import { db } from "$lib/db/db";
import { eq } from "drizzle-orm";
import { passwordResetToken } from "../schema";
import { isWithinExpiration } from "lucia/utils";

export async function validatePasswordResetToken(token: string) {
  const storedToken = await db
    .select()
    .from(passwordResetToken)
    .where(eq(passwordResetToken.token, token));

  if (!storedToken.length) throw new Error("Invalid token");

  await db
    .delete(passwordResetToken)
    .where(eq(passwordResetToken.token, token));

  const tokenExpires = Number(storedToken[0].expires);

  if (!isWithinExpiration(tokenExpires)) {
    throw new Error("Expired token");
  }
  return storedToken[0].userId;
}
