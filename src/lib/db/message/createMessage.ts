import { db } from "$lib/db/db";
import { message } from "$lib/db/schema";
import type { VALID_MESSAGE_TYPES } from "$lib/db/schema";

export type CreateMessageParams = {
  chatId: string
  senderId: string
  replyToId: string | null
  text: string
  type: typeof VALID_MESSAGE_TYPES[number]
};

export function createMessage(newMessage: CreateMessageParams) {
  return db.insert(message).values({
    ...newMessage,
    createdAt: new Date(),
  }).returning();
}
