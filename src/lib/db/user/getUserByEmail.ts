import { eq } from "drizzle-orm";
import { db } from "$lib/db/db";
import { user } from "$lib/db/schema";

export async function getUserByEmail(email: string) {
  const existingUser = await db
    .select()
    .from(user)
    .where(eq(user.email, email));

  return existingUser[0];
}
