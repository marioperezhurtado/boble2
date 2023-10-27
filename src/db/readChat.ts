import { and, eq } from "drizzle-orm";
import { db } from "./db";
import { participant } from "./schema";

export function readChat(chatId: string, userId: string) {
  return db
    .update(participant)
    .set({
      lastReadAt: new Date(),
    })
    .where(and(
      eq(participant.chatId, chatId),
      eq(participant.userId, userId)
    ));
}
