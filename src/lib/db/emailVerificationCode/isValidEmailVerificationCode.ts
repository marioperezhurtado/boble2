import { db } from "$lib/db/db";
import { and, eq } from "drizzle-orm";
import { emailVerificationCode } from "$lib/db/schema";
import { isWithinExpirationDate } from "oslo";

type IsValidEmailVerificationCode = {
  userId: string;
  code: string;
};

export async function isValidEmailVerificationCode({ userId, code }: IsValidEmailVerificationCode) {
  const storedCodeResult = await db
    .select()
    .from(emailVerificationCode)
    .where(and(
      eq(emailVerificationCode.userId, userId),
      eq(emailVerificationCode.code, code)
    ));

  const storedCode = storedCodeResult[0];

  if (!storedCode) {
    return false;
  }

  // Delete all codes 
  await db
    .delete(emailVerificationCode)
    .where(eq(emailVerificationCode.userId, emailVerificationCode.userId))

  if (!isWithinExpirationDate(storedCode.expires)) {
    return false;
  }

  return true;
};
