import { db } from "$lib/db/db";
import { participant } from "$lib/db/schema";

export function createParticipant(chatId: string, userId: string) {
  return db.insert(participant).values({
    chatId,
    userId,
    joinedAt: new Date(),
    lastReadAt: new Date(),
  });
}
