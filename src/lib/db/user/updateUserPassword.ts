import { db } from "$lib/db/db";
import { eq } from "drizzle-orm";
import { user } from "$lib/db/schema";

type UpdateUserPassword = {
  userId: string;
  hashedPassword: string;
};

export function updateUserPassword({userId, hashedPassword}: UpdateUserPassword) {
  return db
    .update(user)
    .set({ hashedPassword })
    .where(eq(user.id, userId))
}
