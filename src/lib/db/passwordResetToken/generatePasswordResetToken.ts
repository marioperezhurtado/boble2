import { db } from "$lib/db/db";
import { eq } from "drizzle-orm";
import { passwordResetToken } from "$lib/db/schema";
import { nanoid } from "nanoid";

const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

export async function generatePasswordResetToken(userId: string) {
  // Delete all previous tokens
  await db
    .delete(passwordResetToken)
    .where(eq(passwordResetToken.userId, userId));

  const token = nanoid(40);

  await db
    .insert(passwordResetToken)
    .values({
      token,
      userId,
      expires: new Date(Date.now() + EXPIRES_IN),
    })

  return token;
};
