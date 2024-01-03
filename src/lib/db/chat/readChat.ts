import { and, eq } from "drizzle-orm";
import { db } from "$lib/db/db";
import { participant } from "$lib/db/schema";

export function readChat(chatId: string, userId: string) {
  return db
    .update(participant)
    .set({
      lastReadAt: new Date(),
    })
    .where(and(eq(participant.chatId, chatId), eq(participant.userId, userId)));
}
