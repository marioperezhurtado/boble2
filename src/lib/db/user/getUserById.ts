import { eq } from "drizzle-orm";
import { db } from "$lib/db/db";
import { user } from "$lib/db/schema";

export async function getUserById(id:string) {
  const existingUser = await db
    .select()
    .from(user)
    .where(eq(user.id, id))

  return existingUser[0]
}
