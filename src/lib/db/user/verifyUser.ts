import { db } from "$lib/db/db";
import { eq } from "drizzle-orm";
import { user } from "$lib/db/schema";

export function verifyUser(userId: string) {
  return db
    .update(user)
    .set({ emailVerified: true })
    .where(eq(user.id, userId))
}
