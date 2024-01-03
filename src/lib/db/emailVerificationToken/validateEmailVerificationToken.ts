import { db } from "$lib/db/db";
import { emailVerificationToken } from "$lib/db/schema";
import { eq } from "drizzle-orm";
import { isWithinExpiration } from "lucia/utils";

export async function validateEmailVerificationToken(token: string) {
  const storedToken = await db
    .select()
    .from(emailVerificationToken)
    .where(eq(emailVerificationToken.token, token));

  if (!storedToken.length) throw new Error("Invalid token");

  await db
    .delete(emailVerificationToken)
    .where(eq(emailVerificationToken.userId, storedToken[0].userId));

  const tokenExpires = Number(storedToken[0].expires);

  if (!isWithinExpiration(tokenExpires)) {
    throw new Error("Expired token");
  }

  return storedToken[0].userId;
}
