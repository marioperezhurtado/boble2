import { db } from "$lib/db/db";
import { user } from "$lib/db/schema";
import type { InferInsertModel } from "drizzle-orm";

type CreateUser = Omit<InferInsertModel<typeof user>, "id" | "emailVerified">;

export async function createUser(userToInsert: CreateUser) {
  const newUser = await db
    .insert(user)
    .values({
      ...userToInsert,
      emailVerified: false,
    })
    .returning({ id: user.id })

  return newUser[0];
}
