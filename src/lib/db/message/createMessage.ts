import { db } from "$lib/db/db";
import { message } from "$lib/db/schema";

type CreateMessageParams = {
  chatId: string;
  senderId: string;
  text: string;
};

export function createMessage({ chatId, senderId, text }: CreateMessageParams) {
    return db.insert(message).values({
        chatId,
        senderId,
        text,
        createdAt: new Date(),
    }).returning();
}
