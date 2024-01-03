import { db } from "$lib/db/db";
import { message } from "$lib/db/schema";
import type { InferInsertModel } from "drizzle-orm";

export type CreateMessageParams = Omit<InferInsertModel<typeof message>, "createdAt">;

export async function createMessage(newMessage: CreateMessageParams) {
  const newMesage = await db
    .insert(message)
    .values({
      ...newMessage,
      createdAt: new Date(),
    }).returning();

  return newMesage[0];
}
