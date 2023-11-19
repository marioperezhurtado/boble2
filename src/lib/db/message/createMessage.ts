import { db } from "$lib/db/db";
import { message } from "$lib/db/schema";

type CreateMessageParams = {
  chatId: string
  senderId: string
  text: string
  type: "text" | "image" | "gif"
};

export function createMessage(newMessage: CreateMessageParams) {
  return db.insert(message).values({
    ...newMessage,
    createdAt: new Date(),
  }).returning();
}
