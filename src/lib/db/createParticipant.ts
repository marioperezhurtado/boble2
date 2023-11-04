import { db } from "./db";
import { participant } from "./schema";

export function createParticipant(chatId: string, userId: string) {
  return db
    .insert(participant)
    .values({
      chatId,
      userId,
      joinedAt: new Date(),
      lastReadAt: new Date(),
    }) 
}
